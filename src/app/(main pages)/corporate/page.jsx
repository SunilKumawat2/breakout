"use client";
import Image from "next/image";
import Link from "next/link";
import { TextAnimation } from "@/components/animation/TextAnimation";
import Header from "@/components/Header";
import HomePageData from "@/data/HomePageData";
import LogoSec from "@/components/LogoSec";
import HmTextSec from "@/components/home/HmTextSec";
import arrowRight from "@/images/arrow-right-yellow.svg";
import HomeContact from "@/components/home/HomeContact";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import Revolvingtext from "@/components/Revolvingtext";
import whArrow from "@/images/wh-arrow.svg";
import TrustedSection from "@/components/TrustedSection";
import IllusHome from "@/images/illus-home.svg";
import FaqSection from "@/components/FaqSection";
import starIcon from "@/images/star-icon.svg";
import PartyIcon from "@/images/party-icon.svg";
import handshake from "@/images/handshake.svg";
import VisitLocations from "@/components/VisitLocations";

import card1 from "@/images/es-main-img.jpg";
import card2 from "@/images/pr-main-img.jpg";
import card3 from "@/images/cr-main-img.jpg";

import MovieIllus from "@/images/moview-illus.svg";
import OurLocationSec from "@/components/OurLocationSec";
import api from "@/app/helpers/api";

import { useEffect, useState } from "react";
import illus4 from "@/images/illus-party-bottom.svg";
import BirthdayGetInTouch from "@/components/BirthdayGetInTouch";

export default function Home() {
  //   const cards = HomePageData.cards;
  const lookingFor = HomePageData.lookingFor;
  const scoreCard = HomePageData.scoreCard;

  const [data, setData] = useState(null);
  console.log("Home_Home_Home_corporate", data)
  const [cards, setCards] = useState([]);
  const [brandLogos, setBrandLogos] = useState(null);
  console.log("brandLogos",brandLogos)

  const lookingForOptions = [
    { value: "Koramangala", label: "Koramangala" },
    { value: "J P Nagar", label: "J P Nagar" },
    { value: "Whitefield", label: "Whitefield" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/corporate-archive");
      console.log("sd,fsdhfkjsdhfhsdf_data",response)
      setData(response?.data?.data);
      console.log("sjdfkhsdkfhsdhfk", response?.data?.data)
      setCards([
        {
          title: "Unwind",
          img: response?.data?.data?.bannersection?.unwindimage || "",
          link: "/corporate/unwind",
        },
        {
          title: "Retreats",
          img: response?.data?.data?.bannersection?.retreatsimage || "",
          link: "/corporate/retreat",
        },
        {
          title: "Connect",
          img: response?.data?.data?.bannersection?.connectimage || "",
          link: "/corporate/connect-l-n-d",
        },
      ]);
    };
    fetchData();
    const fetchBrandLogos = async () => {
      const response = await api.get("logos/brands");
      setBrandLogos(response.data.data);
    };
    fetchBrandLogos();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const TiltCard = ({ children }) => {
    const defaultOptions = {
      reverse: false,
      max: 17.5,
      perspective: 1000,
      scale: 1,
      speed: 1000,
      transition: true,
      axis: null,
      reset: true,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      glare: true,
      maxGlare: 0.5,
    };

    return <Tilt options={defaultOptions}>{children}</Tilt>;
  };

  const trustedData = [
    {
      title: " Joyful reviews",
      icon: starIcon,
      number: "10.5k +",
    },
    {
      title: "Parties Hosted",
      icon: PartyIcon,
      number: "1657 +",
    },
    {
      title: "Companies Served",
      icon: handshake,
      number: "850 +",
    },
  ];

  const hmText =
    "At Breakout®, every <span>moment is a celebration!</span> Walk the red carpet, crack mysteries, and take on the Showstopper’s Challenge. Celebrate <span>loved ones,</span> surprise your <span>partner</span>, and <span>toast to friendship.</span> Make every occasion legendary with an unforgettable bash!";

  return (
    <>
      <div className="black-gr-div">
        {data?.bannersection && (
          <header className="hm-header section-padding">
            <div className="container">
              <motion.div
                className="row"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              >
                <div className="col-lg-12 col-12 text-center">
                  {/* <Revolvingtext text="Set Your" /> */}
                  <h1
                    className="sec-head text-center"
                    dangerouslySetInnerHTML={{
                      __html: data?.bannersection?.heading,
                    }}
                  />
                  <p
                    className="para big mb-40"
                    dangerouslySetInnerHTML={{
                      __html: data?.bannersection?.description,
                    }}
                  />
                </div>
              </motion.div>
              <motion.div
                className="row row-gap-25"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {cards.map((card, index) => (
                  <motion.div
                    className="col-lg-4 col-12"
                    key={index}
                    variants={fadeInUp}
                  >
                    {/* <TiltCard> */}
                    <div className="hm-card">
                      <div className="hm-card-img">
                        {card?.img && card?.img !== "" && (
                          <Image
                            src={card?.img}
                            width={500}
                            height={500}
                            alt={card.title}
                          />
                        )}
                      </div>

                      <Link href={card.link} className="main-btn wide">
                        <span>{card.title}</span>
                      </Link>
                    </div>
                    {/* </TiltCard> */}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </header>
        )}
        {data?.bannersection?.content && (
          <HmTextSec home={true} text={data?.bannersection?.content} />
        )}
        {/* {data?.bannersection?.note && (
          <div className="container pb-5">
            <div className="row justify-content-center">
              <div className="col-lg-12 col-12">
                <div className="cus-card">
                  <p
                    className="para mb-0"
                    style={{ fontStyle: "italic", cursor: "pointer" }}
                  >
                    <span>{data?.bannersection?.note}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )} */}
        {data?.bannersection?.note && (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12 col-12">
                <div className="cus-card">
                  <p
                    className="para mb-0"
                    style={{ fontStyle: "italic" }}
                    dangerouslySetInnerHTML={{
                      __html: data?.bannersection?.note.replace(
                        /<a /g,
                        '<a target="_blank" rel="noopener noreferrer" '
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <Image src={MovieIllus} className="illus-image" alt="illus-home" />
      </div>
      <div className="black-gr-div">
        {data?.countersection && <TrustedSection className="sec-padding-top pb-0" data={data?.countersection} />}
        <LogoSec className="pt-80 pb-0"
          // title={"<span>Brands</span> Hosted"}
          title={"<span>Brands</span> Hosted"}
          logo={brandLogos}
          link={false}
        />
        <Image
          src={IllusHome}
          className="illus-image"
          style={{ marginBottom: "-1px" }}
          alt="illus-home"
        />
      </div>
      <div className="black-gr-div">
        <OurLocationSec className="sec-padding-top" title="Choose a <span>Location</span>" />
        {data?.faqsection && <FaqSection className="section-padding pb-0" 
        data={data?.faqsection} />}
         <LogoSec className="pt-80 pb-0"
          // title={"<span>Brands</span> Hosted"}
          title={"<span>In the</span> News"}
          logo={data?.brandLogo}
          link={false}
        />
        {data?.footersection && (
          <BirthdayGetInTouch
          className="p"
            img={illus4}
            textData={data?.footersection}
            noTextBottom={true}
            atOptions={lookingForOptions}
            privacyLine={true}
          />
        )}
       
        {/* {data?.footersection && <HomeContact textData={data?.footersection} />} */}
      </div>
    </>
  );
}
