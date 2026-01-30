// "use client";
// import React, { useState } from "react";
// import whicon from "@/images/wh-icon.svg";
// import phicon from "@/images/phone.svg";
// import mailicon from "@/images/mail-icon.svg";
// import Link from "next/link";
// import Image from "next/image";
// import { InlineWidget } from "react-calendly";


// const PartyExpertCon = ({ title, className = "" }) => {
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);

//   return (
//     <section className={`hm-contact-sec section-padding pb-0 ${className}`}>
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-12 text-center">
//             <h2
//               className="sec-head medium"
//               dangerouslySetInnerHTML={{
//                 __html: title || "Running<span> Out of Time? </span>",
//               }}
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="hm-con-form-card">
//               <div className="row align-items-center justify-content-between">
//                 <div className="col-lg-5 col-12">
//                   <h3 className="sec-head medium">
//                     Talk with <span>an Expert</span>
//                   </h3>
//                   <p className="para">
//                     Let us plan the perfect party for you. Contact us for
//                     details.
//                   </p>
//                 </div>
//                 <div className="col-lg-6 col-12">
//                   {/* <div className="hm-con-form-card-head">


//                   </div> */}
//                   <div className="hm-con-form-card-head">
//                     <ul className="hm-con-form-card-list">
//                       <li>
//                         <Link
//                           href="https://wa.me/919742386781"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           <Image src={whicon} alt="hmimg5" />
//                         </Link>
//                       </li>
//                       <li>
//                         <Link href="tel:+919742386781">
//                           <Image src={phicon} alt="hmimg5" />
//                         </Link>
//                       </li>
//                       <li>
//                         <Link href="tel:+919742386781">
//                           <span>+91 9742386781</span>
//                         </Link>
//                       </li>
//                     </ul>

//                     <ul className="hm-con-form-card-list">
//                       <li>
//                         <Link href="mailto:info@breakout.in">
//                           <Image src={mailicon} alt="hmimg5" />
//                         </Link>
//                       </li>
//                       <li>
//                         <Link href="mailto:info@breakout.in">
//                           <span>info@breakout.in</span>
//                         </Link>
//                       </li>
//                     </ul>
//                   </div>
//                   <div className="btn-wrap d-flex gap-4 mt-4 align-items-center justify-content-center">
//                     <Link href="tel:+919876543210" className="main-btn wide">
//                       <span>Call Now</span>
//                     </Link>
//                     {/* <Link
//                       href="https://www.facebook.com/EscapeRoom.co.uk"
//                       className="main-btn wide dark-btn yellow-text white-border"
//                       target="_blank"
//                     >
//                       <span>Book a call</span>
//                     </Link> */}
//                     <button
//                       className="main-btn wide dark-btn yellow-text white-border"
//                       onClick={() => setShowCalendar(true)}
//                     >
//                       <span> Book a call</span>
//                     </button>

//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {showCalendar && (
//         <div className="calendar-overlay">
//           <div className="calendar-modal">
//             <button
//               className="close-btn"
//               onClick={() => setShowCalendar(false)}
//             >
//               ✕
//             </button>

//             <InlineWidget
//               url="https://calendly.com/YOUR-LINK"
//               styles={{ height: "600px" }}
//             />
//           </div>
//         </div>
//       )}


//     </section>
//   );
// };

// export default PartyExpertCon;
"use client";
import React from "react";
import whicon from "@/images/wh-icon.svg";
import phicon from "@/images/phone.svg";
import mailicon from "@/images/mail-icon.svg";
import Link from "next/link";
import Image from "next/image";

const PartyExpertCon = ({ title, className = "", data = "", serviceType = "corporate" }) => {
  console.log("PartyExpertCon_data", data);

  // Map of services to Calendly URLs
  const calendlyLinks = {
    corporate: "https://calendly.com/sunilk-bvmsolutions/new-meeting-1",
    birthday: "https://calendly.com/sunilk-bvmsolutions/new-meeting-1",
    connect_lnd: "https://calendly.com/sunilk-bvmsolutions/new-meeting-1",
    corporate_retreat:"https://calendly.com/sunilk-bvmsolutions/new-meeting-1"
  };

  let serviceKey = "corporate"; // default
  if (data) {
    const lowerData = data.toLowerCase().trim(); // remove spaces
    if (lowerData.includes("birthday")) serviceKey = "birthday";
    else if (lowerData.includes("virtual")) serviceKey = "virtual";
    else if (lowerData.includes("connect_lnd")) serviceKey = "connect_lnd";
    else if (lowerData.includes("corporate_retreat")) serviceKey = "corporate_retreat";
  }
  

  const calendlyUrl = calendlyLinks[serviceKey];
  console.log("LowerData:", data.toLowerCase().trim());
  console.log("Service Key:", serviceKey);
  console.log("Calendly URL:", calendlyLinks[serviceKey]);
  
  return (
    <section className={`hm-contact-sec section-padding pb-0 ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2
              className="sec-head medium"
              dangerouslySetInnerHTML={{
                __html: title || "Running<span> Out of Time? </span>",
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="hm-con-form-card">
              <div className="row align-items-center justify-content-between">

                <div className="col-lg-5 col-12">
                  <h3 className="sec-head medium">
                    Talk with <span>an Expert</span>
                  </h3>
                  <p className="para">
                    Let us plan the perfect party for you. Contact us for details.
                  </p>
                </div>

                <div className="col-lg-6 col-12">

                  <div className="hm-con-form-card-head">
                    <ul className="hm-con-form-card-list">
                      <li>
                        <Link
                          href="https://wa.me/919742386781"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image src={whicon} alt="whatsapp" />
                        </Link>
                      </li>
                      <li>
                        <Link href="tel:+919742386781">
                          <Image src={phicon} alt="phone" />
                        </Link>
                      </li>
                      <li>
                        <Link href="tel:+919742386781">
                          <span>+91 9742386781</span>
                        </Link>
                      </li>
                    </ul>

                    <ul className="hm-con-form-card-list">
                      <li>
                        <Link href="mailto:info@breakout.in">
                          <Image src={mailicon} alt="mail" />
                        </Link>
                      </li>
                      <li>
                        <Link href="mailto:info@breakout.in">
                          <span>info@breakout.in</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="btn-wrap d-flex gap-4 mt-4 align-items-center justify-content-center">

                    {/* Call Now */}
                    <Link href="tel:+919876543210" className="main-btn wide">
                      <span>Call Now</span>
                    </Link>

                    {/* Book a Call → Opens Calendly in NEW TAB dynamically */}
                    <Link
                      href={calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="main-btn wide dark-btn yellow-text white-border"
                    >
                      <span>Book a Call</span>
                    </Link>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PartyExpertCon;
