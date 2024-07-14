import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./ReelsComponent.module.css";
import useFetchVideos from "../hooks/useFetchVideos";
import VideoSlide from "./VideoSlide";

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
          .then(() => {})
          .catch((error) => {
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
            videoURL={video.videoURL}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReelsComponent;
