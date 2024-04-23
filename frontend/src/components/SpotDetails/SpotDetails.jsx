import { useParams } from "react-router-dom";
import "./spotDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { getSpotById } from "../../store/currentSpot.js";

function SpotDetails() {
  const [previewImage, setPreviewImage] = useState("");
  const [otherImages, setOtherImages] = useState("");
  //   const user = useSelector((state) => state.session).user;
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
        console.log("PreviewIMG", newPreview);
      }
      if (newImages.length !== otherImages.length) {
        setOtherImages(newImages);
        console.log("Other IMg", otherImages);
      }
      console.log("URL", previewImage.url);
    }
    console.log("CURRENT SPOT", currentSpot.id);
  }, [currentSpot, previewImage, otherImages, spotId]); // This effect runs only when currentSpot changes

  return (
    <div className="below-nav">
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
            ></div>
            <div className="photo-square">
              <div
                className="other-img-div"
                style={{ backgroundImage: `url(${otherImages[0]?.url})` }}
                alt={`${currentSpot.name} photo`}
              ></div>
              <div
                className="other-img-div"
                style={{ backgroundImage: `url(${previewImage[1]?.url})` }}
                alt={`${currentSpot.name} photo`}
              ></div>
              <div
                className="other-img-div"
                style={{ backgroundImage: `url(${previewImage[2]?.url})` }}
                alt={`${currentSpot.name} photo`}
              ></div>
              <div
                className="other-img-div"
                style={{ backgroundImage: `url(${previewImage[3]?.url})` }}
                alt={`${currentSpot.name} photo`}
              ></div>
            </div>
          </div>
        </main>
      ) : null}
    </div>
  );
}

export default SpotDetails;
