import { useEffect } from "react";
import Stars from "./Stars";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../store/currentSpot";
import { useNavigate } from "react-router-dom";
import { useModal } from "../context/Modal";

function ReviewFormModal({ currentSpot }) {
  const [starValue, setStarValue] = useState(0);
  const [errors, setErrors] = useState(false);
  const [comment, setComment] = useState("");
  const [backendError, setBackendError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  useEffect(() => {
    let areErrors = false;
    if (starValue <= 0) areErrors = true;
    if (comment.length < 10) areErrors = true;
    setErrors(areErrors);
  }, [starValue, comment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const review = {
      stars: starValue,
      review: comment,
    };
    return dispatch(createReview({ review, spotId: currentSpot.id }))
      .then(() => {
        console.log("Default user login successful, closing modal");
        navigate(`/spots/${currentSpot.id}`);
        closeModal();
      })
      .catch(async (res) => {
        console.log("catching and error", res);
        const data = await res.json();
        if (data && data.errors) {
          setBackendError(data.errors);
        }
      });
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
