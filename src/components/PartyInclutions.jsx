"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PartyCard from "./PartyCard";

const PartyInclutions = ({ data }) => {
  return (
    <>
      <div className="row mt-5">
        <div className="col-lg-12">
          <div className="blog-slider">
            <Swiper
              modules={[Pagination]}
              pagination={{
                clickable: true,
              }}
              centeredSlides={true}
              slidesPerView={1}
              spaceBetween={20}
              initialSlide={4}
              breakpoints={{
                0: {
                  slidesPerView: 1.5,
                },
                640: {
                  slidesPerView: 2.5,
                },
                992: {
                  slidesPerView: 3.5,
                },
                1400: {
                  slidesPerView: 3.5,
                },
              }}
              className="blog-swiper"
            >
              {data?.images?.length > 0 &&
                data?.images?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <PartyCard data={item} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <p className="sec-head medium-20">
              <span>{data?.note}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartyInclutions;
