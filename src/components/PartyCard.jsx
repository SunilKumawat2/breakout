import React from "react";
import Image from "next/image";
import blogImg from "@/images/blog-img.jpg";

const PartyCard = ({ data }) => {
  return (
    <article className="blog-card">
      <div className="blog-card-img">
        {data?.image && (
          <Image src={data?.image} alt="blog" width={500} height={500} />
        )}
      </div>
      <div className="blog-card-content">
        <p>{data?.heading}</p>
      </div>
    </article>
  );
};

export default PartyCard;
