"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import GReviewCard from "./GReviewCard";
import Image from "next/image";
import swiperPrev from "@/images/swiper-prev.svg";
import swiperNext from "@/images/swiper-next.svg";
import star from "@/images/star.svg";
import starStroke from "@/images/star-stroke.svg";

const GReviewSlider = ({ commonStars = true, data }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <li key={i}>
          <Image src={i <= rating ? star : starStroke} alt="star" />
        </li>
      );
    }
    return stars;
  };

  const dummyData = [
    {
      name: "John Doe",
      stars: "4",
      heading: "Great Experience",
      description: "Had an amazing time with friends!",
    },
    {
      name: "Jane Smith",
      stars: "5",
      heading: "Fantastic Event",
      description: "Best birthday party ever!",
    },
    {
      name: "Mike Johnson",
      stars: "4",
      heading: "Wonderful Time",
      description: "Highly recommended!",
    },
  ];

  const reviews = data?.length > 0 ? data : dummyData;

  return (
    <section className="g-review-slider section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="g-review-swiper position-relative">
              <Swiper
                modules={[Navigation]}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                slidesPerView={1}
                spaceBetween={20}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 1,
                  },
                  992: {
                    slidesPerView: 2,
                  },
                  1400: {
                    slidesPerView: 2,
                  },
                }}
                className="blog-swiper"
              >
                {reviews.map((review, index) => (
                  <SwiperSlide key={index}>
                    <GReviewCard
                      name={review?.name}
                      stars={review?.stars}
                      heading={review?.heading}
                      description={review?.description}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="swiper-button-prev">
                <Image src={swiperPrev} alt="arrow" />
              </div>
              <div className="swiper-button-next">
                <Image src={swiperNext} alt="arrow" />
              </div>
            </div>
          </div>
        </div>
        {commonStars && (
          <div className="row">
            <p className="sec-head book-20 text-center mb-2 mt-5">
              7.8k+ people loved our events!
            </p>
            <ul className="rating d-flex align-items-center justify-content-center gap-2">
              {renderStars(4)}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default GReviewSlider;
