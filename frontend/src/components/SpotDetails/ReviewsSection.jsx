import { FaStar } from "react-icons/fa";

function ReviewsSection({ currentSpot }) {
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
        {currentSpot.reviews > 0 &&
          currentSpot.reviews.map((review) => {
            return (
              <div key={review.id}>
                <h4>{review.createdAt}</h4>
                <p>{review.review}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ReviewsSection;
