import { useState, useCallback } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useGetUserData } from "./useGetUserDetails";

const useUpdateComment = (videoId) => {
  const currentUser = useGetUserData();

  const updateComment = useCallback(
    async (commentText) => {
      try {
        if (!currentUser) {
          console.error("Current user not available");
          return;
        }

        const videoDocRef = doc(db, "videos", videoId);

        // Fetch existing document snapshot
        const videoDocSnap = await getDoc(videoDocRef);
        if (!videoDocSnap.exists()) {
          console.error("Video document does not exist");
          return;
        }

        const videoData = videoDocSnap.data();
        const currentComments = videoData.comments || [];
        const currentUsers = videoData.commentsUsersID || [];

        // Update comments and users arrays
        const updatedComments = [...currentComments, commentText];
        const updatedUsers = [...currentUsers, currentUser.uid];

        // Update Firestore document
        await updateDoc(videoDocRef, {
          comments: updatedComments,
          commentsUsersID: updatedUsers,
        });

        console.log("Comment updated successfully");
      } catch (error) {
        console.error("Error updating comment:", error);
      }
    },
    [videoId, currentUser]
  );

  return updateComment;
};

export default useUpdateComment;
