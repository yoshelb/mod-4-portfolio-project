import { useEffect } from "react";
import Stars from "./Stars";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../store/currentSpot";
import { useNavigate } from "react-router-dom";

function ReviewFormModal({ currentSpot }) {
  const [starValue, setStarValue] = useState(0);
  const [errors, setErrors] = useState(false);
  const [comment, setComment] = useState("");
  const [backendError, setBackendError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let areErrors = false;
    if (starValue <= 0) areErrors = true;
    if (comment.length < 10) areErrors = true;
    setErrors(areErrors);
  }, [starValue, comment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = {
      stars: starValue,
      review: comment,
    };
    const response = await dispatch(
      createReview({ review, spotId: currentSpot.id })
    );
    console.log("RESPONSE in submit", response);
    if (response.ok !== true) {
      console.log("response.errors", response);
      if (response.errors) {
        setBackendError(response.errors);
      } else {
        setBackendError({ error: response.statusText });
      }
    } else {
      console.log("hitting the else");
      navigate(`/spots/${currentSpot.id}`);
    }
  };

  return (
    <>
      <h1>How was your stay?</h1>
      {Object.keys(backendError).length > 0 &&
        Object.keys(backendError).map((error) => (
          <p key={error} style={{ color: "#D9193B" }} className="backend-error">
            {backendError[error]}
          </p>
        ))}
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          rows={5}
          cols={50}
          placeholder="Leave your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="starsDiv">
          <Stars setStarValue={setStarValue} starValue={starValue} />
        </div>
        <button type="submit" disabled={errors ? true : false}>
          Submit Your Review
        </button>
      </form>
    </>
  );
}

export default ReviewFormModal;
