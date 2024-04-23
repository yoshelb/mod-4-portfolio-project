import { csrfFetch } from "./csrf.js";

const SET_CURRENT_SPOT = "spots/setCurrentSpot";

export const setCurrentSpot = (spot) => ({
  type: SET_CURRENT_SPOT,
  spot,
});

export const getSpotById = (spotId) => async (dispatch) => {
  console.log("payload", spotId);
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(setCurrentSpot(spot));
  } else {
    return response;
  }
};

function currentSpotReducer(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_SPOT: {
      return action.spot;
    }

    default:
      return state;
  }
}
export default currentSpotReducer;
