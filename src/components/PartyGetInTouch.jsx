"use client";

import React, { useState } from "react";
import Select from "react-select";
import loc from "@/images/loc.svg";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import privacyIcon from "@/images/privacy-icon.svg";
import illus from "@/images/contact-bottom-illus.svg";
import illus4 from "@/images/illus-party-bottom.svg";
import DatePicker from "@/components/DatePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";

const IWantToOptions = [
  { value: "Host a Birthday Party", label: "Host a Birthday Party" },
  {
    value: "Host a Bachelor(ette) Party",
    label: "Host a Bachelor(ette) Party",
  },
  {
    value: "Host a Bachelorette’s Party",
    label: "Host a Bachelorette’s Party",
  },
  { value: "Host a Farewell Party", label: "Host a Farewell Party" },
];
const AtOptions = [
  { value: "Koramangala", label: "Koramangala" },
  { value: "J P Nagar", label: "J P Nagar" },
  { value: "Whitefield", label: "Whitefield" },
];
const ForOptions = [
  { value: "Toddlers", label: "Toddlers" },
  { value: "Kids", label: "Kids" },
  { value: "Tweens", label: "Tweens" },
  { value: "Teens", label: "Teens" },
  { value: "Friends / Family", label: "Friends / Family" },
  { value: "Love", label: "Love" },
];

const PartyGetInTouch = ({
  img,
  privacyLine = false,
  noTextBottom = true,
  data,
  home = false,
  noImage = false,
  className=""
}) => {
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const page = usePathname();

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "rgba(243, 244, 244, 0.1)",
      borderColor: state.isFocused ? "#FFAE00" : "rgba(255, 174, 0, 0.15)",
      borderRadius: "30px",
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

  const datePickerCustomStyles = {
    className: "form-control",
    calendarClassName: "custom-datepicker",
    dayClassName: (date) => "custom-day",
    wrapperClassName: "datePicker",
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      date: null,
      iWantTo: null,
      at: null,
      forCount: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10,15}$/, "Enter a valid phone number"),
      date: Yup.date().required("Please select a date").nullable(false),
      iWantTo: Yup.object().nullable().required("Please select an option"),
      at: Yup.object().nullable().required("Please select a location"),
      forCount: Yup.object().nullable().required("Please select a group size"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setSubmitSuccess(false);
      try {
        const sendData = {
          name: values.name,
          phone: values.phone,
          date: values.date ? values.date.toISOString().split("T")[0] : "",
          iWantTo: values.iWantTo.value,
          at: values.at.value,
          forCount: values.forCount.value,
          page: page,
        };
        await axios.post("/api/contactFormClickup", JSON.stringify(sendData));
        setSubmitSuccess(true);
        toast.success("Thank you! We'll be in touch soon.", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        resetForm();
      } catch (error) {
        setSubmitSuccess(false);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <section className={`section-padding pb-0 ${img ? "pb-0" : ""} ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="esc-content text-center">
              <h2 className="sec-head sm-head medium">
                Get in <span>touch now.</span>
              </h2>
            </div>
          </div>
          <div className="col-12">
            <div className="bday-form-card">
              <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div className="form-field ">
                  <div className="row align-items-end row-gap-25">
                    <div className="col-lg-6 col-12">
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
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
                            placeholder="Phone Number"
                            name="phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
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
                    <div className="col-lg-9 col-12">
                      <label htmlFor="date" className="form-label">
                        Select a date
                      </label>
                      <DatePicker
                        id="date"
                        selected={formik.values.date}
                        onChange={(date) => formik.setFieldValue("date", date)}
                        minDate={new Date()}
                        maxDate={selectedEndDate || null}
                        placeholderText="Select a date"
                        className={
                          "form-control" +
                          (formik.touched.date && formik.errors.date
                            ? " is-invalid"
                            : "")
                        }
                      />
                      {formik.touched.date && formik.errors.date && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.date}
                        </div>
                      )}
                    </div>
                    <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label htmlFor="iWantTo" className="form-label">
                          I want to...
                        </label>
                        <div className="input-group sel-group">
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="Select an option"
                            name="iWantTo"
                            styles={{
                              ...customStyles,
                              control: (base, state) => ({
                                ...customStyles.control(base, state),
                                paddingLeft: "35px",
                              }),
                            }}
                            options={IWantToOptions}
                            value={formik.values.iWantTo}
                            onChange={(option) =>
                              formik.setFieldValue("iWantTo", option)
                            }
                            onBlur={() =>
                              formik.setFieldTouched("iWantTo", true)
                            }
                          />
                        </div>
                        {formik.touched.iWantTo && formik.errors.iWantTo && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.iWantTo}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label htmlFor="at" className="form-label">
                          At
                        </label>
                        <div className="input-group sel-group">
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="Select an option"
                            name="at"
                            styles={{
                              ...customStyles,
                              control: (base, state) => ({
                                ...customStyles.control(base, state),
                                paddingLeft: "35px",
                              }),
                            }}
                            options={AtOptions}
                            value={formik.values.at}
                            onChange={(option) =>
                              formik.setFieldValue("at", option)
                            }
                            onBlur={() => formik.setFieldTouched("at", true)}
                          />
                        </div>
                        {formik.touched.at && formik.errors.at && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.at}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label htmlFor="forCount" className="form-label">
                          For
                        </label>
                        <div className="input-group sel-group">
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="Select an option"
                            name="forCount"
                            styles={{
                              ...customStyles,
                              control: (base, state) => ({
                                ...customStyles.control(base, state),
                                paddingLeft: "35px",
                              }),
                            }}
                            options={ForOptions}
                            value={formik.values.forCount}
                            onChange={(option) =>
                              formik.setFieldValue("forCount", option)
                            }
                            onBlur={() =>
                              formik.setFieldTouched("forCount", true)
                            }
                          />
                        </div>
                        {formik.touched.forCount && formik.errors.forCount && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.forCount}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-12 col-12">
                      <div className="">
                        <button
                          className="main-btn"
                          type="submit"
                          disabled={loading}
                        >
                          <span className="">
                            {loading ? "Booking..." : "Book a call"}
                          </span>
                        </button>
                        {/* {submitSuccess && (
                          <div className="alert alert-success mt-3">
                            Thank you! We’ll get in touch soon.
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
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
      </div>
      {/* {noTextBottom && (
        <section className="">
          <div className="container">
            <div className="row text-center justify-content-center">
              <div className="col-lg-9 col-12">
                <h3
                  className="sec-head medium mb-4"
                  dangerouslySetInnerHTML={{ __html: data?.heading }}
                />
                <p
                  className="para mb-4"
                  dangerouslySetInnerHTML={{
                    __html: data?.description1 || data?.content,
                  }}
                />
                <p
                  className="para"
                  dangerouslySetInnerHTML={{ __html: data?.description2 }}
                />
              </div>
            </div>
          </div>
        </section>
      )} */}
      {!noImage ? (
        !img ? (
          home ? (
            <Image
              src={illus}
              alt="illus"
              className="hm-contact-illus w-100 h-auto"
              style={{ marginBottom: "-1px" }}
            />
          ) : (
            <Image
              src={illus4}
              alt="illus"
              className="hm-contact-illus w-100 h-auto"
              style={{ marginBottom: "-1px" }}
            />
          )
        ) : (
          <Image
            src={img}
            alt="illus"
            className="hm-contact-illus w-100 h-auto"
            style={{ marginBottom: "-1px" }}
          />
        )
      ) : null}
    </section>
  );
};

export default PartyGetInTouch;
