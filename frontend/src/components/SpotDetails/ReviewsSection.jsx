import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";

import ReviewFormModal from "../../ReviewFormModal/ReviewFormModal";

// ORDER SPOTS BY CREATION DATE

function ReviewsSection({ currentSpot }) {
  const user = useSelector((state) => state.session).user;

  const reviewsArr = Object.values(currentSpot.Reviews);
  let userNotOwner;
  let userReview;
  if (user && reviewsArr.length > 0) {
    userNotOwner = user.id !== currentSpot.Owner.id ? true : false;
    userReview = reviewsArr.find((review) => review.userId === user.id);
  }

  console.log("Reviews Arr", reviewsArr);
  reviewsArr.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  return (
    <div className="reviews-section">
      <div className="reviews-section-heading">
        <div className="ratingAndStar">
          <FaStar />
          <p className="avgRating"> {currentSpot.avgRating}</p>
        </div>
        {user && userNotOwner && !userReview && (
          <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={<ReviewFormModal currentSpot={currentSpot} />}
          />
        )}
        {currentSpot.numReviews > 0 && <GoDotFill />}
        {currentSpot.numReviews > 0 && (
          <p className="num-ratings-middle">
            {currentSpot.numReviews}{" "}
            {currentSpot.numReviews > 1 ? "reviews" : "review"}
          </p>
        )}
      </div>
      {reviewsArr.length > 0 &&
        reviewsArr.every((review) => review.User.firstName) && (
          <>
            <div className="review-section-main">
              {reviewsArr.length > 0 &&
                reviewsArr.map((review) => {
                  return (
                    <div key={review.id}>
                      <h4>{review.User.firstName}</h4>
                      <p>{review.createdAt.split(" ")[0]}</p>
                      <p>{review.review}</p>
                    </div>
                  );
                })}
              {userNotOwner && currentSpot.numReviews <= 0 && (
                <p>Be the first to post a review!</p>
              )}
            </div>
          </>
        )}
    </div>
  );
}

export default ReviewsSection;
