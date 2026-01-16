import React from "react";
import Image from "next/image";
import cross from "@/images/cross.svg";
import check from "@/images/check.svg";
import Link from "next/link";
import PartyExpertCon from "@/components/PartyExpertCon";

const Packages = ({ packages, category, capacity }) => {
  if (category === "birthday" && capacity < 8) {
    return (
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="sec-head medium">
                There is no package available for this event
              </h2>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section-padding pt-0 pb-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              {packages && packages?.length > 0 ? (
                <div className="package-container">
                  <div
                    className="package-header"
                    style={{ gridTemplateColumns: "1fr 0.7fr" }}
                  >
                    <div className="package-header-cell">
                      <h3 className="mb-0 text-center">Packages</h3>
                    </div>
                    <div className="package-header-cell">
                      <h3 className="mb-0">Pricing</h3>
                    </div>
                  </div>

                  <div className="package-body">
                    {packages?.map((item, index) => (
                      <div
                        className="package-row"
                        style={{ gridTemplateColumns: "1fr 0.7fr" }}
                        key={index}
                      >
                        <div className="package-row-cell">
                          <h3>{item?.name}</h3>
                        </div>
                        <div className="package-row-cell">
                          <p className="sec-head medium-20 mb-0">
                            <span>₹</span> {item?.totalAmount}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="package-container">
                  <div className="package-header py-5">
                    <h3 className="mb-0 text-center sec-head medium-20">
                      No packages found
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <PartyExpertCon />
      <section className="section-padding text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <span>Out of Budget?</span> Try out our crazy escape rooms!
            </div>
            <Link href="/escape-rooms" className="center main-btn mt-3">
              <span>{"Escape Rooms"}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Packages;
