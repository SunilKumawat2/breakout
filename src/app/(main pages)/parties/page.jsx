// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { TextAnimation } from "@/components/animation/TextAnimation";
// import Header from "@/components/Header";
// import HomePageData from "@/data/HomePageData";
// import LogoSec from "@/components/LogoSec";
// import HmTextSec from "@/components/home/HmTextSec";
// import arrowRight from "@/images/arrow-right-yellow.svg";
// import HomeContact from "@/components/home/HomeContact";
// import Footer from "@/components/Footer";
// import { motion } from "framer-motion";
// import { Tilt } from "react-tilt";
// import Revolvingtext from "@/components/Revolvingtext";
// import whArrow from "@/images/wh-arrow.svg";
// import TrustedSection from "@/components/TrustedSection";
// import IllusHome from "@/images/illus-home.svg";
// import FaqSection from "@/components/FaqSection";
// import starIcon from "@/images/star-icon.svg";
// import PartyIcon from "@/images/party-icon.svg";
// import handshake from "@/images/handshake.svg";
// import VisitLocations from "@/components/VisitLocations";

// import card1 from "@/images/es-main-img.jpg";
// import card2 from "@/images/pr-main-img.jpg";
// import card3 from "@/images/cr-main-img.jpg";

// import MovieIllus from "@/images/moview-illus.svg";
// import OurLocationSec from "@/components/OurLocationSec";
// import api from "@/app/helpers/api";

// import IllusPartyBottom from "@/images/illus-party-bottom.svg";

// import { useEffect, useState } from "react";
// import BirthdayGetInTouch from "@/components/BirthdayGetInTouch";
// import PartyGetInTouch from "@/components/PartyGetInTouch";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function Home() {
//   //   const cards = HomePageData.cards;
//   const lookingFor = HomePageData.lookingFor;
//   const scoreCard = HomePageData.scoreCard;

//   const [data, setData] = useState(null);
//   const [cards, setCards] = useState([]);
//   const [collapse, setCollapse] = useState(false);
//   const [animationRefreshKey, setAnimationRefreshKey] = useState(0);
//   // const [collapse, setCollapse] = useState("desktop");

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await api.get("/party-archive");
//       setData(response?.data?.data);
//       const birthdayList = await api.get("/birthday-listing");
//       const birthdayListData = birthdayList?.data?.data;
//       setCards([
//         {
//           title: "Birthdays",
//           img: response?.data?.data?.bannersection?.birthdayimage || "",
//           link: "",
//           subItems: [
//             {
//               title: "Birthday",
//               link: "/parties/birthday",
//             },
//             ...(birthdayListData?.map?.length > 0 &&
//               birthdayListData.map((bd) => ({
//                 title: bd.title,
//                 link: `/parties/birthday/${bd.slug}`,
//               }))),
//           ],
//         },
//         {
//           title: "Bachelor(ette)",
//           img: response?.data?.data?.bannersection?.bachelorimage || "",
//           link: "",
//           subItems: [
//             {
//               title: "Bachelor(ette)",
//               link: "/parties/bachelor",
//             },
//             {
//               title: "Bachelor",
//               link: "/parties/bachelor",
//             },
//           ],
//         },
//         {
//           title: "Farewell",
//           img: response?.data?.data?.bannersection?.farewellimage || "",
//           link: "",
//           subItems: [
//             {
//               title: "Family Members",
//               link: "/parties/farewell",
//             },
//             {
//               title: "Classmates",
//               link: "/parties/farewell",
//             },
//             {
//               title: "Colleagues",
//               link: "/parties/farewell",
//             },
//             {
//               title: "Friends",
//               link: "/parties/farewell",
//             },
//           ],
//         },
//       ]);
//     };
//     fetchData();
//   }, []);

//   const fadeInUp = {
//     initial: { opacity: 0, y: 60 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 1.2, ease: "easeOut" },
//   };

