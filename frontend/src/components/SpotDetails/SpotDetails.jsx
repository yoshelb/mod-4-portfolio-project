import { useParams } from "react-router-dom";
import "./spotDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { getSpotById } from "../../store/currentSpot.js";
import { FaStar } from "react-icons/fa";
import ReviewsSection from "./ReviewsSection.jsx";
import { GoDotFill } from "react-icons/go";

function SpotDetails() {
  const [previewImage, setPreviewImage] = useState("");
  const [otherImages, setOtherImages] = useState("");

  //   use this to check if a user is logged in
  //   console.log("user", user);
  const spotId = useParams().spotId;
  const dispatch = useDispatch();
  const currentSpot = useSelector((state) => state.currentSpot);
  // SET A NEW CURRENT SPOT IN STORE
  useEffect(() => {
    dispatch(getSpotById(spotId));
  }, [dispatch, spotId]);

  //   set images if spot ids match
  useEffect(() => {
    if (
      currentSpot &&
      Object.keys(currentSpot).length > 0 &&
      currentSpot.id == spotId
    ) {
      const images = [...currentSpot.SpotImages];
      const newPreview = images.find((image) => image.preview === true);
      const newImages = images.filter((image) => !image.preview);
      if (newPreview && newPreview.url !== previewImage.url) {
        setPreviewImage(newPreview);
        // console.log("PreviewIMG:", newPreview);
      }
      if (newImages.length !== otherImages.length) {
        setOtherImages(newImages);
        // console.log("Other IMg:", newImages);
      }
      // console.log("URL", previewImage.url);
    }
    // console.log("CURRENT SPOT", currentSpot.id);
  }, [currentSpot, previewImage, otherImages, spotId]); // This effect runs only when currentSpot changes

  return (
    <div className="below-nav">
      <div className="main-section-containter">
        {Object.keys(currentSpot).length > 0 && currentSpot.id == spotId ? (
          <main className="">
            <div className="title">
              <h1>{currentSpot.name}</h1>
            </div>
            <div className="location-details">
              <p>
                {currentSpot.city}, {currentSpot.state}, {currentSpot.country}
              </p>
            </div>
            {/* IMAGE GALLERY */}
            <div className="gallery-div">
              <div
                className="preview-img-div"
                style={{ backgroundImage: `url(${previewImage.url})` }}
                alt={`${currentSpot.name} photo`}
              >
                <div className="inside-img-div"></div>
              </div>
              <div className="photo-square">
                <div
                  className="other-img-div"
                  style={{ backgroundImage: `url(${otherImages[0]?.url})` }}
                  alt={`${currentSpot.name} photo`}
                ></div>
                <div
                  className="other-img-div"
                  style={{ backgroundImage: `url(${otherImages[1]?.url})` }}
                  alt={`${currentSpot.name} photo`}
                ></div>
                <div
                  className="other-img-div"
                  style={{ backgroundImage: `url(${otherImages[2]?.url})` }}
                  alt={`${currentSpot.name} photo`}
                ></div>
                <div
                  className="other-img-div"
                  style={{ backgroundImage: `url(${otherImages[3]?.url})` }}
                  alt={`${currentSpot.name} photo`}
                ></div>
              </div>
            </div>
            {/*  MIDDLE SECTION */}
            <div className="description-and-booking-section">
              <div className="description-div">
                <h3 className="hosted-by">
                  Hosted by {currentSpot.Owner.firstName}{" "}
                  {currentSpot.Owner.lastName}
                </h3>
                <p>{currentSpot.description}</p>
              </div>
              {/* bookings section */}
              <div className="bookings-div">
                <div className="top-of-bookings">
                  <h2 className="price-div">${currentSpot.price} night</h2>
                  <div className="ratingAndStar-bookings">
                    <FaStar />
                    <p className="avg-rating"> {currentSpot.avgRating}</p>
                  </div>

                  {currentSpot.numReviews > 0 && <GoDotFill />}
                  {currentSpot.numReviews > 0 && (
                    <p className="num-reviews-middle">
                      {currentSpot.numReviews}{" "}
                      {currentSpot.numReviews > 1 ? "reviews" : "review"}
                    </p>
                  )}
                </div>
                <button
                  className="booking-button"
                  onClick={() => alert("Feature Coming Soon...")}
                >
                  Reserve
                </button>
              </div>
              <ReviewsSection currentSpot={currentSpot} />
            </div>
          </main>
        ) : null}
      </div>
    </div>
  );
}

export default SpotDetails;
