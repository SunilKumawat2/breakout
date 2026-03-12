"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import selectDrop from "@/images/select-drop.svg";
import arrowPrev from "@/images/chev-left.svg";
import arrowNext from "@/images/chev-right.svg";
import calenderIcon from "@/images/calendar-btn.svg";
import { useGlobalContext } from "@/context/GlobalContext";
import { toast } from "react-toastify";
import Select from "react-select";

const BrochureDownloadForm = ({ page_name = "", blog_slug = {} }) => {
  const { bookbloggetintouch } = useGlobalContext();
  /* ================= CALENDAR LOGIC ================= */
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [startIndex, setStartIndex] = useState(0);
  const [days, setDays] = useState([]);
  const [showMonthYear, setShowMonthYear] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  console.log("sfjsdjfgsjgfsdfjsjdfgjsdf_filteredBlogs", blog_slug)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    date: "",
    i_am_looking_for: "",
    attendies_count: ""
  });

  const [blogSlug, setBlogSlug] = useState("");
  const blogOptions = blog_slug?.map((item) => ({
    value: item.slug,
    label: item.title
  }));
  const [selectedBlog, setSelectedBlog] = useState(null);
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
  const eventOptions = [
    { value: "birthday", label: "Birthday" },
    { value: "escape rooms", label: "Escape Rooms" },
    { value: "farewells", label: "Farewells" },
    { value: "bachelor", label: "Bachelor" },
    { value: "things to do", label: "Things to do" },
    { value: "others", label: "Others" }
  ];

  const attendeesOptions = [
    { value: "10 to 25", label: "10 to 25" },
    { value: "25 to 50", label: "25 to 50" },
    { value: "above 50", label: "Above 50" }
  ];
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    // initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        // const res = await api.get("/blogs");
        const res2 = await api.get("/birthday-blog");
        // setBlogs([...res.data.data, ...res2.data.data]);
        // setFilteredBlogs([...res.data.data, ...res2.data.data]);
        setFilteredBlogs(res2.data.data);
        console.log("jnssjfdgsjdgfjsgdfsdf", res2.data.data)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

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

  let daysToShow = isMobile ? 7 : 12;

  // if (page_name == "resources_blogs" || page_name == "seo_blogs") {
  //   daysToShow = isMobile ? 7 : 12;
  // } else {
  //   daysToShow = isMobile ? 5 : 7;
  // }

  const visibleDays = days.slice(startIndex, startIndex + daysToShow);

  const nextDays = () => {
    if (startIndex + daysToShow < days.length) {
      setStartIndex(startIndex + daysToShow);
    }
  };

  const prevDays = () => {
    if (startIndex - daysToShow >= 0) {
      setStartIndex(startIndex - daysToShow);
    }
  };

  const handleDateSelect = (day) => {
    const dateObj = new Date(year, month, day);

    setSelectedDate(dateObj);

    const formattedDate = dateObj.toISOString().split("T")[0];

    setFormData((prev) => ({
      ...prev,
      date: formattedDate
    }));
  };

  const isPastDate = (day) => {
    const checkDate = new Date(year, month, day);
    checkDate.setHours(0, 0, 0, 0);

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    return checkDate < todayDate;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!blogSlug) {
        alert("Please select blog slug");
        return;
      }

      const payload = {
        ...formData
      };

      await bookbloggetintouch(payload, blogSlug);
      toast.success("Form submitted successfully")
      // ✅ Reset form fields
      setFormData({
        Name: "",
        Phone: "",
        date: "",
        i_am_looking_for: "",
        attendies_count: ""
      });

    } catch (error) {
      console.log(error);
    }
  };

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const selectedEvent = eventOptions.find(
    (option) => option.value === formData.i_am_looking_for
  );

  const selectedAttendees = attendeesOptions.find(
    (option) => option.value === formData.attendies_count
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  /* ================= UI ================= */
  return (
    <section className="brochure-download-form section-padding">
      <div className="container">
        <div className="row">
          <div className="col-form-head d-flex justify-content-between mb-40">

            <h3 className="sec-head medium mb-0">
              Get <span>Brochure</span>
            </h3>
            {
              page_name == "resources_blogs" && (
                <div className="form-group style-2">
                  <div className="input-group">
                    {/* <div className="input-group sel-group"> */}
                      {/* <div className="dropdown">
                      <button className="dropdown-toggle" type="button"
                      onClick={toggleDropdown}>
                      <span> Dropdown button</span>
                      <Image src={selectDrop} alt="select" />
                      </button>
                      <ul className={`dropdown-menu ${open ? "show" : ""}`}>
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                      </ul>
                    </div> */}
                      {/* <select onChange={(e) => setBlogSlug(e.target.value)}>
                        <option value="">Select the article</option>
                        {
                          blog_slug?.map((blog_slug_result, index) => {
                            return (
                              <option value={blog_slug_result?.slug} key={index + 1}>{blog_slug_result?.title}</option>
                            )
                          })
                        }
                      </select> */}
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select the article"
                        options={blogOptions}
                        value={selectedBlog}
                        onChange={(option) => {
                          setSelectedBlog(option);
                          setBlogSlug(option?.value);
                        }}

                        menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                        menuPosition="fixed"
                        menuShouldBlockScroll={true}
                        captureMenuScroll={true}
                        menuShouldScrollIntoView={false}
                        maxMenuHeight={500}

                        styles={{
                          ...customStyles,
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          control: (base, state) => ({
                            ...customStyles.control(base, state),
                            paddingLeft: "35px",
                          }),
                        }}
                      />


                      {/* <Image src={selectDrop} alt="select" />
                    </div> */}
                  </div>

                </div>
              )
            }
          </div>
        </div>

        <div className="download-form-div">
          <div className="row ">



            {/* ================= FORM (UNCHANGED) ================= */}
            <div className="col-lg-6 col-12">
              <div className="form-group">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Name"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-12">
              <div className="form-group">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Phone"
                    name="Phone"
                    value={formData.Phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            {/* ================= CALENDAR ================= */}
            <div className="col-lg-12 col-12">
              <div className="calendar-wrapper">
                <div className="calendar-header">
                  <div
                    className="month-year-select mb-3"
                  // onClick={() => setShowMonthYear(!showMonthYear)}
                  >
                    <span>
                      {new Date(year, month).toLocaleString("default", { month: "long" })} {year}
                    </span>
                    <span>
                      {isMobile && (
                        <div
                          className="calender-btn"
                          onClick={() => setShowMonthYear(!showMonthYear)}
                        >
                          {/* › */}
                          <Image src={calenderIcon} alt="Calender Icon" />
                        </div>
                      )

                      }
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
                    {!isMobile && (
                      <div
                        className="calender-btn"
                        onClick={() => setShowMonthYear(!showMonthYear)}
                      >
                        {/* › */}
                        <Image src={calenderIcon} alt="Calender Icon" />
                      </div>
                    )
                    }
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
                        {[2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033].map((y) => (
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
            <div className="col-lg-4 col-12 mt-3">
              <div className="form-group style-2">
                <label className="label-text">I’m looking for</label>
                <div className="input-group">
                  {/* <div className="select-group"> */}
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Select event type"
                      options={eventOptions}
                      value={selectedEvent}
                      onChange={(option) => {
                        setFormData((prev) => ({
                          ...prev,
                          i_am_looking_for: option?.value || ""
                        }));
                      }}
                      menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                      menuPosition="fixed"
                      menuShouldBlockScroll={true}
                      captureMenuScroll={true}
                      styles={{
                        ...customStyles,
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        control: (base, state) => ({
                          ...customStyles.control(base, state),
                          paddingLeft: "35px",
                        }),
                      }}
                    />
                    {/* <Image src={selectDrop} alt="select" />
                  </div> */}
                </div>
              </div>
            </div>
            {
              page_name == "seo_blogs" && (
                <div className="col-lg-4 col-12 mt-3">
                  <div className="form-group style-2">
                    <label className="label-text">For</label>
                    <div className="input-group">
                      <div className="select-group">
                        <select>
                          <option>Select age range</option>
                        </select>
                        <Image src={selectDrop} alt="select" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            <div className="col-lg-4 col-12 mt-3">
              <div className="form-group style-2">
                <label className="label-text">Attendees Count</label>
                <div className="input-group">
                  {/* <div className="select-group"> */}
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Select number of attendees"
                      options={attendeesOptions}
                      value={selectedAttendees}
                      onChange={(option) => {
                        setFormData((prev) => ({
                          ...prev,
                          attendies_count: option?.value || ""
                        }));
                      }}
                      menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                      menuPosition="fixed"
                      menuShouldBlockScroll={true}
                      captureMenuScroll={true}
                      styles={{
                        ...customStyles,
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        control: (base, state) => ({
                          ...customStyles.control(base, state),
                          paddingLeft: "35px",
                        }),
                      }}
                    />
                    {/* <Image src={selectDrop} alt="select" />
                  </div> */}
                </div>
              </div>
            </div>

            <div className="col-12 mt-4">
              <button className="main-btn" onClick={handleSubmit}>
                <span>Download Brochure</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BrochureDownloadForm;
