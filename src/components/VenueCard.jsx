import React, { useState } from "react";
import Image from "next/image";
import venueImg from "@/images/venue.jpg";
import rupeeIcon from "@/images/rupee-icon.svg";
import strokeStarIcon from "@/images/stroke-star-icon.svg";
import publicIcon from "@/images/public-icon.svg";
import { Modal, Button } from "react-bootstrap";
import VenueInner from "./VenueInner";
import { useRouter } from "next/navigation";

const VenueCard = ({ venue, setSelectedVenue, selectedVenue, clickable }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  console.log("venue", venue);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const handleShow = () => {
    if (clickable) {
      setSelectedVenue(venue);
      return;
    }
    router.push(`/resources/venue/${venue?.slug}`);
  };

  return (
    <>
      <article
        className={`venue-card ${
          clickable && selectedVenue?.id === venue?.id ? "selected" : ""
        }`}
        onClick={handleShow}
      >
        <div className="venue-card-img">
          {venue.image && (
            <Image
              src={venue.image}
              alt="venue-card-img"
              width={300}
              height={300}
            />
          )}
        </div>
        <div className="venue-card-content">
          <h3 className="venue-card-title">{venue?.name}</h3>
          <div className="venue-card-info">
            <div className="venue-card-info-item">
              <Image src={rupeeIcon} alt="location-icon" />
              <span>{venue?.price}</span>
            </div>
            <div className="venue-card-info-item">
              <Image src={strokeStarIcon} alt="location-icon" />
              <span>{venue?.rating}</span>
            </div>
            <div className="venue-card-info-item">
              <Image src={publicIcon} alt="location-icon" />
              <span>{venue?.capacity}</span>
            </div>
          </div>
        </div>
      </article>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        className="venue-modal"
        centered
      >
        <Modal.Body>
          <VenueInner handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VenueCard;
