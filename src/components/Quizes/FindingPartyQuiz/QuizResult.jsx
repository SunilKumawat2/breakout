import React from "react";
import VenueCard from "@/components/VenueCard";

const QuizResult = ({ venues }) => {
  const handlerefresh = () => {
    window.location.reload();
  };
  return (
    <section className="venue-res-sec">
      <div
        className="tp-ven mb-5"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 className="sec-head medium">
          <span>Party Venues</span> For You
        </h3>
        <button className="main-btn sm" onClick={handlerefresh}>
          <span>Retake Quiz</span>
        </button>
      </div>
      <div className="row row-gap-25">
        {venues && venues.length > 0 ? (
          venues.map((venue, index) => (
            <div className="col-lg-3 col-12" key={index}>
              <VenueCard venue={venue} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p className="sec-head medium-20 text-center">
              No venues found for your search
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuizResult;
