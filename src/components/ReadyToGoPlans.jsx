"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BlogCard from "./BlogCard";
import blogImg from "@/images/blog-img.jpg";
import Image from "next/image";
import bd1 from "@/images/bd1.jpg";
import bd2 from "@/images/bd2.jpg";
import bd3 from "@/images/bd3.jpg";
import bd4 from "@/images/bd4.jpg";
import bd5 from "@/images/bd5.jpg";
import bd6 from "@/images/bd6.jpg";
import bd7 from "@/images/bd7.jpg";
import Link from "next/link";
import swiperPrev from "@/images/swiper-prev.svg";
import swiperNext from "@/images/swiper-next.svg";

const ReadyToGoPlans = ({ data }) => {
  const [active, setActive] = useState(null);
  let data1 = data;
  if (data) {
    data1 = data;
  } else {
    data1 = [
      {
        image: null,
        title: "Custom Tailored Experiences",
        desc: "Every party is designed with your child in mind, making it as unique as they are.",
      },
      {
        image: null,
        title: "Custom Tailored Experiences",
        desc: "Every party is designed with your child in mind, making it as unique as they are.",
      },
      {
        image: null,
        title: "Custom Tailored Experiences",
        desc: "Every party is designed with your child in mind, making it as unique as they are.",
      },
    ];
  }
  const totalSlides = data1?.images?.length || 0;
  return (
    <section className="blog-slider section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2
              className="sec-head sm-head medium"
              dangerouslySetInnerHTML={{
                __html: data1?.heading || "Ready to go Plans",
              }}
            ></h2>
            {data1?.description && (
              <p
                className="para"
                dangerouslySetInnerHTML={{ __html: data1?.description }}
              ></p>
            )}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-12">
            <div className="blog-slider">
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                watchOverflow={false}
                loop={true}
                allowSlideNext={true}
                allowSlidePrev={true}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                centeredSlides={false}
                slidesPerView={1}
                spaceBetween={20}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                  992: { slidesPerView: 3 },
                  1400: { slidesPerView: 4 },
                }}
                className="blog-swiper"
              >

                {data1 &&
                  data1?.images?.length > 0 &&
                  data1?.images?.map((item, index) => (
                    <SwiperSlide key={index}>
                      {/* <div className='ready-card'>
                                    <div className='ready-card-img'>
                                        {
                                            item.image && (
                                                <Image src={item.image} alt="blog" />
                                            )
                                        }
                                    </div>
                                    <div className='ready-card-content'>
                                        <h3>{item.title}</h3>
                                        <p className='para'>{item.desc}</p>
                                    </div>
                                </div> */}
                      <div
                        className={`blog-card click-anim-card ${active === index ? "active" : ""
                          }`}
                        onClick={() => setActive(index)}
                      >
                        <div className="blog-card-img">
                          {item.image && (
                            <Image
                              src={item.image}
                              width={500}
                              height={500}
                              alt="blog"
                            />
                          )}
                        </div>
                        <div className="blog-card-content">
                          <h3
                            dangerouslySetInnerHTML={{ __html: item.heading }}
                          ></h3>
                          <p className="para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quisquam, quos.
                          </p>
                        </div>
                      </div>
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
      </div>

    </section>
  );
};

export default ReadyToGoPlans;
