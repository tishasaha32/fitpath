import { useState, useEffect, useCallback } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useGetUserData } from "./useGetUserDetails"; // Adjust the import path if necessary

const useUpdateLikes = (videoId) => {
  const currentUser = useGetUserData();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const fetchLikes = async () => {
        const videoDocRef = doc(db, "videos", videoId);
        const videoDocSnap = await getDoc(videoDocRef);

        if (videoDocSnap.exists()) {
          const videoData = videoDocSnap.data();
          setLikes(videoData.likes || 0);
          setLiked(videoData.likesUsersID?.includes(currentUser.uid) || false);
        }
      };
      fetchLikes();
    }
  }, [currentUser, videoId]);

  const updateLikes = useCallback(async () => {
    if (!currentUser || !currentUser.uid) {
      console.log("User not logged in or user ID undefined:", currentUser);
      return;
    }

    const videoDocRef = doc(db, "videos", videoId);

    try {
      if (liked) {
        // User already liked, so unlike
        await updateDoc(videoDocRef, {
          likes: likes - 1,
          likesUsersID: arrayRemove(currentUser.uid),
        });
        setLikes((prev) => prev - 1);
      } else {
        // User has not liked, so like
        await updateDoc(videoDocRef, {
          likes: likes + 1,
          likesUsersID: arrayUnion(currentUser.uid),
        });
        setLikes((prev) => prev + 1);
      }
      setLiked((prev) => !prev); // Toggle liked state
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  }, [currentUser, liked, likes, videoId]);

  return [likes, liked, updateLikes];
};

export default useUpdateLikes;
