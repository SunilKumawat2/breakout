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

import partyillus from "@/images/party-illus.svg";
import BirthdayGetInTouch from "@/components/BirthdayGetInTouch";
import PartySlider from "@/components/PartySlider";
import ReadyToGoPlans from "@/components/ReadyToGoPlans";
import Videotestimonials from "@/components/Videotestimonials";
import FaqSection from "@/components/FaqSection";

import nightIllus from "@/images/night-illus.svg";

import bdayBanner from "@/images/bday-banner1.jpg";
import PartyExpertCon from "@/components/PartyExpertCon";

import api from "@/helpers/api";
import TrustedSection from "@/components/TrustedSection";
import GReviewSlider from "@/components/GReviewSlider";
import PhotographicStyledImage from "@/components/PhotographicStyledImage";

import { useParams } from "next/navigation";

import linkIcon from "@/images/link-icon.svg";
import whatsappIcon from "@/images/whatsapp-icon.svg";
import instaIcon from "@/images/insta-icon.svg";
import xIcon from "@/images/x-ixon.svg";
import OurLocationSec from "@/components/OurLocationSec";

const SigngleBlog = ({ blogData }) => {
  // Share functionality
  const handleShare = (platform) => {
    const currentUrl = window.location.href;
    const title = blogData?.heading || "Check out this blog post";
    const text = blogData?.description || "Interesting read!";

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
        // Instagram doesn't support direct sharing via URL, so we'll copy the link
        navigator.clipboard.writeText(currentUrl).then(() => {
          alert("Link copied! You can now paste it in Instagram.");
        });
        return;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(currentUrl)}`;
        break;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      {blogData && <BirthdayBanner data={blogData} />}

      <div className="blog-top">
        <div className="container">
          <div className="blog-top-inner">
            <p className="sec-head medium-20 mb-0 d-flex align-items-center gap-2">
              Last updated on {blogData?.post_date}
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

      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blogData?.content }}
              />
            </div>
          </div>
        </div>
      </section>
      <OurLocationSec title="Visit a <span>Location</span>" />
      <HomeContact noTextBottom={false} privacyLine={false} noImage={true} />
      <br />
      <br />
      <br />
    </>
  );
};

export default SigngleBlog;
