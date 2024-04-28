import { csrfFetch } from "./csrf.js";

const SET_USER_SPOTS = "userSpots/setUserSpots";
const REMOVE_SPOT = "userSpots/delete";

export const setUserSpots = (spots) => ({
  type: SET_USER_SPOTS,
  spots,
});

export const removeSpot = (spotId) => ({
  type: REMOVE_SPOT,
  spotId,
});

export const getUserSpots = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/spots/current");
    if (response.ok) {
      const spots = await response.json();
      console.log("SPOTS-------", spots);
      dispatch(setUserSpots(spots));
    }
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
  try {
    console.log("SPOTID inside thunk", spotId);
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: "DELETE",
    });

    const message = await response.json();
    if (!response.ok) {
      throw message;
    }
    await dispatch(removeSpot(spotId));
    await dispatch(getUserSpots());
    return message;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

function userSpotReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER_SPOTS: {
      const spotsState = {};
      // console.log("ACTION SPOTS---------", action.spots.Spots);
      action.spots.Spots.forEach((spot) => {
        spotsState[spot.id] = spot;
      });
      return spotsState;
    }
    case removeSpot: {
      const currentState = { ...state };
      console.log("CURRENT STATE WITH", currentState);
      delete currentState[action.spotId];
      console.log("CURRENT STATE WITHOUT", currentState);
      return currentState;
    }
    default:
      return state;
  }
}
export default userSpotReducer;
