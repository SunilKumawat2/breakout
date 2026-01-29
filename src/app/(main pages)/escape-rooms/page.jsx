"use client";
import React, { useState, useEffect } from "react";
import InnerPageBanner from "@/components/InnerPageBanner";
import Image from "next/image";
import enc from "@/images/enc.svg";
import mBox from "@/images/m-box.png";
import HmTextSec from "@/components/home/HmTextSec";
import icon1 from "@/images/icon1.svg";
import icon2 from "@/images/icon2.svg";
import icon3 from "@/images/icon3.svg";
import icon4 from "@/images/icon4.svg";
import illus3 from "@/images/illus3.svg";
import hmIllus from "@/images/bottom-illus.svg";
import LogoSec from "@/components/LogoSec";
import EscapeRoomCard from "@/components/EscapeRoomCard";
import CounterBox from "@/components/CounterBox";
import VisitLocations from "@/components/VisitLocations";
import PeakExpSec from "@/components/PeakExpSec";
import BlogSlider from "@/components/BlogSlider";
import HomeContact from "@/components/home/HomeContact";
import TrustedSection from "@/components/TrustedSection";
import ReviewWidget from "@/components/birthday-invite/ReviewWidget";
import GlobalReviewWidget from "@/components/GlobalReviewWidget";
import Videotestimonials from "@/components/Videotestimonials";
import FaqSection from "@/components/FaqSection";

import api from "@/app/helpers/api";
import PageLoader from "next/dist/client/page-loader";
import SmoothScrolling from "@/components/SmoothScroll";

const page = () => {
  const [rooms, setRooms] = useState([]);
  const [escapeRooms, setEscapeRooms] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await api.get("/escaperoom-archive");
        setRooms(res1.data.data);

        const res2 = await api.get("/escaperooms");
        setEscapeRooms(res2.data.data);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false); // ✅ stop loader when both calls finish
      }
    };
    fetchData();
  }, []);

  const bannerLinks = [
    {
      link: rooms?.bannersection?.cta_link1,
      title: rooms?.bannersection?.cta_label1,
      enc: (
        <>
          <Image src={enc} alt="enc" /> <span>Secure Payment Gateway</span>
        </>
      ),
    },
    {
      link: rooms?.bannersection?.cta_link2,
      title: rooms?.bannersection?.cta_label2,
    },
  ];

  useEffect(() => {
    const shouldScroll = sessionStorage.getItem("scrollToEscapeRooms");

    if (shouldScroll === "true" && escapeRooms?.length > 0) {
      // wait for DOM paint
      setTimeout(() => {
        const section = document.getElementById("escape-rooms-section");

        if (section) {
          section.scrollIntoView({
            behavior: "auto", // use "smooth" if you want animation
            block: "start",
          });
        }

        // remove key so it doesn't auto-scroll again
        sessionStorage.removeItem("scrollToEscapeRooms");
      }, 500);
    }
  }, [escapeRooms]);



  return (
    <>
      {/* {rooms?.bannersection && (
        <InnerPageBanner
          banner={{ ...rooms?.bannersection, btns: bannerLinks }}
          bdayInner={true}
        />
      )} */}
      {!rooms?.bannersection ? (
        <SmoothScrolling />
      ) : (
        <InnerPageBanner
          banner={{ ...rooms?.bannersection, btns: bannerLinks }}
          bdayInner={true}
        />
      )}

      <div className="black-gr-div">
        {/* <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <Image src={mBox} alt="banner" className="m-box w-100 h-auto" />
              </div>
            </div>
          </div>
        </section> */}
        {rooms?.iconsection?.description && (
          <HmTextSec className="sec-padding-top" text={rooms?.iconsection?.description} />
        )}
        {rooms?.iconsection && (
          <section className="sec-padding-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h3
                    className="sec-head medium sm-head"
                    dangerouslySetInnerHTML={{
                      __html: rooms?.iconsection?.heading,
                    }}
                  />
                  <div className="row row-gap-25 mt-5">
                    {rooms?.iconsection?.icons?.length > 0 &&
                      rooms?.iconsection?.icons.map((item, index) => (
                        <div className="col-lg-3 col-12" key={index}>
                          <div className="box-item">
                            <div className="box-item-icon">
                              {item?.image && (
                                <Image
                                  src={item.image}
                                  width={100}
                                  height={100}
                                  alt="enc"
                                />
                              )}
                            </div>
                            <div className="box-item-content">
                              <h4 className="sec-head medium-20 mb-0">
                                {item?.heading}
                              </h4>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {rooms?.iconsection && (
          <TrustedSection className="pb-0" removeHeading={true} data={rooms?.iconsection} />
        )}
        <LogoSec className="pb-0" title="In the <span>News</span>" />
        <Image src={hmIllus} alt="illus3" className="illus-3 w-100 h-auto" />
      </div>
      <div className="black-gr-div">
        <VisitLocations className="sec-padding-top" />
        <section className="section-padding esc-sec pb-0" id="escape-rooms-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h3 className="sec-head medium sm-head">
                  Escape <span>Rooms</span>
                </h3>
              </div>
            </div>
            <div className="row row-gap-25">
              {escapeRooms &&
                escapeRooms.map((room, index) => (
                  <div className="col-lg-4 col-12" onClick={()=> sessionStorage.setItem("scrollToEscapeRooms", true)} key={index}>
                    <EscapeRoomCard room={room} />
                  </div>
                ))}
            </div>
          </div>
        </section>
        <Image src={illus3} alt="illus3" className="illus-3 w-100 h-auto" />
      </div>
      {/* <section className="section-padding counter-sec pb-0">
          <div className="container">
            <div className="row">
              {[...Array(4)].map((_, index) => (
                <div className="col-lg-3 col-12" key={index}>
                  <CounterBox />
                </div>
              ))}
            </div>
          </div>
        
        </section> */}

      <div className="black-gr-div">
        <div className="sec-padding-top">
          {(rooms?.googlereviews || rooms?.googlereviews?.length > 0) && (
            <GlobalReviewWidget
              reviews={rooms?.googlereviews}
              data={rooms?.imagesection}
            />
          )}
        </div>

        {rooms?.videotestimonials && (
          <Videotestimonials data={rooms?.videotestimonials} />
        )}
        {rooms?.faqsection && <FaqSection className="section-padding" data={rooms?.faqsection} />}
        <BlogSlider className="py-0" />
        {rooms?.footersection && (
          <HomeContact textData={rooms?.footersection} />
        )}
      </div>

      {/* <PeakExpSec /> */}
      {/* </div> */}
    </>
  );
};

export default page;
