"use client";
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import VenueCard from "./VenueCard";
import { useGlobalContext } from "@/context/GlobalContext";
import { Accordion } from "react-bootstrap";
import arrow from "@/images/acc-plus.svg";
import minus from "@/images/acc-minus.svg";
import Image from "next/image";
import api from "@/app/helpers/api";
import VenueInner from "./VenueInner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const BirthdayVenueWidget = () => {
  const { venueCategories } = useGlobalContext();
  const [venueCards, setVenueCards] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  // Store refs for each Swiper instance (one per Accordion item)
  const swiperRefs = useRef({});

  useEffect(() => {
    const fetchVenueCards = async () => {
      const response = await api.get("/birthdayblogfaqs");
      const data = await response.data;
      setVenueCards(data?.data);
    };
    fetchVenueCards();
  }, []);

  // When selectedVenue changes, slide to that venue in the correct Swiper
  useEffect(() => {
    if (!selectedVenue || !venueCards) return;
    // Find which Accordion (venueCards) contains the selectedVenue
    for (let i = 0; i < venueCards.length; i++) {
      const venues = venueCards[i]?.venues || [];
      const idx = venues.findIndex((v) => v.id === selectedVenue.id);
      if (idx !== -1 && swiperRefs.current[i]) {
        swiperRefs.current[i].slideTo(idx, 300);
        break;
      }
    }
  }, [selectedVenue, venueCards]);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "rgba(243, 244, 244, 0.1)",
      borderColor: state.isFocused ? "#FFAE00" : "rgba(255, 174, 0, 0.15)",
      borderRadius: "20px",
      padding: "8px",
      color: "#FFFFFF",
      cursor: "pointer",
      "&:hover": {
        borderColor: "rgba(255, 174, 0, 0.3)",
      },
      input: {
        color: "#FFFFFF",
      },
    }),
    menu: (base) => ({
      ...base,
      background: "#272727",
      borderRadius: "10px",
      zIndex: 9999,
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? "rgba(255, 174, 0, 0.1)" : "transparent",
      color: state.isFocused ? "#FFAE00" : "#FFFFFF",
      cursor: "pointer",
      "&:hover": {
        background: "rgba(255, 174, 0, 0.1)",
        color: "#FFAE00",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "#FFFFFF",
    }),
    placeholder: (base) => ({
      ...base,
      color: "rgba(255, 255, 255, 0.5)",
    }),
  };
  return (
    <section className="section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="birthday-venue-widget">
              <h3 className="sec-head text-center sm-head medium ">
                <span>Best Party Places in Bangalore</span>
              </h3>
            </div>
            <div className="b-flt-wrap mt-5 d-none">
              <div className="b-flt-item">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Select an option"
                  name="color"
                  styles={{
                    ...customStyles,
                    control: (base, state) => ({
                      ...customStyles.control(base, state),
                      paddingLeft: "35px",
                    }),
                  }}
                  options={venueCategories?.map((category) => ({
                    value: category?.category,
                    label: category?.category,
                  }))}
                />
              </div>
              <div className="b-flt-item">
                <label htmlFor="Location" className="form-label">
                  Location
                </label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Select an option"
                  name="color"
                  styles={{
                    ...customStyles,
                    control: (base, state) => ({
                      ...customStyles.control(base, state),
                      paddingLeft: "35px",
                    }),
                  }}
                  options={[
                    { value: "Koramangala", label: "Koramangala" },
                    { value: "Koramangala", label: "Koramangala" },
                    { value: "Koramangala", label: "Koramangala" },
                  ]}
                />
              </div>
              <div className="b-flt-item">
                <label htmlFor="Capacity" className="form-label">
                  Capacity
                </label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Select an option"
                  name="color"
                  styles={{
                    ...customStyles,
                    control: (base, state) => ({
                      ...customStyles.control(base, state),
                      paddingLeft: "35px",
                    }),
                  }}
                  options={[
                    { value: "Koramangala", label: "Koramangala" },
                    { value: "Koramangala", label: "Koramangala" },
                    { value: "Koramangala", label: "Koramangala" },
                  ]}
                />
              </div>
              <div className="b-flt-item">
                <label htmlFor="Party Type" className="form-label">
                  Party Type
                </label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Select an option"
                  name="color"
                  styles={{
                    ...customStyles,
                    control: (base, state) => ({
                      ...customStyles.control(base, state),
                      paddingLeft: "35px",
                    }),
                  }}
                  options={[
                    { value: "Koramangala", label: "Koramangala" },
                    { value: "Koramangala", label: "Koramangala" },
                    { value: "Koramangala", label: "Koramangala" },
                  ]}
                />
              </div>
            </div>
            {venueCards && venueCards?.length > 0 && (
              <Accordion className="b-venue-cards-accordion mt-5 acc">
                {venueCards?.map((venue, accIndex) => (
                  <Accordion.Item eventKey={accIndex} key={accIndex}>
                    <Accordion.Header>
                      <span>{venue?.question}</span>
                      <Image src={arrow} className="acc-arrow" alt="arrow" />
                      <Image src={minus} className="acc-minus" alt="arrow" />
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="b-venue-cards">
                        <div className="row row-gap-25">
                          {venue?.venues?.map((venueItem, vIndex) => (
                            <div className="col-lg-3 col-12" key={vIndex}>
                              <VenueCard
                                venue={venueItem}
                                setSelectedVenue={setSelectedVenue}
                                selectedVenue={selectedVenue}
                                clickable={true}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="venue-card-slider">
                        <Swiper
                          slidesPerView={1}
                          spaceBetween={10}
                          onSwiper={(swiper) => {
                            swiperRefs.current[accIndex] = swiper;
                          }}
                        >
                          {venue?.venues?.length > 0 &&
                            venue?.venues?.map((venueItem, vIndex) => (
                              <SwiperSlide key={vIndex}>
                                <VenueInner venue={venueItem} />
                              </SwiperSlide>
                            ))}
                        </Swiper>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BirthdayVenueWidget;
