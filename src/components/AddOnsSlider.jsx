"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BlogCard from "./BlogCard";
import blogImg from "@/images/blog-img.jpg";
import Image from "next/image";
import cv1 from "@/images/cv1.jpg";
import cv2 from "@/images/cv2.jpg";
import cv3 from "@/images/cv3.jpg";
import cv4 from "@/images/cv4.jpg";
import cv5 from "@/images/cv5.jpg";
import cv6 from "@/images/cv6.jpg";

import Link from "next/link";
const AddOnsSlider = ({ data }) => {
  const addOns = [
    {
      image: cv1,
      title: "Success Decors",
    },
    {
      image: cv2,
      title: "Hi-Tea",
    },
    {
      image: cv3,
      title: "Lunch / Dinner Buffet",
    },
    {
      image: cv4,
      title: "Hi-Tea",
    },
    {
      image: cv5,
      title: "Karaoke",
    },
    {
      image: cv6,
      title: "Photography",
    },
  ];
  return (
    <section className="blog-slider section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2
              className="sec-head sm-head medium"
              dangerouslySetInnerHTML={{ __html: data?.heading }}
            />
            {data?.description && (
              <p
                className="para medium-20 mt-3"
                dangerouslySetInnerHTML={{ __html: data?.description }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-12">
          <div className="blog-slider">
            <Swiper
              modules={[Pagination]}
              pagination={{
                clickable: true,
              }}
              loop={true}
              centeredSlides={true}
              slidesPerView={1}
              spaceBetween={20}
              initialSlide={3}
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
                  slidesPerView: 4.3,
                },
              }}
              className="blog-swiper"
            >
              {data?.images &&
                data?.images?.length > 0 &&
                data?.images?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="blog-card">
                      <div className="blog-card-img">
                        {item.image && (
                          <Image
                            src={item.image}
                            width={500}
                            height={500}
                            alt={item.heading}
                          />
                        )}
                      </div>
                      <div className="blog-card-content">
                        <h3
                          dangerouslySetInnerHTML={{ __html: item.heading }}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddOnsSlider;