//   const staggerContainer = {
//     animate: {
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const TiltCard = ({ children }) => {
//     const defaultOptions = {
//       reverse: false,
//       max: 17.5,
//       perspective: 1000,
//       scale: 1,
//       speed: 1000,
//       transition: true,
//       axis: null,
//       reset: true,
//       easing: "cubic-bezier(.03,.98,.52,.99)",
//       glare: true,
//       maxGlare: 0.5,
//     };

//     return <Tilt options={defaultOptions}>{children}</Tilt>;
//   };

//   const trustedData = [
//     {
//       title: " Joyful reviews",
//       icon: starIcon,
//       number: "10.5k +",
//     },
//     {
//       title: "Parties Hosted",
//       icon: PartyIcon,
//       number: "1657 +",
//     },
//     {
//       title: "Companies Served",
//       icon: handshake,
//       number: "850 +",
//     },
//   ];

//   const hmText =
//     "At Breakout®, every <span>moment is a celebration!</span> Walk the red carpet, crack mysteries, and take on the Showstopper’s Challenge. Celebrate <span>loved ones,</span> surprise your <span>partner</span>, and <span>toast to friendship.</span> Make every occasion legendary with an unforgettable bash!";

//   const handleCollapse = (key) => {
//     // if (typeof window !== "undefined") {
//     setCollapse((prev) => (prev === key ? "desktop" : key));
//     // }
//   };

//   const handleDropdownToggle = () => {
//     setCollapse(prev => !prev);

//     // Animation refresh trigger
//     setAnimationRefreshKey(prev => prev + 1);

//     // ScrollTrigger ko manually refresh karein
//     setTimeout(() => {
//       if (typeof ScrollTrigger !== 'undefined') {
//         ScrollTrigger.refresh();

//         // Saare active triggers ko update karein
//         ScrollTrigger.getAll().forEach(trigger => {
//           if (trigger.animation) {
//             trigger.animation.progress(trigger.progress);
//           }
//         });
//       }
//     }, 350); // Dropdown animation complete hone ke baad
//   };

//   return (
//     <>
//       <div className="black-gr-div">
//         {data?.bannersection && (
//           <header className="hm-header section-padding">
//             <div className="container">
//               <motion.div
//                 className="row"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
//               >
//                 <div className="col-lg-12 col-12 text-center">
//                   {/* <Revolvingtext text="Set Your" /> */}
//                   <h1
//                     className="sec-head text-center"
//                     dangerouslySetInnerHTML={{
//                       __html: data?.bannersection?.heading,
//                     }}
//                   />
//                   <p
//                     className="para big"
//                     dangerouslySetInnerHTML={{
//                       __html: data?.bannersection?.description,
//                     }}
//                   />
//                 </div>
//               </motion.div>
//               <motion.div
//                 className="row row-gap-25 mt-4"
//                 variants={staggerContainer}
//                 initial="initial"
//                 animate="animate"
//               >
//                 {cards.map((card, index) => (
//                   <motion.div
//                     className="col-lg-4 col-12"
//                     key={index}
//                     variants={fadeInUp}
//                   >
//                     {/* <TiltCard> */}
//                     <div className="hm-card">
//                       <div className="hm-card-img">
//                         {card?.img && card?.img !== "" && (
//                           <Image
//                             src={card?.img}
//                             width={500}
//                             height={500}
//                             alt={card.title}
//                           />
//                         )}
//                       </div>

//                       <div className="details">
//                         {card?.link && card?.link !== "" ? (
//                           <Link href={card.link} className="main-btn wide">
//                             <span>{card.title}</span>
//                           </Link>
//                         ) : (
//                           <h3
//                             className="sec-head h3 des2"
//                             // onClick={() => setCollapse((prev) => !prev)}
//                             onClick={handleDropdownToggle}

//                           // onClick={() => handleCollapse(card.title)}
//                           >
//                             {card.title}
//                           </h3>
//                         )}
//                         <ul className={collapse ? "active des2" : "des2"}>
//                           {card?.subItems &&
//                             card?.subItems?.map((link, index) => (
//                               <li key={index}>
//                                 <Link href={`${link.link}`}>
//                                   <span>{link.title}</span>
//                                   <Image src={whArrow} alt={link.title} />
//                                 </Link>
//                               </li>
//                             ))}
//                         </ul>
//                       </div>

//                       {/* <Link href={card.link} className="main-btn wide">
//                         <span>{card.title}</span>
//                       </Link> */}
//                     </div>
//                     {/* </TiltCard> */}
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>
//           </header>
//         )}
//         {/* {data?.bannersection?.content && (
//           <HmTextSec home={true} text={data?.bannersection?.content} />
//         )} */}
//         {data?.bannersection?.content && (
//           <HmTextSec
//             home={true}
//             text={data?.bannersection?.content}
//             refreshKey={animationRefreshKey}
//           />
//         )}

//         {/* {data?.bannersection?.note && (
//           <div className="container pb-5">
//             <div className="row justify-content-center">
//               <div className="col-lg-11 col-12">
//                 <div className="cus-card mt-5 py-3 px-3">
//                   <p
//                     className="para mb-0"
//                     style={{ fontStyle: "italic", cursor: "pointer" }}
//                   >
//                     <span>{data?.bannersection?.note}</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )} */}

//         <Image src={MovieIllus} className="w-100 h-auto " alt="illus-home" />
//       </div>
//       <div className="black-gr-div">
//         {data?.countersection && <TrustedSection data={data?.countersection} />}
//         <LogoSec className="pb-0" />
//         <Image
//           src={IllusHome}
//           className="w-100 h-auto "
//           style={{ marginBottom: "-1px" }}
//           alt="illus-home"
//         />
//       </div>
//       <div className="black-gr-div">
//         <OurLocationSec title="Choose a <span>Location</span>" />
//         {data?.faqsection && <FaqSection data={data?.faqsection} />}
//         {/*{data?.footersection && (
//           <HomeContact textData={data?.footersection} img={IllusPartyBottom} />
//         )} */}
//         {data?.footersection && (
//           <PartyGetInTouch data={data?.footersection} img={IllusPartyBottom} />
//         )}
//       </div>
//     </>
//   );
// }


"use client";
import Image from "next/image";
import Link from "next/link";
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
  const lookingFor = HomePageData.lookingFor;
  const scoreCard = HomePageData.scoreCard;

  const [data, setData] = useState(null);
  const [cards, setCards] = useState([]);
  const [collapse, setCollapse] = useState(null);
  const [animationRefreshKey, setAnimationRefreshKey] = useState(0);

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/party-archive");
      setData(response?.data?.data);

      const birthdayList = await api.get("/birthday-listing");
      const birthdayListData = birthdayList?.data?.data;

      setCards([
        {
          title: "Birthdays",
          img: response?.data?.data?.bannersection?.birthdayimage || "",
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
          img: response?.data?.data?.bannersection?.bachelorimage || "",
          link: "",
          subItems: [
            { title: "Bachelor(ette)", link: "/parties/bachelor" },
            { title: "Bachelor", link: "/parties/bachelor" },
          ],
        },
        {
          title: "Farewell",
          img: response?.data?.data?.bannersection?.farewellimage || "",
          link: "",
          subItems: [
            { title: "Family Members", link: "/parties/farewell" },
            { title: "Classmates", link: "/parties/farewell" },
            { title: "Colleagues", link: "/parties/farewell" },
            { title: "Friends", link: "/parties/farewell" },
          ],
        },
      ]);
    };

    fetchData();
  }, []);

