// "use client";
// import React, { useEffect } from "react";
import tsIllus from "@/images/ts-illus.svg";
import Image from "next/image";
import api from "@/helpers/api";

export async function getData() {
  try {
    const data = await api.get(`/refund-policy`);
    console.log("data privacy", data?.data?.data);
    return data?.data?.data;
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    return null;
  }
}

const page = async () => {
  const data = await getData();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const data = await api.get(`/privacy-policy`);
  //       console.log("data privacy", data?.data?.data);
  //     };
  //     fetchData();
  //   }, []);
  return (
    <div className="section-padding">
      <div className="black-gr-div">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1
                className="sec-head pb-5 medium sm-head mb-5 text-center yellow-text"
                dangerouslySetInnerHTML={{
                  __html: data?.heading || "Refund Policy",
                }}
              />
              <div
                className="main-con mt-5 para"
                dangerouslySetInnerHTML={{
                  __html: data?.content || "Refund Policy",
                }}
              />
            </div>
          </div>
        </div>
        <Image src={tsIllus} alt="privacy-policy" className="w-100 h-auto" />
      </div>
    </div>
  );
};

export default page;
