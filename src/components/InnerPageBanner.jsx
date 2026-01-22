"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import locIcon from "@/images/loc-icon.svg";
import { CommonModal } from "./CommonModal";

const InnerPageBanner = ({ banner, bdayInner }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const trailerBtnRef = useRef(null);

  const renderImageOrVideo = (image) => {
    if (typeof image === "string" && image) {
      if (
        image.includes(".mp4") ||
        image.includes(".webm") ||
        image.includes(".mov") ||
        image.includes(".avi") ||
        image.includes(".mkv")
      ) {
        return <video src={image} autoPlay muted loop playsInline />;
      } else {
        return (
          <Image src={image} width={1920} height={1080} alt="banner-image" />
        );
      }
    }
    return null;
  };
  return (
    <header className="inner-page-banner">
      {/* {JSON.stringify(banner.image)} */}
      {banner.image && (
        <div className="inner-page-banner-img">
          {renderImageOrVideo(banner.image)}
          {/* {banner?.image && (
            <Image
              src={banner.image}
              width={1920}
              height={1080}
              alt="banner-image"
            />
          )} */}
        </div>
      )}
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="inner-page-banner-content">
              {banner.heading && (
                <h1
                  className="sec-head"
                  dangerouslySetInnerHTML={{ __html: banner.heading || "" }}
                />
              )}
              {banner.description && !bdayInner ? (
                <h3 className="sec-head medium-20">
                  <Image src={locIcon} alt="loc-icon" />
                  {banner.description || ""}
                </h3>
              ) : (
                <h3
                  className="sec-head medium-20"
                  dangerouslySetInnerHTML={{ __html: banner.description || "" }}
                />
              )}
              {banner.subTitle && (
                <h3
                  className="sec-head medium"
                  dangerouslySetInnerHTML={{ __html: banner.subTitle || "" }}
                />
              )}
              {banner.para && (
                <p
                  className="sec-head book-20"
                  dangerouslySetInnerHTML={{ __html: banner.para || "" }}
                />
              )}
              <div className="btn-group">
                {banner?.btns?.map((btn, index) => {
                  const isWatchTrailer = btn.title === "Watch Trailer";

                  return (
                    <div className="btn-group-item" key={index}>
                      {isWatchTrailer ? (
                        <button
                          ref={trailerBtnRef}
                          type="button"
                          className={`main-btn ${(index + 1) % 2 === 0 && "dark-btn yellow-text"
                            }`}
                          onClick={() => {
                            setVideoUrl(btn.link);
                            setShowTrailer((prev) => !prev);
                          }}
                        >
                          <span>{btn.title}</span>
                        </button>
                      ) : (
                        <Link
                          href={btn.link}
                          className={`main-btn ${(index + 1) % 2 === 0 && "dark-btn yellow-text"
                            }`}
                        >
                          <span>{btn.title}</span>
                        </Link>
                      )}
                    </div>
                  );
                })}

              </div>


              {banner.btns?.map((btn, index) => (
                <div key={index}>
                  {btn.enc && (
                    <div className="btn-group-item-enc">{btn.enc}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    
      <CommonModal show={showTrailer} handleClose={() => setShowTrailer(false)}>
  <div className="video-wrapper">
    <video
      src={banner.image}
      controls
      autoPlay
      playsInline
    />
  </div>
</CommonModal>



    </header>
  );
};

export default InnerPageBanner;
