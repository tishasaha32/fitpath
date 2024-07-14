import React, { useState } from "react";
import { Modal, Button } from "@mui/material";
import styles from "./CommentModal.module.css";
import useUpdateComment from "../hooks/useUpdateComments";
import useFetchComments from "../hooks/useFetchComments";
import { FaCircleUser } from "react-icons/fa6";

const CommentModal = ({ isOpen, handleClose, handleAddComment, videoId }) => {
  const [commentText, setCommentText] = useState("");
  const updateComment = useUpdateComment(videoId);
  const { commentsData } = useFetchComments(videoId);
  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = () => {
    updateComment(commentText);
    handleAddComment(commentText);
    setCommentText("");
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <input
            type="text"
            placeholder="Enter comment"
            className={styles.commentInput}
            value={commentText}
            onChange={handleCommentChange}
            id="modal-modal-description"
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            id="modal-modal-description"
            className={styles.addButton}
          >
            Add
          </Button>
        </div>
        <div className={styles.commentContainer}>
          {commentsData?.map((comment, index) => (
            <div className={styles.comments} key={index}>
              <FaCircleUser className={styles.userIcon} />
              <div>
                <p className={styles.userEmail}>{comment.userEmail}</p>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default CommentModal;
