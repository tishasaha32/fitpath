import React, { useState } from "react";
import styles from "./ReviewsContainer.module.css";
import useHandleReviewSubmit from "../hooks/useHandleReviewSubmit";
import useGetReviews from "../hooks/useGetReviews";
import { FaRegUserCircle } from "react-icons/fa";

function ReviewsContainer({ docId }) {
  const [reviewText, setReviewText] = useState("");
  const { handleReviewSubmit } = useHandleReviewSubmit({
    reviewText,
    setReviewText,
    docId,
  });
  const { reviews } = useGetReviews({
    docId,
    reviewText,
  });
  console.log(reviews);
  return (
    <div className={styles.reviewsContainer}>
      {reviews.length !== 0 ? (
        reviews.map((review) => (
          <div key={review.id} className={styles.reviewContainer}>
            {review.userPhotoURL ? (
              <img
                src={review.userPhotoURL}
                alt="user"
                className={styles.userIcon}
              />
            ) : (
              <FaRegUserCircle className={styles.userIcon} />
            )}
            <div>
              <p className={styles.userName}>{review.userName}</p>
              <p key={review.id}>{review.review}</p>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.noReviews}>No reviews yet</p>
      )}

      <div className={styles.reviewInputContainer}>
        <input
          type="text"
          placeholder="Share the details of your experience here"
          className={styles.reviewInput}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <button className={styles.submitButton} onClick={handleReviewSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default ReviewsContainer;
