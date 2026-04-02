"use client";
import React from "react";
import Image from "next/image";
import Banner from "@/components/escape-room/Banner";
import BigVideoPlayer from "@/components/BigVideoPlayer";
import hmIllus from "@/images/bottom-illus.svg";
import illus2 from "@/images/contact-bottom-illus.svg";
import illus3 from "@/images/illus3.svg";
import ReserveASlot from "@/components/ReserveASlot";
import FaqSection from "@/components/FaqSection";
import EscapeRoomCard from "@/components/EscapeRoomCard";
import loc1 from "@/images/koramangala.jpg";
import loc2 from "@/images/jp-nagar.jpg";
import loc3 from "@/images/whitefield.jpg";
import LocationCard from "@/components/LocationCard";
import HomeContact from "@/components/home/HomeContact";
import VisitLocations from "@/components/VisitLocations";
import GlobalReviewWidget from "@/components/GlobalReviewWidget";
import api from "@/app/helpers/api";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import marketingIllus from "@/images/marketing-illus.svg";
import Link from "next/link";
import ConnectContact from "@/components/ConnectContact";
import { CommonModal } from "@/components/CommonModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const page = () => {
  const { id } = useParams();
  const [escapeRooms, setEscapeRooms] = useState(null);
  const [activities, setActivities] = useState(null);
  console.log("sjkdfhsdhkfshf",activities)
  const [show1, setShow1] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);
  const [room, setRoom] = useState(null);
  console.log("sjkdfhsdhkfshf_123",room)

  useEffect(() => {
    const fetchEscapeRooms = async () => {
      const res = await api.get(`/escaperooms`);
      setEscapeRooms(res.data.data);
    };
    fetchEscapeRooms();

    const fetchEscapeRoom = async () => {
      const res = await api.get(`/corporate-ld-inner/${id}`);
      setRoom(res.data.data);
    };
    fetchEscapeRoom();

    const fetchActivities = async () => {
      const res = await api.get(`/activity-listing`);
      setActivities(res.data.data);
    };
    fetchActivities();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(/^[0-9]{10}$/, "Enter valid phone number"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {

      await submitResourceForm(values);

      setSubmitting(false);
      resetForm();

    },
  });

  const handleFreeConsultationCardClick = (item) => {
    const cleanHeading = item?.heading?.replace(/<[^>]*>/g, "");

    if (cleanHeading == "Free Consultation with Expert") {
      const section = document.getElementById("get-in-touch");
      section?.scrollIntoView({ behavior: "smooth" });
    }
    else if (cleanHeading.includes("Ebook")) {

      let link = "";

      if (cleanHeading == "Ebook - Why 88% of Training Fails") {
        link = "https://1drv.ms/b/c/033f28a2603d05d2/IQBMuwcPxoSpRLSMZOUTNQbkAZ5gYVsaWqjJ2puTzVDgrbI?e=8ce5YQ";
      }
      else if (cleanHeading == "Ebook - Exposing L&D’s Biggest Failures") {
        link = "https://1drv.ms/b/c/033f28a2603d05d2/IQALhxqdOD3vSqqg-OajZ9_NAaXFzWRLWLPkFaiCnx0n93U?e=pPK76A2";
      }

      setSelectedLink(link); // ✅ store link
      setShow1(true);        // ✅ open modal
    }
  };

  const submitResourceForm = async (values) => {
    try {
      console.log(values);

      toast.success("Form submitted successfully");

      setShow1(false);

      setTimeout(() => {
        if (selectedLink) {
          window.open(selectedLink, "_blank"); // ✅ open ebook
        }
      }, 800);

    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="black-gr-div">
        {room?.bannersection && <Banner corporate={true} room={room} />}

        {room?.contentsection && (
          <section className="sec-padding-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div
                    className="para"
                    dangerouslySetInnerHTML={{
                      __html: room?.contentsection?.content,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {room && room?.imagecardsection && (
          <section className="sec-padding-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 mb-40">
                  <div
                    className="sec-head sm-head medium"
                    dangerouslySetInnerHTML={{
                      __html: room?.imagecardsection?.heading,
                    }}
                  />
                  <div
                    className="para mt-4"
                    dangerouslySetInnerHTML={{
                      __html: room?.imagecardsection?.description,
                    }}
                  />
                </div>
              </div>
              <div className="row mt-4 row-gap-25">
                {/* {JSON.stringify(activities)} */}
                {room &&
                  room.imagecardsection.images?.length > 0 &&
                  room.imagecardsection.images?.map((item, index) => {
                    return (
                      <div className="col-lg-4 col-12" key={index}>
                        <Link
                          href={`/activities/${item?.slug}`}
                          className="location-card text-sm"
                          onClick={() => {
                            window.dataLayer = window.dataLayer || [];
                            window.dataLayer.push({
                              event: "cta_click",
                              button_name: item?.title,
                              destination: `/activities/${item?.slug}`,
                              page: window.location.pathname,
                              section: "activities_cards",
                            });
                          }}
                        >
                          <div className="location-card-img">
                            {item?.image && (
                              <Image
                                src={item?.image}
                                alt={item?.title || "activities"}
                                width={500}
                                height={500}
                              />
                            )}
                          </div>

                          <div className="location-card-content">
                            <h3 className="sec-head sm-head medium">
                              {item?.heading}
                            </h3>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        )}

        {room && room?.pointssection && (
          <section className="section-padding pb-0">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div
                    className="sec-head sm-head medium"
                    dangerouslySetInnerHTML={{
                      __html: room?.pointssection?.heading,
                    }}
                  />
                  <div
                    className="para mt-4"
                    dangerouslySetInnerHTML={{
                      __html: room?.pointssection?.description,
                    }}
                  />
                </div>
              </div>
              <div className="row mt-4">
                {room?.pointssection?.points &&
                  room?.pointssection?.points?.length > 0 && (
                    <ul className="point-list-img">
                      {room?.pointssection?.points?.map((item, index) => {
                        return (
                          <li className="point-item" key={index}>
                            <div className="point-item-content d-flex align-items-center
                             gap-2 ">
                              {item?.image && (
                                <Image
                                  src={item?.image}
                                  alt={item?.heading}
                                  width={30}
                                  height={30}
                                />
                              )}
                              <h3 className="sec-head medium-20 mb-0">
                                <span>{item?.heading}</span>
                              </h3>
                            </div>
                            <p
                              className="para mt-3"
                              dangerouslySetInnerHTML={{
                                __html: item?.description,
                              }}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  )}
              </div>
            </div>
          </section>
        )}

        {/* <HomeContact
          noTextBottom={false}
          noTextTop={true}
          noImage={true}
          privacyLine={true}
        /> */}
        <ConnectContact
          noTextBottom={false}
          noTextTop={true}
          privacyLine={true}
          noImage={true}
        />

        {room && room?.keyresourcessection && (
          <section className="section-padding pb-0">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <div
                    className="sec-head sm-head medium"
                    dangerouslySetInnerHTML={{
                      __html: room?.keyresourcessection?.heading,
                    }}
                  />
                </div>
              </div>
              <div className="row mt-4 row-gap-25">
                {room?.keyresourcessection?.images &&
                  room?.keyresourcessection?.images?.length > 0 &&
                  room?.keyresourcessection?.images?.map((item, index) => {
                    return (
                      <div className="col-lg-3 col-12" key={index}>
                        <div className="location-card text-sm"
                          style={{
                            cursor: item?.heading?.includes("Ebook") ||
                              item?.heading?.includes("Free Consultation")
                              ? "pointer"
                              : "default"
                          }}
                          onClick={() => handleFreeConsultationCardClick(item)}>
                          <div className="location-card-img">
                            {item?.image && (
                              <Image
                                src={item?.image}
                                alt={item?.heading}
                                width={500}
                                height={500}
                              />
                            )}
                          </div>
                          <div className="location-card-content">
                            <h3 className="sec-head sm-head medium">
                              {item?.heading}
                            </h3>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        )}

        <Image src={marketingIllus} className="illus-image" alt="hm-text-bg" />
      </div>

      <CommonModal show={show1} handleClose={() => setShow1(false)}>
        <div className="esc-modal-content">
          <form
            className="form-field mt-4"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <div className="row">

              {/* NAME */}
              <div className="col-lg-12">
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

              {/* PHONE */}
              <div className="col-lg-12">
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

              {/* EMAIL */}
              <div className="col-lg-12">
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

              {/* BUTTON */}
              <div className="col-lg-12">
                <button
                  className="main-btn w-100"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  <span>
                    {formik.isSubmitting ? "Submitting..." : "Submit"}
                  </span>
                </button>
              </div>

            </div>
          </form>
        </div>
      </CommonModal>
    </>
  );
};

export default page;
