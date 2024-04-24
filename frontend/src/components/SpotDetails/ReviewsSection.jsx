import { FaStar } from "react-icons/fa";

function ReviewsSection({ currentSpot }) {
  const reviewsArr = Object.values(currentSpot.Reviews);
  console.log("Reviews type", Array.isArray(currentSpot.Reviews));
  return (
    <div className="reviews-section">
      <div className="reviews-section-heading">
        <div className="ratingAndStar">
          <FaStar />
          <p className="avgRating"> {currentSpot.avgRating}</p>
        </div>
        <p className="num-ratings-middle">{currentSpot.numReviews} reviews</p>
      </div>
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
      </div>
    </div>
  );
}

export default ReviewsSection;
