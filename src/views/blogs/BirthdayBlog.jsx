"use client";
import React, { useState, useEffect, useRef } from "react";
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
import locIcon from "@/images/loc-icon.svg";
import ReserveASlot from "@/components/ReserveASlot";
import fdImg1 from "@/images/fd-img1.png";
import Link from "next/link";
import wh from "@/images/wh.svg";
import locPlace from "@/images/loc-place.svg";
import BirthdayBanner from "@/components/BirthdayBanner";
import bdayIllus from "@/images/bday-illus.svg";

import bdayImg1 from "@/images/bday1.jpg";
import bdayImg2 from "@/images/bday2.jpg";
import bdayImg3 from "@/images/bday3.jpg";
import bdayImg4 from "@/images/bday4.jpg";
import bdayImg5 from "@/images/bday5.jpg";
import bdayImg6 from "@/images/bday6.jpg";
import swiperPrev from "@/images/chev-left.svg";
import swiperNext from "@/images/chev-right.svg";
import partyillus from "@/images/party-illus.svg";
import BirthdayGetInTouch from "@/components/BirthdayGetInTouch";
import PartySlider from "@/components/PartySlider";
import ReadyToGoPlans from "@/components/ReadyToGoPlans";
import Videotestimonials from "@/components/Videotestimonials";
import FaqSection from "@/components/FaqSection";

import nightIllus from "@/images/night-illus.svg";

import bdayBanner from "@/images/bday-banner1.jpg";
import PartyExpertCon from "@/components/PartyExpertCon";
import { useRouter } from "next/navigation";
import api from "@/helpers/api";
import TrustedSection from "@/components/TrustedSection";
import GReviewSlider from "@/components/GReviewSlider";
import PhotographicStyledImage from "@/components/PhotographicStyledImage";
import IllusPartyBottom from "@/images/illus-party-bottom.svg";
import { useParams } from "next/navigation";

