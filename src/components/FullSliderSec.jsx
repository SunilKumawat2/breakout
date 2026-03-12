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
import Rectangle_771 from "@/images/Rectangle 771.png";
import Rectangle4 from "@/images/Rectangle4.png";
import Rectangle1 from "@/images/Rectangle1.png";

  const FullSliderSec = ({ data, hasCardLinks = false }) => {
    let data1 = "";
    console.log("data1_data1", data?.icons)
    if (data1) {
      data1 = data;
    } else {
      data1 = {
        // images: [
        //   {
        //     image: bd1,
        //     heading: "Custom Tailored Experiences",
        //   },
        //   {
        //     image: bd2,
        //     heading: "Custom Tailored Experiences",
        //   },
        //   {
        //     image: bd3,
        //     heading: "Custom Tailored Experiences",
        //   },
        // ],
        description: "Try out these seven resources that we’ve created for you to plan the perfect birthday party for your loved ones. ",
        heading: "7 Valuable Resources to help you plan the party",
        icons: [
          // {
          //   heading: "Party Planning Template",
          //   image: "https://breakout.bvmwebsolutions.com/https://breakout.bvmwebsolutions.com/uploads/images/party_a3cd163f-cf17-405b-9575-256d10c59fae.jpeg",
          //   link: "#"
          // }
          // , {
          //   heading: "Ebook",
          //   image: null,
          //   link: "https://1drv.ms/b/c/033f28a2603d05d2/IQD0muffutStQ4k0IlgvEXloAWci224sAK0HWWSMyr4mgCo?e=393vcE"
          // },
          {
            heading: "Venue Discovery Quiz",
            image: Rectangle_771,
            link: "/resources/quiz/party-finding"
          }
          , {
            heading: "Party Calculator",
            image: Rectangle4,
            category:"birthday",
            link: "/resources/quiz/quote-calculator?category=birthday"
          }
          // ,
          // {
          //   heading: "Party Planning Template",
          //   image: Rectangle1,
          //   link: "#"
          // }, {
          //   heading: "Ebook",
          //   image: null,
          //   link: "https://1drv.ms/b/c/033f28a2603d05d2/IQD0muffutStQ4k0IlgvEXloAWci224sAK0HWWSMyr4mgCo?e=393vcE"
          // }
        ]

      };
    }

    const comibne = [...(data1?.icons || []), ...(data?.icons || [])]
    console.log("comibne_comibne",comibne)
  return (
    <section className="blog-slider-sec section-padding pb-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2
              className="sec-head sm-head medium yellow-text"
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
      <div className="row pt-80">
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
              {comibne &&
                comibne?.length > 0 &&
                comibne?.map((item, index) => (
                  <SwiperSlide key={index}>
                    {hasCardLinks ? (
                      <Link href={item?.link} className="blog-card">
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
