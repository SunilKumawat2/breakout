"use client";

import React, { useState, useEffect } from "react";
import Select from "react-select";
import loc from "@/images/loc.svg";
import Image from "next/image";
import DatePicker from "./DatePicker";
import api from "@/app/helpers/api";
import SlotPicker from "./SlotPicker";
import { useGlobalContext } from "@/context/GlobalContext";
import { toast } from "react-toastify";
import { CommonModal } from "@/components/CommonModal";
import arrowPrev from "@/images/chev-left.svg";
import arrowNext from "@/images/chev-right.svg";
import calenderIcon from "@/images/calendar-btn.svg";

const ReserveASlot = ({ room, onOpenFaq, className = "", }) => {
  const {
    availableSlots,
    fetchAvailableSlots,
    fetchThirdPartyGames,
    fetchThirdPartyLocations,
    loading,
    errors,
    thirdPartyLocations,
    thirdPartyGames,
    bookASlot,
  } = useGlobalContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedSlotTime, setSelectedSlotTime] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [hasSlotsFetched, setHasSlotsFetched] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  /* ================= CALENDAR LOGIC ================= */
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [startIndex, setStartIndex] = useState(0);
  const [days, setDays] = useState([]);
  const [showMonthYear, setShowMonthYear] = useState(false);

  useEffect(() => {
    fetchThirdPartyLocations();
  }, []);

  useEffect(() => {
    console.log("location", thirdPartyLocations);
  }, [thirdPartyLocations]);

  const handleLocationSelect = async (e) => {
    setSelectedLocation(e.value);
    const games = await fetchThirdPartyGames(e.value);
    console.log("games", games);
  };

  const handleGameSelect = async (e) => {
    setSelectedGame(e.map((game) => game.value));
  };

  useEffect(() => {
    const fetchSlots = async () => {
      if (
        !selectedLocation ||
        !selectedGame ||
        !selectedStartDate ||
        !selectedEndDate
      ) {
        return;
      }
      setHasSlotsFetched(true);
      setSlotsLoading(true);
      const slots = await fetchAvailableSlots(
        selectedLocation,
        selectedGame,
        selectedStartDate,
        selectedEndDate
      );
      setSlotsLoading(false);
      console.log("slots", slots);
    };
    fetchSlots();
  }, [selectedLocation, selectedGame, selectedStartDate, selectedEndDate]);

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
    multiValue: (base) => ({
      ...base,
      backgroundColor: "rgba(255, 174, 0, 0.18)",
      borderRadius: "12px",
      color: "#FFAE00",
      fontWeight: 500,
      padding: "2px 6px",
      margin: "2px 4px",
      display: "flex",
      alignItems: "center",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#FFAE00",
      fontWeight: 500,
      padding: "0 4px",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#FFAE00",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "rgba(255, 174, 0, 0.3)",
        color: "#fff",
      },
    }),
  };

  const datePickerCustomStyles = {
    className: "form-control",
    calendarClassName: "custom-datepicker",
    dayClassName: (date) => "custom-day",
    wrapperClassName: "datePicker",
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlotTime(slot);
  };

  const handleBookNow = () => {
    setBookingLoading(true);
    if (
      !firstName === "" ||
      !lastName === "" ||
      !email === "" ||
      !phone === "" ||
      !selectedSlotTime ||
      !selectedLocation
    ) {
      toast.error("Please fill all the fields");
      setBookingLoading(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      setBookingLoading(false);
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (phone === "" || !phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number");
      setBookingLoading(false);
      return;
    }
    const bookingData = {
      customerFirstName: firstName,
      customerLastName: lastName,
      customerEmail: email,
      customerPhone: phone,
      slotId: selectedSlotTime?.slotId,
      locationId: selectedLocation,
      gameId: selectedSlotTime?.gameId,
    };
    
    const fetchBookingData = async () => {
      try {
        const response = await bookASlot(bookingData);
        if (response?.bookingId && response?.bookingId !== "") {
          toast.success("Booking successful");
          setBookingLoading(false);
          window.open(
            `https://bs.kreeda.icu/embed?cartId=${response?.bookingId}`,
            "_blank"
          );
        } else {
          toast.error("Booking failed Please try again");
          setBookingLoading(false);
        }
      } catch {
        setBookingLoading(false);
      }
    };
    fetchBookingData();
  };


 

  useEffect(() => {
    const totalDays = new Date(year, month + 1, 0).getDate();
    const arr = Array.from({ length: totalDays }, (_, i) => i + 1);
    setDays(arr);

    if (
      year === today.getFullYear() &&
      month === today.getMonth()
    ) {
      setStartIndex(today.getDate() - 1);
    } else {
      setStartIndex(0);
    }
  }, [year, month]);

  const visibleDays = days.slice(startIndex, startIndex + 7);

  const nextDays = () => {
    if (startIndex + 7 < days.length) {
      setStartIndex(startIndex + 7);
    }
  };

  const prevDays = () => {
    if (startIndex - 7 >= 0) {
      setStartIndex(startIndex - 7);
    }
  };

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };


  const handleDateSelect = (day) => {
    const dateObj = new Date(year, month, day);
    setSelectedDate(dateObj);
    // formik.setFieldValue("date", dateObj);
  };

  const isPastDate = (day) => {
    const checkDate = new Date(year, month, day);
    checkDate.setHours(0, 0, 0, 0);

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    return checkDate < todayDate;
  };

  return (
    <section className={`section-padding ${className}`} >
      <CommonModal show={show} handleClose={() => setShow(false)}>
        <div className="esc-modal-content">
          <h3 className="sec-head h3 yellow-text">Terms and Conditions</h3>
          <p className="para mt-4 sm">
            <strong>1. Booking Confirmation Requirement:</strong> To ensure
            entry to your escape room experience, a booking confirmation email
            is mandatory. If you have not received this email after payment,
            please contact our support team for assistance. Without the
            confirmation, entry cannot be guaranteed, but we will do our best to
            accommodate you based on availability or issue a refund if
            necessary.
            <br />
            <br />
            <strong>2. Arrival Time:</strong> All team members must arrive at
            least 20 minutes before the scheduled slot time to allow for form
            filling, considering the 3 Ps: Parking time, Peeing time, and the
            Painful Bangalore traffic.  <br />
            <br />
            <strong>3. Liability Form:</strong> A liability form must be
            completed at the facility. Incomplete forms will result in denial of
            entry by the Game Master, except for individuals aged 13 years and
            below.  <br />
            <br />
            <strong>4. Game Time Reduction:</strong> If you are late for the
            experience, your game time will be cut short accordingly.  <br />
            <br />
            <strong>5. Entry Restriction:</strong> If you arrive after your slot
            timing, entry will be restricted to prevent delays for subsequent
            teams. However, if you arrive within 10 minutes of your slot time,
            we will make every effort to accommodate you.  <br />
            <br />
            <strong>6. No Cancellation and Refund Policy:</strong> Please note
            that we have a strict no-cancellation and no-refund policy for
            bookings.
          </p>
          {/* <Link href={"#"} className="main-btn">
            <span>Book Now</span>
          </Link> */}
        </div>
      </CommonModal>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="esc-content text-center">
              <h2
                className="sec-head sm-head medium"
                dangerouslySetInnerHTML={{
                  __html: room?.heading,
                }}
              >
                {/* Reserve <span>a Slot</span> */}
              </h2>
            </div>
          </div>
          <div className="col-12">
            <p className="para">Pricing</p>
            <div className="cus-card pick-card mt-0">
              <div className="row row-gap-25">
                {room?.pricing &&
                  room?.pricing?.length > 0 &&
                  room?.pricing?.map((item, index) => (
                    <div className="col-lg-4 col-12 text-center" key={index}>
                      <h3
                        dangerouslySetInnerHTML={{
                          __html: item?.day_range,
                        }}
                      ></h3>
                      <p className="para">
                        {item?.price23}
                        <br />
                        {item?.price46}
                      </p>
                    </div>
                  ))}
              </div>
              <p className="para mt-5 mb-0">
                {room?.note}{" "}
                <span
                  className="yellow-text"
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontStyle: "italic",
                  }}
                  onClick={() => onOpenFaq(3)}   // ← index 3
                >
                  Check eligibility Criteria
                </span>
              </p>

              <p className="para">
                Kids Pricing.{" "}
                <span
                  className="yellow-text"
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontStyle: "italic",
                  }}
                  onClick={() => onOpenFaq(4)}   // ← index 4
                >
                  Check here
                </span>
              </p>

            </div>
            <button
              className="main-btn mt-4 dark-btn sm"
              onClick={() => setShow(true)}
            >
              <span className="yellow-text">T & C applied*</span>
            </button>
            <div className="form-field mt-5">
              <div className="row">
                <div className="col-lg-3 col-12">
                  <div className="form-group">
                    <label htmlFor="location" className="form-label">
                      Choose a Location
                    </label>
                    <div className="input-group sel-group">
                      <Image src={loc} alt="loc" />
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
                        onChange={(e) => {
                          handleLocationSelect(e);
                        }}
                        options={
                          thirdPartyLocations?.length > 0 && thirdPartyLocations
                            ? thirdPartyLocations?.map((location) => ({
                              value: location.locationId,
                              label: location.locationName,
                            }))
                            : []
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div className="form-group">
                    <label htmlFor="location" className="form-label">
                      Choose a Game
                    </label>
                    <div className="input-group sel-group">
                      <Select
                        isMulti
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select an option"
                        name="color"
                        styles={{
                          ...customStyles,
                          control: (base, state) => ({
                            ...customStyles.control(base, state),
                          }),
                        }}
                        onChange={(e) => {
                          handleGameSelect(e);
                        }}
                        options={
                          thirdPartyGames?.length > 0 && thirdPartyGames
                            ? thirdPartyGames?.map((game) => ({
                              value: game.gameId,
                              label: game.gameName,
                            }))
                            : []
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div className="form-group">
                    <label className="form-label">Start Date</label> <br />
                    <DatePicker
                      selected={selectedStartDate}
                      onChange={(date) => {
                        setSelectedStartDate(date);
                      }}
                      minDate={new Date()}
                      maxDate={selectedEndDate || null}
                      placeholderText="Select a date"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div className="form-group">
                    <label className="form-label">End Date</label> <br />
                    <DatePicker
                      selected={selectedEndDate}
                      onChange={(date) => {
                        setSelectedEndDate(date);
                      }}
                      minDate={selectedStartDate || new Date()}
                      placeholderText="Select a End Date"
                    />
                  </div>
                </div>

                {/* ================= CALENDAR ================= */}
                <div className="col-12 mb-4 mt-3">
                <div className="calendar-wrapper">
                        <div className="calendar-header">
                          <div
                            className="month-year-select mb-3"
                          // onClick={() => setShowMonthYear(!showMonthYear)}
                          >
                            <span>
                              {new Date(year, month).toLocaleString("default", { month: "long" })} {year}
                            </span>
                            {/* <Image src={selectDrop} alt="arrow" /> */}
                          </div>
                        </div>

                        <div className="calendar-days-outer">
                          <div className="calendar-days">
                            <div className="arrow" onClick={prevDays} disabled={startIndex === 0}>
                              {/* ‹ */}
                              <Image src={arrowPrev} alt="Previous" />
                            </div>

                            {visibleDays.map((day) => {
                              const past = isPastDate(day);

                              return (
                                <div
                                  key={day}
                                  onClick={() => {
                                    if (!past) handleDateSelect(day);
                                  }}
                                  className={`day ${past ? "disabled" : ""} ${selectedDate &&
                                    selectedDate.getDate() === day &&
                                    selectedDate.getMonth() === month &&
                                    selectedDate.getFullYear() === year
                                    ? "active"
                                    : ""
                                    }`}
                                >
                                  {day}
                                </div>
                              );
                            })}


                            <div
                              className={`arrow ${startIndex + 7 >= days.length ? "disabled" : ""} `}
                              onClick={nextDays}
                              disabled={startIndex + 7 >= days.length}
                            >
                              {/* › */}
                              <Image src={arrowNext} alt="Next" />
                            </div>
                            <div
                              className="calender-btn"
                              onClick={() => setShowMonthYear(!showMonthYear)}
                            >
                              {/* › */}
                              <Image src={calenderIcon} alt="Calender Icon" />
                            </div>
                          </div>

                          {showMonthYear && (
                            <div className="month-year-dropdown">
                              <div className="months">
                                {Array.from({ length: 12 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className={`option ${month === i ? "active" : ""}`}
                                    onClick={() => {
                                      setMonth(i);
                                      setShowMonthYear(false);
                                    }}
                                  >
                                    {new Date(0, i).toLocaleString("default", { month: "long" })}
                                  </div>
                                ))}
                              </div>

                              <div className="years">
                                {[2026, 2027, 2028, 2029,2030,2031,2032,2033].map((y) => (
                                  <div
                                    key={y}
                                    className={`option ${year === y ? "active" : ""}`}
                                    onClick={() => {
                                      setYear(y);
                                      setShowMonthYear(false);
                                    }}
                                  >
                                    {y}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        </div>
                      </div>
                </div>

                <div className="col-lg-12 col-12">
                  <div className="">
                    {slotsLoading ? (
                      <div className="text-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : availableSlots?.length > 0 && availableSlots ? (
                      <SlotPicker
                        handleSelect={handleSlotSelect}
                        selectedSlotTime={selectedSlotTime}
                        availableSlots={availableSlots}
                      />
                    ) : !hasSlotsFetched ? (
                      <div className="text-center py-5">
                        <p>
                          Please select a location, game, start date and end
                          date
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-5">
                        <p>No slots available</p>
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className="col-lg-3 col-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div> */}
                <div className="col-12">
                  <button
                    className="main-btn mt-4 sm"
                    onClick={handleBookNow}
                    disabled={bookingLoading}
                  >
                    <span className="">
                      {bookingLoading ? "Booking..." : "Book Now"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReserveASlot;
