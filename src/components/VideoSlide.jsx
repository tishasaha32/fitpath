import React, { useState, useRef } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { BsShareFill } from "react-icons/bs";
import useUpdateLikes from "../hooks/useUpdateLikes";
import styles from "./ReelsComponent.module.css";
import CommentModal from "./CommentModal";

const VideoSlide = ({ video, videoId, videoRef }) => {
  const [likes, liked, updateLikes] = useUpdateLikes(videoId);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

  const handleAddComment = (commentText) => {
    // Implement your logic to add comment here
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
        <BsShareFill className={styles.share} />
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
