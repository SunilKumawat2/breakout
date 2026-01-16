import React from "react";
import Image from "next/image";
import tWh from "@/images/t-wh.svg";
import tIns from "@/images/t-ins.svg";
import tLink from "@/images/t-link.svg";
import tX from "@/images/t-x.svg";
import tEmail from "@/images/t-email.svg";
import tShare from "@/images/t-share.svg";

const TeamCard = ({ type, data }) => {
  const renderSocialLinks = (data) => {
    if (
      data?.whatsapp == "" &&
      data?.instagram == "" &&
      data?.linkedin == "" &&
      data?.twitter == "" &&
      data?.gmail == "" &&
      data?.link == ""
    )
      return null;
    return (
      <ul>
        {data?.whatsapp != "" && (
          <li>
            <Image src={tWh} alt="tWh" />
          </li>
        )}
        {data?.instagram != "" && (
          <li>
            <Image src={tIns} alt="tIns" />
          </li>
        )}
        {data?.linkedin != "" && (
          <li>
            <Image src={tLink} alt="tLink" />
          </li>
        )}

        {data?.twitter != "" && (
          <li>
            <Image src={tX} alt="tX" />
          </li>
        )}
        {data?.gmail != "" && (
          <li>
            <Image src={tEmail} alt="tEmail" />
          </li>
        )}
        {data?.link != "" && (
          <li>
            <Image src={tShare} alt="tShare" />
          </li>
        )}
      </ul>
    );
  };

  switch (type) {
    case "founder":
      return (
        <div className="team-card big">
          <div className="row align-items-center row-gap-25">
            <div className="col-lg-6 col-12">
              <div className="team-img">
                {data?.image && (
                  <Image
                    src={data?.image}
                    width={800}
                    height={800}
                    style={{ borderRadius: "18px", height: "auto" }}
                    alt="team"
                  />
                )}
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="team-con">
                <h3 className="team-title">{data?.name}</h3>
                <p className="desig">{data?.designation}</p>
                {renderSocialLinks(data)}

                <p
                  className="para"
                  dangerouslySetInnerHTML={{ __html: data?.description }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      );
    case "leader":
      return (
        <div className="team-card leader">
          <div className="row align-items-center row-gap-25">
            <div className="col-lg-6 col-12">
              <div className="team-img">
                {data?.image && (
                  <Image
                    src={data?.image}
                    width={800}
                    height={800}
                    alt="team"
                  />
                )}
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="team-con">
                <h3 className="team-title">{data?.name}</h3>
                <p className="desig">{data?.designation}</p>
                {renderSocialLinks(data)}
              </div>
            </div>
            <div className="col-12">
              <p
                className="para"
                dangerouslySetInnerHTML={{ __html: data?.description }}
              ></p>
            </div>
          </div>
        </div>
      );
    case "advisor":
      return (
        <div className="team-card leader advisor">
          <div className="row align-items-start row-gap-25">
            <div className="col-lg-5 col-12">
              <div className="team-img">
                {data?.image && (
                  <Image
                    src={data?.image}
                    width={800}
                    height={800}
                    alt="team"
                  />
                )}
              </div>
            </div>
            <div className="col-lg-7 col-12">
              <div className="team-con">
                <div className="tp-team">
                  <div className="t-left">
                    <h3 className="team-title">{data?.name}</h3>
                    <p className="desig">{data?.designation}</p>
                  </div>
                  <div className="t-right">{renderSocialLinks(data)}</div>
                </div>
                <p
                  className="para"
                  dangerouslySetInnerHTML={{ __html: data?.description }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      );
  }
  return <div></div>;
};

export default TeamCard;