/* =========================
   RESTORE DROPDOWN STATE
========================= */
useEffect(() => {
  const savedCollapse = sessionStorage.getItem("home_dropdown");

  if (savedCollapse) {
    setCollapse(savedCollapse); // <-- NO JSON.parse here
  } else {
    setCollapse(null);
  }
}, []);

 /* =========================
   RESTORE SCROLL POSITION
========================= */
useEffect(() => {
  const savedScroll = sessionStorage.getItem("home_scroll");
  if (savedScroll) {
    window.scrollTo(0, parseInt(savedScroll, 10));

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  }
}, []);

  /* =========================
     SAVE SCROLL POSITION
  ========================= */
  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem("home_scroll", window.scrollY.toString());
    };
    window.addEventListener("beforeunload", saveScroll);
    return () => window.removeEventListener("beforeunload", saveScroll);
  }, []);

  /* =========================
     ANIMATION VARIANTS
  ========================= */
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

  /* =========================
     DROPDOWN HANDLER
  ========================= */
  const handleDropdownToggle = (cardTitle) => {
    setCollapse((prev) => {
      const newState = prev === cardTitle ? null : cardTitle;
  
      // Store as string (not JSON)
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
  

/* =========================
   WHEN CLICKING LI SUB-ITEM
========================= */
const handleSubItemClick = (cardTitle) => {
  // Store only this section as active
  sessionStorage.setItem("home_dropdown", cardTitle);
};


  return (
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
                    variants={fadeInUp}
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
                            onClick={()=>handleDropdownToggle(card.title)}
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
        <OurLocationSec className="sec-padding-top" title="Choose a <span>Location</span>" />
        {data?.faqsection && <FaqSection className="section-padding pb-0" data={data?.faqsection} />}
        {data?.footersection && (
          <PartyGetInTouch data={data?.footersection} img={IllusPartyBottom} />
        )}
      </div>
    </>
  );
}
