import React, { useState, useRef } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { BsShareFill } from "react-icons/bs";
import useUpdateLikes from "../hooks/useUpdateLikes";
import styles from "./ReelsComponent.module.css";
import CommentModal from "./CommentModal";
import useShare from "../hooks/useShare";

const VideoSlide = ({ video, videoId, videoRef, videoURL }) => {
  const [likes, liked, updateLikes] = useUpdateLikes(videoId);
  const shareContent = useShare();

  const handleShare = () => {
    shareContent(
      "Check out this video!",
      "I found this amazing video, have a look!",
      videoURL
    );
  };
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

  const handleAddComment = (commentText) => {
    console.log("Adding comment:", commentText);
    handleCloseModal();
  };

  return (
    <>
      <video
        ref={videoRef}
        loop
        className={styles.video}
        controls
        muted
        onClick={(e) => {
          e.target.play().catch((error) => {
            console.log("Play prevented: user interaction needed");
          });
        }}
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className={styles.iconContainer}>
        <AiFillLike
          className={styles.like}
          style={{ color: liked ? "blue" : "white" }}
          onClick={updateLikes}
        />
        <FaComment className={styles.comment} onClick={handleOpenModal} />
        <BsShareFill className={styles.share} onClick={handleShare} />
      </div>
      <CommentModal
        isOpen={showModal}
        handleClose={handleCloseModal}
        handleAddComment={handleAddComment}
        videoId={videoId}
      />
    </>
  );
};

export default VideoSlide;
