"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CommonModal } from "@/components/CommonModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ResourceCard = ({ blog }) => {

  const router = useRouter();
  const [show1, setShow1] = useState(false);

  const submitResourceForm = async (values) => {
    try {

      console.log(values);

      toast.success("Form submitted successfully");

      setShow1(false);

      setTimeout(() => {
        router.push(blog?.link);
      }, 800);

    } catch (error) {
      toast.error("Something went wrong");
    }
  };

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

  if (!blog) return null;

  return (
    <>
      {/* CARD */}
      <article
        className="blog-card"
        onClick={() => setShow1(true)}
        style={{ cursor: "pointer" }}
      >
        <div className="blog-card-img">
          {blog?.image && (
            <Image src={blog.image} width={700} height={700} alt="blog" />
          )}
        </div>

        <div className="blog-card-content">
          <p>{blog?.heading}</p>
        </div>
      </article>

      {/* MODAL */}
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

export default ResourceCard;