"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGlobalContext } from "@/context/GlobalContext";
import api from "@/app/helpers/api";
import QuizResult from "./QuizResult";
import axios from "axios";

const Step3 = ({ setIsResult, setEstimatedQuote, category }) => {
  const { quoteCalculatorValues } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState(null);
  const [packageTrigger, setPackageTrigger] = useState(false);

  useEffect(() => {
    setEstimatedQuote(0);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: quoteCalculatorValues.step3.value?.name || "",
      phone: quoteCalculatorValues.step3.value?.phone || "",
      consultation: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10,15}$/, "Enter a valid phone number"),
      consultation: Yup.boolean().required("Consultation is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      // setIsResult(true);

      const sendData = {
        name: values.name,
        phone: values.phone,
        consultation: values.consultation,
        participants: quoteCalculatorValues.step1.value[1],
        category: category || "birthday",
        date: quoteCalculatorValues.step2.value
          ? (() => {
              const d = new Date(quoteCalculatorValues.step2.value);
              const day = String(d.getDate()).padStart(2, "0");
              const month = String(d.getMonth() + 1).padStart(2, "0");
              const year = d.getFullYear();
              return `${day}-${month}-${year}`;
            })()
          : "",
      };
      console.log("sendData", sendData);

      const res = await api.get(
        `/get-filtered-packages?participants=${sendData.participants}&date=${sendData.date}&name=${sendData.name}&phone=${sendData.phone}&category=${sendData.category}`
      );
      handleClickup(sendData);
      console.log("res", res);
      setPackageTrigger(true);
      setPackages(res.data);

      console.log("data res", res);
      setLoading(false);
    },
    enableReinitialize: true,
  });

  const handleClickup = async (sendData) => {
    const res = await axios.post("/api/addToClickup", JSON.stringify(sendData));
    console.log("res", res);
  };

  if (packageTrigger) {
    if (packages?.length > 0 && packages) {
      setEstimatedQuote(packages[0]?.totalAmount);
    }
    return (
      <QuizResult
        packages={packages}
        category={category}
        capacity={quoteCalculatorValues.step1.value[1]}
      />
    );
  }

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "200px" }}
      >
        <div
          className="spinner-border text-warning"
          role="status"
          aria-label="Loading"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <>
      <section className="hm-contact-sec quiz-form-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="sec-head medium">
                Enter Details to <span>Unlock Quote</span>
              </h2>
            </div>
          </div>
          <div className="row mt-5 mb-5">
            <div className="col-lg-12">
              <div className="hm-con-form-card">
                <form onSubmit={formik.handleSubmit}>
                  <div className="row align-items-center justify-content-between mt-4">
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
                              formik.touched.name && formik.errors.name
                                ? "is-invalid"
                                : ""
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
                              formik.touched.phone && formik.errors.phone
                                ? "is-invalid"
                                : ""
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
                    <div className="col-12">
                      <div className="form-group form-check mt-2">
                        <input
                          type="checkbox"
                          id="consultation"
                          name="consultation"
                          className="form-check-input"
                          checked={formik.values.consultation || false}
                          onChange={formik.handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="consultation"
                        >
                          Would you like a free consultation with a party
                          expert, with no obligation?
                        </label>
                      </div>
                    </div>
                    <div className="col-12 text-center mt-4">
                      <button type="submit" className="main-btn">
                        <span>Submit</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Step3;
