"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import whicon from "@/images/wh-icon.svg";
import phicon from "@/images/phone.svg";
import mailicon from "@/images/mail-icon.svg";
import Link from "next/link";
import Image from "next/image";


const PartyExpertCon = ({ title,className="" }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

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
                    Let us plan the perfect party for you. Contact us for
                    details.
                  </p>
                </div>
                <div className="col-lg-6 col-12">
                  {/* <div className="hm-con-form-card-head">
                    
                    
                  </div> */}
                  <div className="hm-con-form-card-head">
                    <ul className="hm-con-form-card-list">
                      <li>
                        <Link
                          href="https://wa.me/919742386781"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image src={whicon} alt="hmimg5" />
                        </Link>
                      </li>
                      <li>
                        <Link href="tel:+919742386781">
                          <Image src={phicon} alt="hmimg5" />
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
                          <Image src={mailicon} alt="hmimg5" />
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
                    <Link href="tel:+919876543210" className="main-btn wide">
                      <span>Call Now</span>
                    </Link>
                    {/* <Link
                      href="https://www.facebook.com/EscapeRoom.co.uk"
                      className="main-btn wide dark-btn yellow-text white-border"
                      target="_blank"
                    >
                      <span>Book a call</span>
                    </Link> */}
                    <button
                      className="main-btn wide dark-btn yellow-text white-border"
                      onClick={() => setShowCalendar(true)}
                    >
                     <span> Book a call</span>
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {showCalendar && (
  <div className="calendar-overlay">
    <div className="calendar-modal">
      <h4>Select a Date</h4>

      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
        minDate={new Date()}
      />

      <div className="calendar-actions">
        <button onClick={() => setShowCalendar(false)}>Close</button>
        <button
          disabled={!selectedDate}
          onClick={() => {
            console.log("Selected date:", selectedDate);
            setShowCalendar(false);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)} */}

    </section>
  );
};

export default PartyExpertCon;