import linkIcon from "@/images/link-icon.svg";
import whatsappIcon from "@/images/whatsapp-icon.svg";
import instaIcon from "@/images/insta-icon.svg";
import xIcon from "@/images/x-ixon.svg";
import gmail from "@/images/gmail.svg";
import linkedin from "@/images/linkedin.svg";
import FullSliderSec from "@/components/FullSliderSec";
import toolIllus from "@/images/tool-illus.svg";
import BirthdayVenueWidget from "@/components/BirthdayVenueWidget";
import bdayblogIllus from "@/images/bdayblog-illus.svg";
import LocationCard from "@/components/LocationCard";
import OurLocationSec from "@/components/OurLocationSec";
import PartyGetInTouch from "@/components/PartyGetInTouch";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const BirthdayBlog = ({ blogData, id = "" }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const router = useRouter();
  const [MoreBlogs, setMoreBlogs] = useState(null)
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Fetch venues
  useEffect(() => {
    fetchMoreBlogs();
  }, [blogData?.id]);

  const fetchMoreBlogs = async () => {
    if (!blogData?.id) return; // safety check

    setLoading(true);
    try {
      const response = await api.get(`/blogs/${blogData.id}/related`);

      console.log("API Venue Data:", response?.data?.data);

      setMoreBlogs(response?.data?.data || []);
    } catch (err) {
      console.error("Error fetching venue cards:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Share functionality
  const handleShare = (platform) => {
    const currentUrl = window.location.href;
    const title = blogData?.heading || "Check out this blog post";
    const text =
      blogData?.description || "Interesting read! Have a look.";

    let shareUrl = "";

    switch (platform) {
      case "copy":
        navigator.clipboard.writeText(currentUrl).then(() => {
          alert("Link copied to clipboard!");
        });
        return;

      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(
          `${title} - ${currentUrl}`
        )}`;
        break;

      case "instagram":
        // Instagram does not support direct URL sharing
        navigator.clipboard.writeText(currentUrl).then(() => {
          alert("Link copied! Paste it in Instagram.");
        });
        return;

      case "twitter": // X
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(currentUrl)}`;
        break;

      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          currentUrl
        )}`;
        break;

      case "gmail":
        shareUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
          title
        )}&body=${encodeURIComponent(`${text}\n\n${currentUrl}`)}`;
        break;



      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };
  console.log("BirthdayBlog_BirthdayBlog", blogData)

  const hmtext =
    "Explore <span>a curated-list</span> of best party places in Bangalore to celebrate birthdays. Estimate a budget with Party Budget Calculator or discover venues with a simple discovery quiz.";

  return (
    <>
      {blogData && <BirthdayBanner data={blogData?.banner} />}
      <div className="black-gr-div">
        <div className="blog-top">
          <div className="container">
            <div className="blog-top-inner">
              <p className="sec-head medium-20 mb-0 d-flex align-items-center gap-2">
                Last updated on{" "}
                {blogData?.post_date &&
                  new Date(blogData.post_date)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "-")}
              </p>
              <div className="sec-head medium-20 d-flex align-items-center gap-3">
                Share blog
                <ul className="bl-soc-list">
                  <li>
                    <button onClick={() => handleShare("copy")}>
                      <Image
                        src={linkIcon}
                        alt="copy link"
                        width={35}
                        height={35}
                      />
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleShare("whatsapp")}>
                      <Image
                        src={whatsappIcon}
                        alt="share on whatsapp"
                        width={35}
                        height={35}
                      />
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleShare("instagram")}>
                      <Image
                        src={instaIcon}
                        alt="share on instagram"
                        width={35}
                        height={35}
                      />
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleShare("twitter")}>
                      <Image
                        src={xIcon}
                        alt="share on twitter"
                        width={35}
                        height={35}
                      />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {blogData?.description_text && (
          <HmTextSec text={blogData?.description_text} />
        )}
        <br />
        {blogData?.at_a_glance_summary && (
          <HmTextSec text={blogData?.at_a_glance_summary} />
        )}
        <br />
        {blogData?.additional_content && (
          <HmTextSec text={blogData?.additional_content} />
        )}
        <PartyExpertCon className="pt-80" data="blog_birthday_blog" />

        {blogData && (
          <FullSliderSec data={blogData?.iconsection} hasCardLinks={true} />
        )}

        <Image src={toolIllus} className="illus-image" alt="tool-illus" />
      </div>
      {
        blogData && (
          <BirthdayVenueWidget className="pt-80 pb-0" blogData={blogData} />
        )
      }

      {/* <div className="pt-80">
        <GReviewSlider commonStars={false} />
      </div> */}
      {/* <OurLocationSec
        className="sec-padding-top"
        // title={`About Our Breakout®  <span>${blogData?.title} Location</span>`}
        slug="koramangala"
      /> */}

      {blogData?.faqsection && <FaqSection className="pt-80" data={blogData?.faqsection} />}

      {blogData?.footersection && (
        <PartyGetInTouch data={blogData?.footersection} noImage={true} />
      )}

      {/* {blogData?.footersection && (
        <section className="section-padding Conclusion-sec pb-0">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-12 text-center">
                <h3
                  className="sec-head sm-head medium yellow-text"
                  dangerouslySetInnerHTML={{
                    __html: blogData?.footersection?.heading,
                  }}
                />
                <div
                  className="para"
                  dangerouslySetInnerHTML={{
                    __html: blogData?.footersection?.content,
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      )} */}
      <div className="black-gr-div">
        <section className="found-sec pt-80">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: blogData?.conclusion_text }}
                />
              </div>
            </div>
            <br />
            <div className="sec-head mb-0 medium-20 d-flex w-100 flex-column justify-content-center align-items-center gap-3">
              <h3>
                Found it useful? <span>Spread the word</span>
              </h3>
              <ul className="bl-soc-list">

                <li>
                  <button onClick={() => handleShare("whatsapp")}>
                    <Image
                      src={whatsappIcon}
                      alt="share on whatsapp"
                      width={65}
                      height={65}
                    />
                  </button>
                </li>
                <li>
                  <button onClick={() => handleShare("instagram")}>
                    <Image
                      src={instaIcon}
                      alt="share on instagram"
                      width={65}
                      height={65}
                    />
                  </button>
                </li>
                <li>
                  <button onClick={() => handleShare("twitter")}>
                    <Image
                      src={xIcon}
                      alt="share on twitter"
                      width={65}
                      height={65}
                    />
                  </button>
                </li>
                <li>
                  <button onClick={() => handleShare("linkedin")}>
                    <Image
                      src={linkedin}
                      alt="copy link"
                      width={65}
                      height={65}
                    />
                  </button>
                </li>
                <li>
                  <button onClick={() => handleShare("gmail")}>
                    <Image
                      src={gmail}
                      alt="copy link"
                      width={65}
                      height={65}
                    />
                  </button>
                </li>
                <li>
                  <button onClick={() => handleShare("copy")}>
                    <Image
                      src={linkIcon}
                      alt="copy link"
                      width={65}
                      height={65}
                    />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <Image src={bdayblogIllus} className="illus-image" alt="hm-illus" />
      </div>
      <div className="black-gr-div">
        {blogData?.faqs && (
          <FaqSection
            className="section-padding pb-0"
            data={blogData?.faqs}
          />
        )}

        <PartyGetInTouch
          // data="{data?.footersection}"
          // img={bdayblogIllus}
          noImage={true}
          noTextBottom={false}
          privacyLine={true}
        />
        <section className={`blog-slider-sec section-padding pb-0 arrows-diff`}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="esc-content text-center position-relative">
                  <h2 className="sec-head sm-head medium">
                    Read <span>More Blogs</span>
                  </h2>
                </div>
                <div className="blog-slider">
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
                    {MoreBlogs?.map((item, index) => (
                      <SwiperSlide key={item?.id || index}>
                        <div
                          className={`blog-card click-anim-card ${active == index ? "active" : ""
                            }`}
                          onMouseEnter={() => setActive(index)}
                          onMouseLeave={() => setActive(null)}
                          onClick={() =>
                            router.push(`/resources/blogs/${item?.slug}?type=${item?.type}`)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <div className="blog-card-img">
                            <Image
                              src={item?.featured_image}
                              width={500}
                              height={500}
                              alt="blog"
                            />
                          </div>

                          <div className="blog-card-content">
                            <h3
                              dangerouslySetInnerHTML={{ __html: item?.title }}
                            ></h3>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div ref={prevRef} className="swiper-button-prev custom-prev go-plan">
                    <Image src={swiperPrev} alt="prev" />
                  </div>

                  <div ref={nextRef} className="swiper-button-next custom-next go-plan">
                    <Image src={swiperNext} alt="next" />
                  </div>

                </div>
              </div>
            </div>
          </div>

        </section>
        <Image src={bdayblogIllus} className="illus-image" alt="hm-illus" />
      </div>
    </>
  );
};

export default BirthdayBlog;
