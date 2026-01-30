"use client";
import React from "react";
import Image from "next/image";
import BigVideoPlayer from "@/components/BigVideoPlayer";
import hmIllus from "@/images/bottom-illus.svg";
import illus2 from "@/images/contact-bottom-illus.svg";
import illus3 from "@/images/illus3.svg";
import ReserveASlot from "@/components/ReserveASlot";
import FaqSection from "@/components/FaqSection";
import EscapeRoomCard from "@/components/EscapeRoomCard";
import loc1 from "@/images/koramangala.jpg";
import loc2 from "@/images/jp-nagar.jpg";
import loc3 from "@/images/whitefield.jpg";
import LocationCard from "@/components/LocationCard";
import HomeContact from "@/components/home/HomeContact";
import VisitLocations from "@/components/VisitLocations";
import { CommonModal } from "@/components/CommonModal";
import GlobalReviewWidget from "@/components/GlobalReviewWidget";
import api from "@/app/helpers/api";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Banner from "@/components/activities/Banner";
import activityIllus from "@/images/activity-illus.svg";
import PartyExpertCon from "@/components/PartyExpertCon";
import activity2Illus from "@/images/activity2-illus.svg";
import activity3Illus from "@/images/activity3-illus.svg";
import ConnectContact from "@/components/ConnectContact";

const ActivityPage = () => {
  const { id } = useParams();
  const [escapeRooms, setEscapeRooms] = useState(null);

  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchEscapeRooms = async () => {
      const res = await api.get(`/escaperooms`);
      setEscapeRooms(res.data.data);
    };
    fetchEscapeRooms();

    const fetchEscapeRoom = async () => {
      const res = await api.get(`/activity/${id}`);
      setRoom(res.data.data);
      console.log("sadfmshdmfndhsjkfsdf_bhf",res.data.data)
    };
    fetchEscapeRoom();
  }, [id]);

  const locations = [
    {
      name: "Koramangala",
      image: loc1,
    },
    {
      name: "JP Nagar",
      image: loc2,
    },
    {
      name: "Whitefield",
      image: loc3,
    },
  ];

  useEffect(() => {
    const shouldScroll = sessionStorage.getItem("scrollToEscapeRooms");

    if (shouldScroll === "true" && escapeRooms?.length > 0) {
      // wait for DOM paint
      setTimeout(() => {
        const section = document.getElementById("escape-rooms-section");

        if (section) {
          section.scrollIntoView({
            behavior: "auto", // use "smooth" if you want animation
            block: "start",
          });
        }

        // remove key so it doesn't auto-scroll again
        sessionStorage.removeItem("scrollToEscapeRooms");
      }, 500);
    }
  }, [escapeRooms]);
  return (
    <>
      <div className="black-gr-div">
        {room?.bannersection && <Banner room={room} />}
        {room?.bannersection?.video_trailer != "" && (
          <section className="section-padding pb-0">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-12">
                  <BigVideoPlayer
                    room={room}
                    video={room?.bannersection?.video_trailer}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
        <Image src={activityIllus} className="illus-image" alt="hm-text-bg" />
      </div>
      <div className="black-gr-div">
        {room?.contentsection?.heading && (
          <section className="sec-padding-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-12">
                  <h2 className="sec-head sm-head yellow medium">
                    <span>{room?.contentsection?.heading}</span>
                  </h2>
                  <p
                    className="para"
                    dangerouslySetInnerHTML={{
                      __html: room?.contentsection?.content || "",
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </section>
        )}
        <PartyExpertCon className="pt-80" data="views_activities"/>
        {/* <ReserveASlot room={room?.pricingsection} /> */}
        
        {room?.imagesection && (
          <GlobalReviewWidget className="section-padding pb-0"
            data={room?.imagesection}
            reviews={room?.googlereviews}
          />
        )}
        {room?.faqsection && <FaqSection className="section-padding pb-0" data={room?.faqsection} />}
        <Image src={activity2Illus} className="illus-image" alt="illus3" />
      </div>
      {/* <FaqSection /> */}
      <div className="black-gr-div">
        <section className="section-padding esc-section pb-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center col-12">
                <h2 className="sec-head sm-head medium">
                  Other <span>Experiences</span>
                </h2>
              </div>
            </div>
            <div className="row row-gap-25" id="escape-rooms-section">
              {escapeRooms &&
                escapeRooms.map((room, index) => (
                  <div className="col-lg-4 col-12" onClick={()=>sessionStorage.setItem("scrollToEscapeRooms",true)} key={index}>
                    <EscapeRoomCard room={room} />
                  </div>
                ))}
            </div>
          </div>
        </section>
        <VisitLocations className="section-padding pb-0" isVirtual={false} />
        {/* <PartyExpertCon /> */}
        {/* <PartyEpertForActivity
          title={"<span>Running Out of Time?</span> Talk to a Party Expert Now"}
        /> */}
          <ConnectContact
          noTextBottom={false}
          privacyLine={true}
          noImage={true}
        />
        <Image src={activity3Illus} className="w-100 h-auto" alt="illus3" />
      </div>
    </>
  );
};

export default ActivityPage;
