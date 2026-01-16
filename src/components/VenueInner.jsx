import React from "react";
import Image from "next/image";
import fillStarIcon from "@/images/fill-star.svg";
import halfFillStarIcon from "@/images/half-fill-star.svg";
import unfillStarIcon from "@/images/unfill-star.svg";
import Link from "next/link";
import VenueImgSlider from "./VenueImgSlider";

import clockIcon from "@/images/cl.svg";
import moneyIcon from "@/images/rupee.svg";
import phoneIcon from "@/images/ph.svg";
import locIcon from "@/images/loc-y.svg";
import webIcon from "@/images/web.svg";

import locY from "@/images/loc-y.svg";
import GReviewSlider from "./GReviewSlider";

const VenueInner = ({ venue }) => {
  const images =
    venue?.images &&
    venue?.images.length > 0 &&
    typeof venue?.images === "string"
      ? venue?.images?.split(",")
      : [];
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        // Full star
        stars.push(<Image src={fillStarIcon} alt="star-icon" key={i} />);
      } else if (rating >= i - 0.5) {
        // Half star
        stars.push(
          <Image src={halfFillStarIcon} alt="half-star-icon" key={i} />
        );
      } else {
        // Empty star
        stars.push(
          <Image src={unfillStarIcon} alt="unfill-star-icon" key={i} />
        );
      }
    }
    return stars;
  };
  return (
    <div className="venue-inner-container">
      <div className="top-area">
        <div className="l-part">
          <h3>{venue?.name}</h3>
          <div className="stars-container">
            <div className="rating-stars">{renderStars(venue?.rating)}</div>
            <span>
              {venue?.rating}/5 (based on {venue?.reviews} Google reviews)
            </span>
          </div>
        </div>
        <div className="r-part">
          <div className="loc-con">
            <Image src={locY} alt="loc-y" />
            <span>{venue?.address}</span>
          </div>
          {venue?.google_map && (
            <Link href={venue?.google_map} target="_blank" className="main-btn">
              <span>View on Google Map</span>
            </Link>
          )}
        </div>
      </div>
      {images.length > 0 && <VenueImgSlider images={images} />}
      <div className="bottom-area">
        <div className="">
          <div className="row ">
            <div className="col-lg-6 col-12">
              <div className="venue-inner-item-list">
                <Image src={clockIcon} alt="venue-inner-item-list" />
                <span>{venue?.time}</span>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="venue-inner-item-list">
                <Image src={moneyIcon} alt="venue-inner-item-list" />
                <span>{venue?.price}</span>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="venue-inner-item-list">
                <Image src={phoneIcon} alt="venue-inner-item-list" />
                <span>{venue?.phone}</span>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="venue-inner-item-list">
                <Image src={locY} alt="venue-inner-item-list" />
                <span>{venue?.address}</span>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="venue-inner-item-list">
                <Image src={webIcon} alt="venue-inner-item-list" />
                <span>{venue?.website}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="content-box mb-5">
          <div className="row row-gap-25">
            <div
              className="col-lg-6 col-12"
              dangerouslySetInnerHTML={{ __html: venue?.content_left }}
            ></div>
            <div
              className="col-lg-6 col-12"
              dangerouslySetInnerHTML={{ __html: venue?.content_right }}
            ></div>
            {/* <div className="col-lg-6 col-12">
              <p className="para">Best Nearby: 60-90 minutes of play</p>
              <p className="para">
                Must-Try: The Ultimate Birthday Bash Destination!
              </p>
              <p className="para">
                Looking for the most epic kids' birthday party place in
                Bangalore? Well, stop the cake search because Funky Monkeys
                Bangalore is where the magic (and monkey business) happens!
                🍌🎈There’s an actual Funky Monkey who might just crash your
                party! Imagine the birthday photos!
              </p>
              <p className="para">
                The place doesn’t only serve drinks and dishes for celebrations
                but strives to make your birthday eccentric.
              </p>
            </div>
            <div className="col-lg-6 col-12">
              <h3 className="sec-head sm-head medium-20">
                <span>What Makes Funky Monkeys Special?</span>
              </h3>
              <p className="para">
                Funky Monkeys isn’t just an indoor play area—it’s a full-blown
                adventure zone. With slides, tunnels, ball pits, and climbing
                walls, it is basically a mini jungle gym for kids; it is
                designed to keep your little ones entertained.
              </p>
              <h3 className="sec-head sm-head medium-20">
                <span>Why Visit Funky Monkeys for a Birthday Party?</span>
              </h3>
              <p className="para">
                At Funky Monkeys, we provide stress-free, mess-free, and 100%
                FUN birthday celebrations. So, if your child wants a wild,
                action-packed birthday party, book a date at Funky Monkeys
                Bangalore and let them swing into a celebration they’ll never
                forget! 🎉🐵
              </p>
              <p className="para">
                P.S. No actual monkeys were harmed in the making of this fun
                zone, but plenty of parents have left feeling like they need a
                nap!
              </p>
            </div> */}
          </div>
        </div>
      </div>
      {venue?.reviews && venue?.reviews.length > 0 && (
        <GReviewSlider commonStars={false} reviews={venue?.reviews} />
      )}
    </div>
  );
};

export default VenueInner;
