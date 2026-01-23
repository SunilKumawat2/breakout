"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BlogCard from "./BlogCard";
import blogImg from "@/images/blog-img.jpg";
import Image from "next/image";
import videoPoster from "@/images/video-poster.jpg";
import playBtn from "@/images/play-btn.svg";
import pauseBtn from "@/images/pause-btn.svg";

const Videotestimonials = ({ data,className = "", }) => {
  const videoRef = useRef([]);
  const swiperRef = useRef(null); // Swiper instance ref
  const [playingVideo, setPlayingVideo] = useState(null);
  const [activeIndex, setActiveIndex] = useState(4);

  let data1 = data;
  if (data) {
    data1 = data;
  } else {
    data1 = [
      {
        image: videoPoster,
        title: "Best place of Celebration...",
      },

      {
        image: videoPoster,
        title: "Best place of Celebration...",
      },

      {
        image: videoPoster,
        title: "Best place of Celebration...",
      },

      {
        image: videoPoster,
        title: "Best place of Celebration...",
      },

      {
        image: videoPoster,
        title: "Best place of Celebration...",
      },

      {
        image: videoPoster,
        title: "Best place of Celebration...",
      },

      {
        image: videoPoster,
        title: "Best place of Celebration...",
      },

      {
        image: videoPoster,
        title: "Best place of Celebration...",
      },
    ];
  }

  const handlePlayVideo = (index) => {
    if (playingVideo !== null && playingVideo !== index) {
      if (videoRef.current[playingVideo]) {
        videoRef.current[playingVideo].pause();
      }
    }

    const video = videoRef.current[index];
    if (video) {
      if (video.paused) {
        video.play();
        setPlayingVideo(index);
      } else {
        video.pause();
        setPlayingVideo(null);
      }
    }
  };


  // Handler to center slide on click
  const handleSlideClick = (index) => {
    if (swiperRef.current && swiperRef.current.slideTo) {
      swiperRef.current.slideTo(index, 500, false);
    }
  };

  // This effect stops playing video if the slide goes out of center (not active)
  React.useEffect(() => {
    if (
      playingVideo !== null &&
      playingVideo !== activeIndex &&
      videoRef.current[playingVideo]
    ) {
      videoRef.current[playingVideo].pause();
      setPlayingVideo(null);
    }
    // Note: both activeIndex and playingVideo are needed in deps
  }, [activeIndex, playingVideo]);

  return (
    <section className={`blog-slider-sec section-padding pb-0 ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="sec-head sm-head medium">
              Video <span>Testimonials</span>
            </h2>
          </div>
        </div>
      
      <div className="row">
        <div className="col-lg-12">
          <div className="blog-slider video-slider">
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              centeredSlides={true}
              slidesPerView={1}
              spaceBetween={0}
              initialSlide={4}
              slideToClickedSlide={true}  
              loop={data1?.length >= 4}
              breakpoints={{
                0: { slidesPerView: 1.2 },
                640: { slidesPerView: 1.5 },
                992: { slidesPerView: 3.5 },
                1400: { slidesPerView: 3 },
              }}
              className="blog-swiper"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(
                  swiper.realIndex != null ? swiper.realIndex : swiper.activeIndex
                );
              }}
            >

              {data1.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="video-test-card"
                    // onClick={() => handleSlideClick(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="video-test-img">
                      {item && (
                        <video
                          className="no-swipe"
                          src={item}
                          ref={(el) => (videoRef.current[index] = el)}
                          poster={item.image}
                          onEnded={() => setPlayingVideo(null)}
                        />
                      )}
                    </div>
                    <div className="video-test-content">
                      <button
                        className="video-test-btn"
                        onPointerDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handlePlayVideo(index);
                        }}
                      >
                        {playingVideo === index ? (
                          <Image src={pauseBtn} alt="pause-btn" />
                        ) : (
                          <Image src={playBtn} alt="play-btn" />
                        )}
                      </button>
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Videotestimonials;
