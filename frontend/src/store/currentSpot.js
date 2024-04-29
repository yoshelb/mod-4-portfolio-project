// import spot from "../../../backend/db/models/spot.js";
import { csrfFetch } from "./csrf.js";
import { getAllSpots } from "./spots.js";

const SET_CURRENT_SPOT = "currentSpot/setCurrentSpot";
const ADD_REVIEW = "currentSpot/addReview";
const REMOVE_REVIEW = "currentSpot/removeReview";

export const setCurrentSpot = (spot) => ({
  type: SET_CURRENT_SPOT,
  spot,
});

export const addReview = (review) => ({
  type: ADD_REVIEW,
  review,
});

export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId,
});

export const getSpotById = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const reviewsResponse = await csrfFetch(`/api/spots/${spotId}/reviews`);

    const spot = await response.json();

    if (!response.ok) {
      throw spot;
    }

    const reviews = await reviewsResponse.json();

    if (!reviewsResponse.ok) {
      throw reviews;
    }

    const newSpot = {
      ...spot,
      ...reviews,
    };

    dispatch(setCurrentSpot(newSpot));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const updateSpot =
  ({ payload, spotId }) =>
  async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload.newSpot),
    });
    console.log("response INSIDE UPDATE", response);
    if (response.ok) {
      const newSpot = await response.json();
      console.log("newSpot", newSpot);
      await dispatch(getSpotById(newSpot.id));
      await dispatch(getAllSpots());
      return newSpot;
    } else {
      console.log("BAD REQUEST");
    }
  };

export const createReview =
  ({ review, spotId }) =>
  async (dispatch) => {
    console.log("REVIEW INSIDE CREATE", review);
    console.log("SPOTID", spotId);

    try {
      const reviewsResponse = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      const newReview = await reviewsResponse.json();

      if (!reviewsResponse.ok) {
        throw newReview;
      }

      const fullReviewsResponse = await csrfFetch(
        `/api/spots/${spotId}/reviews`
      );

      const fullReviews = await fullReviewsResponse.json();

      if (!fullReviewsResponse.ok) {
        throw fullReviews;
      }
      console.log("fulleviews", fullReviews);

      if (fullReviews) {
        const fullReview = fullReviews.Reviews.find(
          (review) => review.id === newReview.id
        );
        console.log("FULL REVIEW", fullReview);
        dispatch(
          addReview({
            ...fullReview,
          })
        );
      }

      return reviewsResponse;
    } catch (e) {
      // console.log("E IN CURREN SPOT", e);
      console.log(e);
      throw e;
    }
  };

export const deleteReview =
  ({ reviewId }) =>
  async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
      });
      const message = await response.json();
      if (!response.ok) {
        throw message;
      }
      await dispatch(removeReview(reviewId));
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

function currentSpotReducer(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_SPOT: {
      return action.spot;
    }
    case ADD_REVIEW: {
      const reviewAddedToSpot = { ...state };
      reviewAddedToSpot.Reviews[action.review.id] = action.review;
      return reviewAddedToSpot;
    }
    case REMOVE_REVIEW: {
      const currentSpot = { ...state };
      const withoutReview = currentSpot.Reviews.filter(
        (review) => review.id !== action.reviewId
      );
      currentSpot.Reviews = withoutReview;
      return currentSpot;
    }

    default:
      return state;
  }
}
export default currentSpotReducer;
