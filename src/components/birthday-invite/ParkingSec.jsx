import React from "react";
import Image from "next/image";
import parking from "@/images/parking.png";
import parkingIcon from "@/images/parking-icon.svg";
import viewIcon from "@/images/eye-icon.svg";
import Link from "next/link";

const ParkingSec = ({ data }) => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h3
              className="sec-head medium"
              dangerouslySetInnerHTML={{
                __html: data?.heading,
              }}
            >
              {/* <span>Where’s</span> the party? */}
            </h3>
          </div>
        </div>
        <div className="row align-items-center mt-5">
          <div className="col-lg-6 col-12">
            {data?.image1 && (
              <Image
                src={data?.image1}
                className="w-100 h-auto"
                alt="parking"
                width={500}
                height={500}
              />
            )}
          </div>
          <div className="col-lg-5 offset-lg-1 col-12">
            <div className="parking-content">
              <h3
                className="sec-head medium"
                dangerouslySetInnerHTML={{
                  __html: data?.heading1,
                }}
              >
                {/* <span>Breakout® Escape Rooms</span> */}
              </h3>
              <p
                className="sec-head book-20"
                style={{ lineHeight: "140%" }}
                dangerouslySetInnerHTML={{
                  __html: data?.description1,
                }}
              >
                {/* 27, NMR Building, 1st floor Intermediate Ring Road, 100 Feet Rd,
                Koramangala, Bengaluru, Karnataka 560047 */}
              </p>
              <div className="park-container">
                <div className="l-part">
                  <Image
                    className="park-icon"
                    src={parkingIcon}
                    alt="parking"
                  />
                  <span>Parking Available</span>
                </div>
                <Link href="#" className="see-vid-btn">
                  <Image src={viewIcon} alt="play" />
                  <span>See Video</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParkingSec;
