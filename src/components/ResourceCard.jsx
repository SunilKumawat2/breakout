import React from "react";
import Image from "next/image";
import blogImg from "@/images/blog-img.jpg";
import Link from "next/link";

const ResourceCard = ({ blog,link={}}) => {
  if (!blog) return null;
  console.log("ResourceCard-BlogCardBlogCard",blog.slug)
  return (
    <Link href={`${link}`} target="_blank">
      <article className="blog-card">
        <div className="blog-card-img">
          {blog?.image && (
            <Image src={blog.image} width={700} height={700} alt="blog" />
          )}
        </div>
        <div className="blog-card-content">
          <p>{blog?.heading}</p>
        </div>
      </article>
    </Link>
  );
};

export default ResourceCard;
