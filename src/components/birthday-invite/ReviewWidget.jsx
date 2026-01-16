import React from "react";
import Image from "next/image";
import bnInv1 from "@/images/bn-inv1.svg";
import bnInv2 from "@/images/bn-inv2.svg";
import bnInv3 from "@/images/bn-inv3.svg";
import GReviewSlider from "../GReviewSlider";

const ReviewWidget = ({ data }) => {
  return (
    <section className="b-inv-g-review-widget section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 col-12">
            <h3 className="sec-head medium text-center">
              <span>Unwind</span> and <span>Enjoy</span> with Breakout
            </h3>
          </div>
          <div className="col-lg-8 col-12">
            <div className="row row-gap-25 mt-5">
              <div className="col-lg-4 col-12">
                <div className="bn-card">
                  <Image src={bnInv1} alt="bg" />
                  <p className="sec-head book-20">
                    Escape <br className="d-sm-block d-none" /> Room Fun
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="bn-card">
                  <Image src={bnInv2} alt="bg" />
                  <p className="sec-head book-20">
                    Exciting
                    <br className="d-sm-block d-none" /> Birthdays
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="bn-card">
                  <Image src={bnInv3} alt="bg" />
                  <p className="sec-head book-20">Corporate Team Outing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10 col-12">
            <GReviewSlider data={data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewWidget;
