import { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const useFetchComments = (videoId) => {
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const videoDocRef = doc(db, "videos", videoId);
        const videoDocSnap = await getDoc(videoDocRef);

        if (videoDocSnap.exists()) {
          const videoData = videoDocSnap.data();
          const comments = videoData.comments || [];
          const commentsUsersID = videoData.commentsUsersID || [];

          const commentsWithEmails = await Promise.all(
            comments.map(async (comment, index) => {
              const userId = commentsUsersID[index];
              const userDocRef = doc(db, "users", userId);
              const userDocSnap = await getDoc(userDocRef);
              const userEmail = userDocSnap.exists()
                ? userDocSnap.data().email
                : "Unknown";

              return { comment, userEmail };
            })
          );
          setCommentsData(commentsWithEmails);
        } else {
          console.log(`No video found with id: ${videoId}`);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (videoId) {
      fetchComments();
    }
  }, [videoId]);

  return { commentsData };
};

export default useFetchComments;
