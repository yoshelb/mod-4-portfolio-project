// import spot from "../../../backend/db/models/spot.js";
import { csrfFetch } from "./csrf.js";

const SET_CURRENT_SPOT = "currentSpot/setCurrentSpot";
const ADD_REVIEW = "currentSpot/addReview";

export const setCurrentSpot = (spot) => ({
  type: SET_CURRENT_SPOT,
  spot,
});

export const addReview = (review) => ({
  type: ADD_REVIEW,
  review,
});

export const getSpotById = (spotId) => async (dispatch) => {
  // console.log("payload", spotId);
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const reviewsResponse = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const spot = await response.json();
    let reviews;
    if (reviewsResponse.ok) {
      reviews = await reviewsResponse.json();
    }
    const newSpot = {
      ...spot,
      ...reviews,
    };
    // console.log("REVIEWS PLUS SPOT", newSpot);
    dispatch(setCurrentSpot(newSpot));
  } else {
    return response;
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
      if (reviewsResponse.ok) {
        const review = await reviewsResponse.json();
        dispatch(addReview(review));
        return { ok: true };
      }
    } catch (e) {
      // console.log("E IN CURREN SPOT", e);
      const error = await e.json();
      return error;
    }
  };

function currentSpotReducer(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_SPOT: {
      return action.spot;
    }
    case ADD_REVIEW: {
      const reviewAddedToSpot = { ...state };
      reviewAddedToSpot.Reviews[action.review.id] = action.review.id;
      return reviewAddedToSpot;
    }

    default:
      return state;
  }
}
export default currentSpotReducer;
