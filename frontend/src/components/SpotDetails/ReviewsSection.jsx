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
  if (user) {
    userNotOwner = user.id !== currentSpot.Owner.id ? true : false;
    if (reviewsArr.length > 0) {
      userReview = reviewsArr.find((review) => review.userId === user.id);
    }
  }

  reviewsArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <div className="reviews-section">
      <div className="reviews-section-heading">
        <div className="ratingAndStar">
          <FaStar />
          <p className="avgRating"> {currentSpot.avgRating}</p>
        </div>
        {currentSpot.numReviews > 0 && <GoDotFill />}
        {currentSpot.numReviews > 0 && (
          <p className="num-ratings-middle">
            {currentSpot.numReviews}{" "}
            {currentSpot.numReviews > 1 ? "reviews" : "review"}
          </p>
        )}
      </div>
      {user && userNotOwner && !userReview && (
        <div className="">
          <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={<ReviewFormModal currentSpot={currentSpot} />}
          />
        </div>
      )}
      {user && userNotOwner && !userReview && reviewsArr.length <= 0 && (
        <p>Be the first to post a review!</p>
      )}
      {reviewsArr.length > 0 && (
        <>
          <div className="review-section-main">
            {reviewsArr.length > 0 &&
              reviewsArr.map((review) => {
                function formatDate(dateString) {
                  const date = new Date(dateString);
                  return date.toLocaleDateString("en-US", {
                    year: "numeric", //
                    month: "long", //
                    // day: "numeric", // numeric, 2-digit
                  });
                }
                const fullDate = formatDate(review.createdAt);
                return (
                  <div key={review.id}>
                    <h4>{review.User.firstName}</h4>
                    <p>{fullDate}</p>
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
