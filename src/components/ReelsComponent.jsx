import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./ReelsComponent.module.css";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { BsShareFill } from "react-icons/bs";

const ReelsComponent = () => {
  const videosArray = ["/videos/vid1.mp4", "/videos/vid2.mp4"];
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef([]);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) video.pause();
    });
    const currentVideo = videoRefs.current[activeIndex];
    if (currentVideo) currentVideo.play();
  }, [activeIndex]);

  return (
    <Swiper
      direction="vertical"
      pagination={{ clickable: true }}
      onSlideChange={handleSlideChange}
      className={styles.verticalSwiper}
    >
      {videosArray.map((video, index) => (
        <SwiperSlide key={index}>
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            loop
            className={styles.video}
            controls
          >
            <source src={video} type="video/mp4" />
          </video>
          <div className={styles.iconContainer}>
            <AiFillLike className={styles.like} />
            <FaComment className={styles.comment} />
            <BsShareFill className={styles.share} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReelsComponent;
