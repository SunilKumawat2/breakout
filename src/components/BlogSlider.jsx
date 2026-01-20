"use client";
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import BlogCard from "./BlogCard";
import { useGlobalContext } from "@/context/GlobalContext";
// import swiperPrev from "@/images/swiper-prev.svg";
// import swiperNext from "@/images/swiper-next.svg";
import swiperPrev from "@/images/chev-left.svg";
import swiperNext from "@/images/chev-right.svg";
import Image from "next/image";

const BlogSlider = ({ className = "", }) => {
  const { blogs } = useGlobalContext();

  // Detect the max slides per view from breakpoints:
  // Note: update if breakpoints change!
  const maxSlidesPerView = 3.5;

  // Swiper's loop mode requires slides >= slidesPerView to work correctly.
  // If not, duplicate slides to meet minimum required for a nice loop effect.
  const adjustedBlogs = useMemo(() => {
    if (!blogs) return [];
    if (blogs.length >= Math.ceil(maxSlidesPerView)) return blogs;
    // Duplicate slides so we have at least maxSlidesPerView blogs
    let result = [];
    let times = Math.ceil(maxSlidesPerView / blogs.length) + 1;
    for (let i = 0; i < times; i++) {
      result = result.concat(blogs);
    }
    // Don't overgrow, trim to next multiple above max slides per view
    return result.slice(0, Math.ceil(maxSlidesPerView) + 1);
  }, [blogs]);

  return (
    <section className={`blog-slider-sec section-padding ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="sec-head sm-head medium">Read <span>Blogs</span></h2>
          </div>
        </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="blog-slider">
            <Swiper
              modules={[Pagination,Navigation]}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              // loop={true}
              loop={adjustedBlogs.length >= Math.ceil(maxSlidesPerView)}
              centeredSlides={true}
              slidesPerView={1}
              spaceBetween={20}
              breakpoints={{
                0: {
                  slidesPerView: 1.5,
                },
                640: {
                  slidesPerView: 2.5,
                },
                992: {
                  slidesPerView: 3,
                },
                1400: {
                  slidesPerView: 4,
                },
              }}
              className="blog-swiper"
            >
              {adjustedBlogs &&
                adjustedBlogs.map((blog, index) => (
                  <SwiperSlide key={index}>
                    <BlogCard blog={blog} />
                  </SwiperSlide>
                ))}
            </Swiper>
            <div className="swiper-button-prev custom-prev go-plan">
              <Image src={swiperPrev} alt="Previous" />
            </div>

            <div className="swiper-button-next custom-next go-plan">
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
