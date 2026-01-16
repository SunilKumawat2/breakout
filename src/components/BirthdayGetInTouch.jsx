"use client";

import React, { useState } from "react";
import Select from "react-select";
import loc from "@/images/loc.svg";
import Image from "next/image";
import DatePicker from "./DatePicker";
import privacyIcon from "@/images/privacy-icon.svg";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

const LOCATION_OPTIONS = [
  { value: "Koramangala", label: "Koramangala" },
  { value: "whitefield", label: "Whitefield" },
  { value: "JP Nagar", label: "JP Nagar" },
];

function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.phone) {
    errors.phone = "Required";
  } else if (!/^[0-9]{10,13}$/.test(values.phone)) {
    errors.phone = "Phone number should be 10-13 digits";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.date) {
    errors.date = "Required";
  }
  if (!values.location) {
    errors.location = "Required";
  }
  return errors;
}

const BirthdayGetInTouch = ({
  img,
  privacyLine = false,
  noTextBottom = false,
  textData,
  atOptions = LOCATION_OPTIONS,
}) => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const page = usePathname();

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

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      applyX: false,
      date: null,
      location: null,
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      setSubmitStatus(null);
      const sendData = {
        ...values,
        location: values.location?.value ?? "",
        date: values.date ? values.date.toISOString() : null,
        page: page,
      };
      try {
        await axios.post("/api/contactFormClickup", JSON.stringify(sendData));
        setSubmitStatus("success");
        toast.success("Thank you! We'll be in touch soon.", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        resetForm();
      } catch (err) {
        setSubmitStatus("error");
        toast.error("Something went wrong. Please try again.", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
  });

  return (
    <section className={`section-padding ${img ? "pb-0" : ""}`} id="book-now">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="esc-content text-center">
              <h2 className="sec-head sm-head medium">
                Get in <span>touch now.</span>
              </h2>
            </div>
          </div>
          <div className="col-12 mt-4">
            <div className="bday-form-card">
              <form
                className="form-field"
                onSubmit={formik.handleSubmit}
                noValidate
              >
                <div className="row align-items-end row-gap-25">
                  <div className="col-lg-6 col-12">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            "form-control" +
                            (formik.touched.name && formik.errors.name
                              ? " is-invalid"
                              : "")
                          }
                        />
                      </div>
                      {formik.touched.name && formik.errors.name && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.name}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="text"
                          name="phone"
                          placeholder="Phone Number"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            "form-control" +
                            (formik.touched.phone && formik.errors.phone
                              ? " is-invalid"
                              : "")
                          }
                        />
                      </div>
                      {formik.touched.phone && formik.errors.phone && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="email"
                          name="email"
                          placeholder="Add your E-mail ID"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            "form-control" +
                            (formik.touched.email && formik.errors.email
                              ? " is-invalid"
                              : "")
                          }
                        />
                      </div>
                      {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="form-group">
                      <div className="input-group">
                        <div className="cus-check">
                          <input
                            id="check"
                            type="checkbox"
                            name="applyX"
                            checked={formik.values.applyX}
                            onChange={formik.handleChange}
                          />
                          <label htmlFor="check" className="form-label">
                            <span>Apply for Breakout X</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-12">
                    <div className="form-group">
                      <label htmlFor="date" className="form-label">
                        Select a date
                      </label>
                      <DatePicker
                        id="date"
                        selected={formik.values.date}
                        onChange={(date) => formik.setFieldValue("date", date)}
                        minDate={new Date()}
                        maxDate={formik.values.date || null}
                        placeholderText="Select a date"
                        className={
                          "form-control" +
                          (formik.touched.date && formik.errors.date
                            ? " is-invalid"
                            : "")
                        }
                        onBlur={() => formik.setFieldTouched("date", true)}
                      />
                      {formik.touched.date && formik.errors.date && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.date}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-4 col-12">
                    <div className="form-group">
                      <label htmlFor="location" className="form-label">
                        At
                      </label>
                      <div className="input-group sel-group">
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder="Select an option"
                          name="location"
                          inputId="location"
                          styles={{
                            ...customStyles,
                            control: (base, state) => ({
                              ...customStyles.control(base, state),
                              paddingLeft: "35px",
                            }),
                          }}
                          options={atOptions}
                          value={formik.values.location}
                          onChange={(option) =>
                            formik.setFieldValue("location", option)
                          }
                          onBlur={() =>
                            formik.setFieldTouched("location", true)
                          }
                        />
                      </div>
                      {formik.touched.location && formik.errors.location && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.location}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12 col-12">
                    <div className="">
                      <button
                        className="main-btn dark-btn"
                        type="submit"
                        disabled={formik.isSubmitting}
                      >
                        <span className="yellow-text">
                          {formik.isSubmitting
                            ? "Booking…"
                            : submitStatus === "success"
                            ? "Submitted!"
                            : submitStatus === "error"
                            ? "Try Again"
                            : "Book a call"}
                        </span>
                      </button>
                    </div>
                  </div>
                  {/* {submitStatus === "success" && (
                    <div className="col-lg-12 text-center mt-3">
                      <span className="text-success">
                        Thank you! We'll be in touch soon.
                      </span>
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="col-lg-12 text-center mt-3">
                      <span className="text-danger">
                        Something went wrong. Please try again.
                      </span>
                    </div>
                  )} */}
                </div>
              </form>
            </div>
          </div>
        </div>
        {privacyLine && (
          <p className="privacy-line d-flex align-items-center gap-2 mt-4">
            <Image src={privacyIcon} alt="privacy-icon" />
            <span style={{ color: "#feaa00" }}>
              We value your trust and safeguard your privacy at every step.
            </span>
          </p>
        )}
        {noTextBottom && textData && (
          <section className="section-padding pb-0">
            <div className="container">
              <div className="row text-center justify-content-center">
                <div className="col-lg-9 col-12">
                  <h3
                    className="sec-head medium mb-4"
                    dangerouslySetInnerHTML={{ __html: textData?.heading }}
                  ></h3>
                  <p
                    className="para mb-4"
                    dangerouslySetInnerHTML={{ __html: textData?.content }}
                  ></p>
                  <p
                    className="para mb-4"
                    dangerouslySetInnerHTML={{ __html: textData?.description1 }}
                  ></p>
                  <p
                    className="para mb-4"
                    dangerouslySetInnerHTML={{ __html: textData?.description2 }}
                  ></p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      {img && <Image src={img} alt="illus" className="w-100 h-auto" />}
    </section>
  );
};

export default BirthdayGetInTouch;
