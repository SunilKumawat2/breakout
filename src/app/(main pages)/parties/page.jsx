"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import HomePageData from "@/data/HomePageData";
import HmTextSec from "@/components/home/HmTextSec";
import TrustedSection from "@/components/TrustedSection";
import LogoSec from "@/components/LogoSec";
import FaqSection from "@/components/FaqSection";
import OurLocationSec from "@/components/OurLocationSec";
import PartyGetInTouch from "@/components/PartyGetInTouch";

import MovieIllus from "@/images/moview-illus.svg";
import IllusHome from "@/images/illus-home.svg";
import IllusPartyBottom from "@/images/illus-party-bottom.svg";
import whArrow from "@/images/wh-arrow.svg";

import api from "@/app/helpers/api";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [data, setData] = useState(null);
  const [cards, setCards] = useState([]);
  const [collapse, setCollapse] = useState(null);
  const [animationRefreshKey, setAnimationRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const locationRef = useRef(null);
  const [locationReady, setLocationReady] = useState(false);
  console.log("dlsjdflkjsdflkjsf",locationReady)


  /* ========================= FETCH DATA ========================= */
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await api.get("/party-archive");
  //     setData(response?.data?.data);

  //     const birthdayList = await api.get("/birthday-listing");
  //     const birthdayListData = birthdayList?.data?.data;

  //     setCards([
  //       {
  //         title: "Birthdays",
  //         img: response?.data?.data?.bannersection?.birthdayimage || "",
  //         link: "",
  //         subItems: [
  //           { title: "Birthday", link: "/parties/birthday" },
  //           ...(birthdayListData?.length
  //             ? birthdayListData.map((bd) => ({
  //                 title: bd.title,
  //                 link: `/parties/birthday/${bd.slug}`,
  //               }))
  //             : []),
  //         ],
  //       },
  //       {
  //         title: "Bachelor(ette)",
  //         img: response?.data?.data?.bannersection?.bachelorimage || "",
  //         link: "",
  //         subItems: [
  //           { title: "Bachelor(ette)", link: "/parties/bachelor" },
  //           { title: "Bachelor", link: "/parties/bachelor" },
  //         ],
  //       },
  //       {
  //         title: "Farewell",
  //         img: response?.data?.data?.bannersection?.farewellimage || "",
  //         link: "",
  //         subItems: [
  //           { title: "Family Members", link: "/parties/farewell" },
  //           { title: "Classmates", link: "/parties/farewell" },
  //           { title: "Colleagues", link: "/parties/farewell" },
  //           { title: "Friends", link: "/parties/farewell" },
  //         ],
  //       },
  //     ]);
  //   };

  //   fetchData();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // start loader

        const [partyRes, birthdayRes] = await Promise.all([
          api.get("/party-archive"),
          api.get("/birthday-listing"),
        ]);

        const partyData = partyRes?.data?.data;
        const birthdayListData = birthdayRes?.data?.data;

        setData(partyData);

        setCards([
          {
            title: "Birthdays",
            img: partyData?.bannersection?.birthdayimage || "",
            link: "",
            subItems: [
              { title: "Birthday", link: "/parties/birthday" },
              ...(birthdayListData?.length
                ? birthdayListData.map((bd) => ({
                  title: bd.title,
                  link: `/parties/birthday/${bd.slug}`,
                }))
                : []),
            ],
          },
          {
            title: "Bachelor(ette)",
            img: partyData?.bannersection?.bachelorimage || "",
            link: "",
            subItems: [
              { title: "Bachelor(ette)", link: "/parties/bachelor" },
              { title: "Bachelor", link: "/parties/bachelor" },
            ],
          },
          {
            title: "Farewell",
            img: partyData?.bannersection?.farewellimage || "",
            link: "",
            subItems: [
              { title: "Family Members", link: "/parties/farewell" },
              { title: "Classmates", link: "/parties/farewell" },
              { title: "Colleagues", link: "/parties/farewell" },
              { title: "Friends", link: "/parties/farewell" },
            ],
          },
        ]);

      } catch (error) {
        console.error("Error fetching party data:", error);
      } finally {
        setLoading(false); // stop loader
      }
    };

    fetchData();
  }, []);


  /* ========================= RESTORE DROPDOWN STATE ========================= */
  useEffect(() => {
    const savedCollapse = sessionStorage.getItem("home_dropdown");
    if (savedCollapse) {
      setCollapse(savedCollapse); // <-- NO JSON.parse here
    } else {
      setCollapse(null);
    }
  }, []);

  /* ========================= RESTORE SCROLL POSITION ========================= */
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("home_scroll");
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll, 10));
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    }
  }, []);

  /* ========================= SAVE SCROLL POSITION ========================= */
  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem("home_scroll", window.scrollY.toString());
    };
    window.addEventListener("beforeunload", saveScroll);
    return () => window.removeEventListener("beforeunload", saveScroll);
  }, []);

  useEffect(() => {
    if (loading) return; // ⛔ wait until page content renders
  
    const element = locationRef.current;
    if (!element) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
  
        if (entry.isIntersecting) {
          console.log("LOCATION SECTION VISIBLE ✅");
          setLocationReady(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );
  
    observer.observe(element);
  
    return () => observer.disconnect();
  }, [loading]); // 👈 depend only on loading
  


  /* ========================= ANIMATION VARIANTS ========================= */
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

  /* ========================= DROPDOWN HANDLER ========================= */
  const handleDropdownToggle = (cardTitle) => {
    setCollapse((prev) => {
      const newState = prev === cardTitle ? null : cardTitle;
      if (newState) {
        sessionStorage.setItem("home_dropdown", newState);
      } else {
        sessionStorage.removeItem("home_dropdown");
      }
      return newState;
    });
    setAnimationRefreshKey((prev) => prev + 1);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);
  };


  return (
    <>
      {
        loading ? (
          <div id="preloader">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {/* ================= HEADER SECTION ================= */}
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
                        // variants={fadeInUp}
                        >
                          <div className="hm-card">
                            <div className="hm-card-img">
                              {card?.img && (
                                <Image
                                  src={card.img}
                                  width={500}
                                  height={500}
                                  alt={card.title}
                                />
                              )}
                            </div>

                            <div className="details">
                              {card?.link ? (
                                <Link
                                  href={card.link}
                                  className="main-btn wide"
                                  scroll={false}
                                >
                                  <span>{card.title}</span>
                                </Link>
                              ) : (
                                <h3
                                  className="sec-head h3 des2"
                                  onClick={() => handleDropdownToggle(card.title)}
                                >
                                  {card.title}
                                </h3>
                              )}

                              <ul className={collapse ? "active des2" : "des2"}>
                                {card?.subItems?.map((link, index) => (
                                  <li key={index}>
                                    <Link href={link.link} scroll={false} >
                                      <span>{link.title}</span>
                                      <Image src={whArrow} alt={link.title} />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </header>
              )}

              {/* ================= TEXT SECTION ================= */}
              {data?.bannersection?.content && (
                <HmTextSec
                  home={true}
                  text={data?.bannersection?.content}
                  refreshKey={animationRefreshKey}
                />
              )}

              <Image src={MovieIllus} className="illus-image" alt="illus-home" />
            </div>

            {/* ================= MIDDLE SECTION ================= */}
            <div className="black-gr-div">
              {data?.countersection && <TrustedSection className="sec-padding-top pb-0" data={data?.countersection} />}
              <LogoSec className="pb-0 pt-80" />
              <Image
                src={IllusHome}
                className="illus-image"
                style={{ marginBottom: "-1px" }}
                alt="illus-home"
              />
            </div>

            {/* ================= FOOTER SECTION ================= */}
            <div className="black-gr-div">

              {/* LOCATION WRAPPER */}
              <div
                ref={locationRef}
                style={{ minHeight: "400px" }}  // 👈 important
              >
                {locationReady && (
                  <OurLocationSec
                    className="sec-padding-top"
                    title="Choose a <span>Location</span>"
                  />
                )}
              </div>

              {data?.faqsection && (
                <FaqSection
                  className="section-padding pb-0"
                  data={data?.faqsection}
                />
              )}

              {data?.footersection && (
                <PartyGetInTouch
                  data={data?.footersection}
                  img={IllusPartyBottom}
                />
              )}
            </div>

          </>
        )
      }

    </>
  );
}
