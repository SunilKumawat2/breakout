"use client";
import React, { useState, useEffect } from "react";
import loc1 from "@/images/koramangala.jpg";
import loc2 from "@/images/jp-nagar.jpg";
import loc3 from "@/images/whitefield.jpg";
import LocationCard from "./LocationCard";
import Image from "next/image";
import Link from "next/link";
import api from "@/app/helpers/api";
import { useGlobalContext } from "@/context/GlobalContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import GoVirtual from "@/images/go-virtual.jpg";
import "swiper/css";
import "swiper/css/pagination";

const VisitLocations = ({ title = null, desc = null,className = "", isVirtual = true }) => {
  const { escaperoomLocations, loading, errors } = useGlobalContext();
console.log("nsdfjkshdfg_escaperoomLocations",escaperoomLocations)
  // const [rooms, setRooms] = useState([]);
  const [virtualCard, setVirtualCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/virtual-escaperoom");
      const data = res.data.data;
      console.log("sjdfhsdfhsjdfksdghf",data)
      setVirtualCard({
        title: "Go Virtual",
        image: GoVirtual,
        // image: data?.image,
        slug: "virtual-game",
      });
    };

    fetchData();
  }, []);

  return (
      <section className={`loc-section ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center col-head">
            <h2
              className="sec-head sm-head medium"
              dangerouslySetInnerHTML={{
                __html: title || "Visit <span>a Location</span>",
              }}
            />
            {desc && (
              <p
                className="para medium-20 mb-4"
                dangerouslySetInnerHTML={{ __html: desc }}
              />
            )}
          </div>
        </div>
        {!isMobile ? (
          <div className="row row-gap-25">
            {escaperoomLocations &&
              escaperoomLocations.map((item, index) => (
                <div className="col-lg-4 col-12" key={index}>
                  <LocationCard location={item} />
                </div>
              ))}
            {virtualCard && isVirtual && (
              <div className="col-lg-4 col-12">
                <LocationCard location={virtualCard} isVirtual={true}/>
              </div>
            )}
          </div>
        ) : (
          <div className="row row-gap-25">
            <div className="col-12">
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                }}
                slidesPerView={1}
                spaceBetween={20}
              >
                {escaperoomLocations &&
                  escaperoomLocations.map((item, index) => (
                    <SwiperSlide key={index}>
                      <LocationCard location={item} />
                    </SwiperSlide>
                  ))}
                {virtualCard && isVirtual && (
                  <SwiperSlide>
                    <LocationCard location={virtualCard} />
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VisitLocations;
