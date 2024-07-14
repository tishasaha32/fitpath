import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./ReelsComponent.module.css";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { BsShareFill } from "react-icons/bs";
import useFetchVideos from "../hooks/useFetchVideos";
import useUpdateLikes from "../hooks/useUpdateLikes";

const ReelsComponent = () => {
  const { videos, loading, error } = useFetchVideos();
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef([]);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  useEffect(() => {
    const currentVideo = videoRefs.current[activeIndex];
    if (currentVideo) {
      const playPromise = currentVideo.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Automatic playback started!
          })
          .catch((error) => {
            // Auto-play was prevented
            console.log("Play prevented: user interaction needed");
          });
      }
    }
  }, [activeIndex]);

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error loading videos: {error}</p>;

  return (
    <Swiper
      direction="vertical"
      pagination={{ clickable: true }}
      onSlideChange={handleSlideChange}
      className={styles.verticalSwiper}
    >
      {videos.map((video, index) => (
        <SwiperSlide key={video.id}>
          <VideoSlide
            video={video.videoURL}
            videoId={video.id}
            videoRef={(el) => (videoRefs.current[index] = el)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const VideoSlide = ({ video, videoId, videoRef }) => {
  const [likes, liked, updateLikes] = useUpdateLikes(videoId);

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
        <span>{likes} Likes</span>
        <FaComment className={styles.comment} />
        <BsShareFill className={styles.share} />
      </div>
    </>
  );
};

export default ReelsComponent;
