import React from "react";
import Image from "next/image";
import bnInv1 from "@/images/bn-inv1.svg";
import bnInv2 from "@/images/bn-inv2.svg";
import bnInv3 from "@/images/bn-inv3.svg";
import GReviewSlider from "@/components/GReviewSlider";
import PhotographicStyledImage from "./PhotographicStyledImage";

const GlobalReviewWidget = ({
  title = "<span>Capturing</span> Happiness",
  data,
  reviews,
}) => {
  return (
    <section className="b-inv-g-review-widget section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 col-12">
            <h3
              className="sec-head medium text-center"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </div>
        </div>
        <div className="row row-gap-25">
          <div className="photographic-styled-image-container">
            {data?.image1 && data?.image1 != "" && (
              <PhotographicStyledImage image={data?.image1} />
            )}
            {data?.image2 && data?.image2 != "" && (
              <PhotographicStyledImage image={data?.image2} />
            )}
            {data?.image3 && data?.image3 != "" && (
              <PhotographicStyledImage image={data?.image3} />
            )}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10 col-12">
            <GReviewSlider commonStars={false} data={reviews} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalReviewWidget;
