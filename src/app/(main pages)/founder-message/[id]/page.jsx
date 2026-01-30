import React from "react";

import BirthdayBanner from "@/components/BirthdayBanner";
import VenueImgSlider from "@/components/VenueImgSlider";

import api from "@/helpers/api";

import Image from "next/image";
import matterIllus from "@/images/matter-illus.svg";
import CommonVideoPlayer from "@/components/CommonVideoPlayer";
import InnerPageBanner from "@/components/InnerPageBanner";
import PartyExpertCon from "@/components/PartyExpertCon";

export async function getData(id) {
  try {
    const [founderMessage] = await Promise.all([
      api.get(`/whybirthdaymatter/${id}`),
    ]);
    return {
      founderMessage: founderMessage.data.data,
    };
  } catch (error) {
    notFound();
  }
}

const SigngleBlog = async ({ params }) => {
  const { id } = params;
  const { founderMessage } = await getData(id);
  const images =
    founderMessage?.images && founderMessage?.images?.length > 1
      ? founderMessage?.images.slice(1).map((img) => img.url)
      : [];

  const bannerImage =
    founderMessage?.images && founderMessage?.images?.length > 0
      ? founderMessage?.images[0].url
      : null;
  return (
    <>
      {founderMessage && (
        <InnerPageBanner
          banner={{ ...founderMessage, image: bannerImage }}
          bdayInner={true}
        />
      )}

      <div className="black-gr-div">
        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {founderMessage?.video && (
                  <CommonVideoPlayer src={founderMessage?.video} />
                )}
                {images && <VenueImgSlider images={images} />}
              </div>
              <div className="col-lg-12">
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{
                    __html: founderMessage?.content || "",
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        <PartyExpertCon className="pt-80" data="founder_message"/>
        <Image
          src={matterIllus}
          className="w-100 h-auto"
          alt="founder-message"
        />
      </div>
    </>
  );
};

export default SigngleBlog;
