import React from "react";
import Image from "next/image";
import selectDrop from "@/images/select-drop.svg";

const BrochureDownloadForm = () => {
  return (
    <section className="brochure-download-form section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 className="sec-head medium">
              Get <span>Brochure</span>
            </h3>
          </div>
        </div>
        <div className="download-form-div mt-5">
          <div className="row ">
            <div className="col-lg-6 col-12">
              <div className="form-group">
                <div className="input-group">
                  <input type="text" placeholder="Name" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="form-group">
                <div className="input-group">
                  <input type="text" placeholder="Phone" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="form-group style-2">
                <label className="label-text">I’m looking for</label>
                <div className="input-group">
                  <div className="select-group">
                    <select name="" id="">
                      <option value="">Select event type</option>
                      <option value="">Select Country</option>
                      <option value="">Select Country</option>
                      <option value="">Select Country</option>
                    </select>
                    <Image src={selectDrop} alt="select" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="form-group style-2">
                <label className="label-text">For</label>
                <div className="input-group">
                  <div className="select-group">
                    <select name="" id="">
                      <option value="">Select age range</option>
                      <option value="">Select Country</option>
                      <option value="">Select Country</option>
                      <option value="">Select Country</option>
                    </select>
                    <Image src={selectDrop} alt="select" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="form-group style-2">
                <label className="label-text">Attendees Count</label>
                <div className="input-group">
                  <div className="select-group">
                    <select name="" id="">
                      <option value="">Select number of attendees</option>
                      <option value="">Select Country</option>
                      <option value="">Select Country</option>
                      <option value="">Select Country</option>
                    </select>
                    <Image src={selectDrop} alt="select" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-4">
              <button className="main-btn">
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
