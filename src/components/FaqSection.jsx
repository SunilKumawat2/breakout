// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { Accordion } from "react-bootstrap";
// import arrow from "@/images/acc-plus.svg";
// import minus from "@/images/acc-minus.svg";
// import faqStar from "@/images/faq-star.svg";

// const FaqSection = ({ data, openIndex }) => {
//   const faqRef = useRef(null);
//   const dummyFaqItems = [
//     {
//       eventKey: "0",
//       question: "1. Do you have age-appropriate experiences?",
//       answer:
//         "Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo",
//     },
//     {
//       eventKey: "1",
//       question: "2. What's the total capacity for a party?",
//       answer:
//         "Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo",
//     },
//     {
//       eventKey: "2",
//       question: "3. Can we customize the party?",
//       answer:
//         "Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo",
//     },
//     {
//       eventKey: "3",
//       question: "4. Do you accommodate mixed groups?",
//       answer:
//         "Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo",
//     },
//   ];

//   const faqItems =
//     data?.length > 0
//       ? data.map((item, index) => ({
//         eventKey: index.toString(),
//         question: `${item.question}`,
//         // question: `${index + 1}. ${item.question}`,
//         answer: item.answer,
//       }))
//       : dummyFaqItems;

//   const [activeKey, setActiveKey] = useState(null);
//   const [showAll, setShowAll] = useState(false);

//   /* =========================
//      WHEN TRIGGER COMES FROM ReserveASlot
//   ========================= */
//   useEffect(() => {
//     if (openIndex !== null && faqItems[openIndex]) {
//       setShowAll(true); // Ensure all FAQs visible
//       setActiveKey(openIndex.toString());

//       // Scroll to FAQ section
//       setTimeout(() => {
//         faqRef.current?.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       }, 300);
//     }
//   }, [openIndex, faqItems]);

//   const shouldShowReadMore = faqItems.length > 4;
//   const visibleFaqs =
//     shouldShowReadMore && !showAll ? faqItems.slice(0, 4) : faqItems;

//   const handleToggleShowAll = () => {
//     setShowAll((prev) => !prev);
//   };

//   return (
//     <section className="section-padding faq-sec">
//       <Image src={faqStar} alt="faq-bg" className="faq-star" />
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-12 col-12">
//             <div className="esc-content text-center">
//               <h2 className="sec-head sm-head medium">
//                 FAQs for <span>Your Adventure</span>
//               </h2>
//             </div>
//           </div>
//         </div>
//         <div className="row justify-content-center">
//           <div className="col-lg-12 col-12 mt-4">
//             <Accordion className="acc" activeKey={activeKey}
//               onSelect={(key) => setActiveKey(key)}>
//               {visibleFaqs?.map((item, index) => (
//                 <Accordion.Item key={item.eventKey} eventKey={item.eventKey}>
//                   <Accordion.Header>
//                     <span>{item?.question}</span>
//                     <Image src={arrow} className="acc-arrow" alt="arrow" />
//                     <Image src={minus} className="acc-minus" alt="arrow" />
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     <div
//                       dangerouslySetInnerHTML={{ __html: item.answer }}
//                     ></div>
//                   </Accordion.Body>
//                 </Accordion.Item>
//               ))}
//             </Accordion>
//             {shouldShowReadMore && (
//               <button
//                 className="main-btn dark-btn mt-4"
//                 onClick={handleToggleShowAll}
//               >
//                 <span>{showAll ? "Read less" : "Read more"}</span>
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FaqSection;

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Accordion } from "react-bootstrap";
import arrow from "@/images/acc-plus.svg";
import minus from "@/images/acc-minus.svg";
import faqStar from "@/images/faq-star.svg";

const FaqSection = ({ data, openIndex,onFaqChange,className = ""  }) => {
  const faqRef = useRef(null);
  const [activeKey, setActiveKey] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const dummyFaqItems = [ /* ...same as before... */];

  const faqItems =
    data?.length > 0
      ? data.map((item, index) => ({
        eventKey: index.toString(),
        question: `${item.question}`,
        answer: item.answer,
      }))
      : dummyFaqItems;



  /* =========================
     WHEN TRIGGER COMES FROM ReserveASlot
  ========================= */
  useEffect(() => {
    if (openIndex !== null && faqItems[openIndex]) {
      setShowAll(true); // Ensure all FAQs visible
      setActiveKey(openIndex.toString());

      // Scroll to FAQ section
      setTimeout(() => {
        faqRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, [openIndex, faqItems]);

  const shouldShowReadMore = faqItems.length > 4;
  const visibleFaqs =
    shouldShowReadMore && !showAll ? faqItems.slice(0, 4) : faqItems;



  return (
    <section ref={faqRef} className={`faq-sec ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="esc-content text-center position-relative">
      <Image src={faqStar} alt="faq-bg" className="faq-star" />
              <h2 className="sec-head sm-head medium">
                FAQs for <span>Your Adventure</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
  <div className="col-lg-12 col-12">
    <Accordion
      className="acc"
      activeKey={activeKey}
      onSelect={(key) => {
        console.log("Clicked key:", key);
        setActiveKey((prevKey) => (prevKey === key ? null : key));
        if (onFaqChange) {
          onFaqChange(key !== null ? Number(key) : null);
        }
      }}
    >
      {visibleFaqs.map((item, index) => {
        const key = index.toString();   // 👈 IMPORTANT

        return (
          <Accordion.Item key={key} eventKey={key}>
            <Accordion.Header>
              <span>{item?.question}</span>
              <Image src={arrow} className="acc-arrow" alt="arrow" />
              <Image src={minus} className="acc-minus" alt="arrow" />
            </Accordion.Header>

            <Accordion.Body>
              <div
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>

    {shouldShowReadMore && (
      <button
        className="main-btn dark-btn mt-4"
        onClick={() => setShowAll((prev) => !prev)}
      >
        <span>{showAll ? "Read less" : "Read more"}</span>
      </button>
    )}
  </div>
</div>


      </div>
    </section>
  );
};

export default FaqSection;

