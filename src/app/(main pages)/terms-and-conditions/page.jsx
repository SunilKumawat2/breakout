// "use client";
// import React, { useEffect } from "react";
import tsIllus from "@/images/ts-illus.svg";
import Image from "next/image";
import api from "@/helpers/api";

export async function getData() {
  try {
    const data = await api.get(`/terms-of-service`);
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
    <div className="pt-80">
      <div className="black-gr-div">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1
                className="sec-head medium sm-head mb-0 text-center yellow-text"
                dangerouslySetInnerHTML={{
                  __html: data?.heading || "Terms of Service",
                }}
              />
              <div
                className="main-con pt-80 para"
                dangerouslySetInnerHTML={{
                  __html: data?.content || "Terms of Service",
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
