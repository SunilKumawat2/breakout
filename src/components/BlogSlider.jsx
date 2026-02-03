"use client";

import React, { useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import swiperPrev from "@/images/chev-left.svg";
import swiperNext from "@/images/chev-right.svg";
import BlogCard from "./BlogCard";
import { useGlobalContext } from "@/context/GlobalContext";
import Image from "next/image";

const BlogSlider = ({ className = "" }) => {
  const { blogs } = useGlobalContext();

  // Navigation refs
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Update if breakpoints change
  const maxSlidesPerView = 3.5;

  // Ensure enough slides for loop
  const adjustedBlogs = useMemo(() => {
    if (!blogs || blogs.length === 0) return [];

    if (blogs.length >= Math.ceil(maxSlidesPerView)) {
      return blogs;
    }

    let result = [];
    const times = Math.ceil(maxSlidesPerView / blogs.length) + 1;

    for (let i = 0; i < times; i++) {
      result = result.concat(blogs);
    }

    return result.slice(0, Math.ceil(maxSlidesPerView) + 1);
  }, [blogs]);

  return (
    <section className={`blog-slider-sec section-padding ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="sec-head sm-head medium">
              Read <span>Blogs</span>
            </h2>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="blog-slider position-relative">
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                loop={true}
                slidesPerView={1}
                spaceBetween={20}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                  992: { slidesPerView: 3 },
                  1400: { slidesPerView: 4 },
                }}
                className="blog-swiper"
              >
                {adjustedBlogs && adjustedBlogs?.map((blog, index) => (
                  <SwiperSlide key={index}>
                    <BlogCard blog={blog} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation buttons */}
              <div
                ref={prevRef}
                className="swiper-button-prev custom-prev go-plan"
              >
                <Image src={swiperPrev} alt="Previous" />
              </div>

              <div
                ref={nextRef}
                className="swiper-button-next custom-next go-plan"
              >
                <Image src={swiperNext} alt="Next" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSlider;
