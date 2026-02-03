"use client";
import React, { useRef } from "react";
import swiperPrev from "@/images/chev-left.svg";
import swiperNext from "@/images/chev-right.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const timeSlots = [
  "11:00am",
  "11:30am",
  "12:00pm",
  "12:30pm",
  "1:00pm",
  "1:30pm",
  "2:00pm",
  "2:30pm",
  "3:00pm",
  "3:30pm",
  "4:00pm",
  "4:30pm",
  "5:00pm",
  "5:30pm",
  "6:00pm",
];

const SlotPicker = ({
  slots = timeSlots,
  selected,
  onSelect,
  availableSlots,
  handleSelect,
  selectedSlotTime,
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div
      style={{
        background: "#232323",
        borderRadius: "20px",
        padding: "20px 0",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        width: "100%",
        maxWidth: "100%",
        margin: "0 auto",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <button
        ref={prevRef}
        style={{
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: 18,
          padding: "0 16px",
          cursor: "pointer",
          outline: "none",
          width: "20px",
          height: "20px",
        }}
        aria-label="Scroll left"
      >
        {/* <FaChevronLeft /> */}
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={18}
          slidesPerView="auto"
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}

          pagination={{
            clickable: true,
          }}

          // slidesPerView={1}
          // spaceBetween={20}
          loop={true}
          onInit={(swiper) => {
            // Swiper navigation needs DOM elements, so assign after mount
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          style={{
            width: "100%",
            padding: "0 0px",
          }}
        >
          {availableSlots?.length > 0 &&
            availableSlots &&
            availableSlots.map((slot, idx) => (
              <SwiperSlide
                key={idx}
                style={{
                  width: 90,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => handleSelect && handleSelect(slot)}
                  style={{
                    minWidth: 90,
                    padding: "10px 0",
                    background:
                      selectedSlotTime?.slotId === slot?.slotId
                        ? "rgba(255, 174, 0, 0.18)"
                        : "rgba(255,255,255,0.06)",
                    border:
                      selectedSlotTime?.slotId === slot?.slotId
                        ? "2px solid #FFAE00"
                        : "2px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    color: "#fff",
                    fontWeight: 500,
                    fontSize: 16,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    outline: "none",
                    boxShadow:
                      selectedSlotTime?.slotId === slot?.slotId
                        ? "0 0 0 2px rgba(255, 174, 0, 0.15)"
                        : "none",
                  }}
                >
                  {/* <span>{slot?.date}</span> <br /> */}
                  {slot?.time}
                </button>
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="swiper-button-prev custom-prev go-plan">
          <Image src={swiperPrev} alt="Previous" />
        </div>

        <div className="swiper-button-next custom-next go-plan">
          <Image src={swiperNext} alt="Next" />
        </div>
      </div>
      <button
        ref={nextRef}
        style={{
          background: "none",
          border: "none",
          color: "#888",
          fontSize: 18,
          padding: "0 16px",
          cursor: "pointer",
          outline: "none",
        }}
        aria-label="Scroll right"
      >
        {/* <FaChevronRight /> */}
      </button>
      <style jsx>{`
        /* Hide Swiper scrollbar if any */
        :global(.swiper-scrollbar) {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default SlotPicker;
