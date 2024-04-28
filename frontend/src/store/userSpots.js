import { csrfFetch } from "./csrf.js";

const SET_USER_SPOTS = "spots/setUserSpots";

export const setUserSpots = (spots) => ({
  type: SET_USER_SPOTS,
  spots,
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
    default:
      return state;
  }
}
export default userSpotReducer;
