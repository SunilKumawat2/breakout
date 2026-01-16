"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
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

const FullSliderSec = ({ data, hasCardLinks = false }) => {
  let data1 = data;
  if (data) {
    data1 = data;
  } else {
    data1 = {
      images: [
        {
          image: bd1,
          heading: "Custom Tailored Experiences",
        },
        {
          image: bd2,
          heading: "Custom Tailored Experiences",
        },
        {
          image: bd3,
          heading: "Custom Tailored Experiences",
        },
      ],
    };
  }
  return (
    <section className="blog-slider section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2
              className="sec-head sm-head medium"
              dangerouslySetInnerHTML={{
                __html:
                  data1?.heading ||
                  "<span>7 Valuable Resources to help you plan the party</span>",
              }}
            ></h2>

            <p
              className="para"
              dangerouslySetInnerHTML={{
                __html:
                  data1?.description ||
                  "Try out these seven resources that we’ve created for you to plan the perfect birthday party for your loved ones. ",
              }}
            ></p>
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
              centeredSlides={true}
              slidesPerView={1}
              spaceBetween={20}
              initialSlide={4}
              breakpoints={{
                0: {
                  slidesPerView: 1.2,
                },
                640: {
                  slidesPerView: 1.5,
                },
                992: {
                  slidesPerView: 3.5,
                },
                1400: {
                  slidesPerView: 4.8,
                },
              }}
              className="blog-swiper"
            >
              {data1 &&
                data1?.icons?.length > 0 &&
                data1?.icons?.map((item, index) => (
                  <SwiperSlide key={index}>
                    {hasCardLinks ? (
                      <Link href={item.link} className="blog-card">
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
                        </div>
                      </Link>
                    ) : (
                      <div className="blog-card">
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
                        </div>
                      </div>
                    )}
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullSliderSec;
