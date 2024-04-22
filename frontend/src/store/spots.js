import { csrfFetch } from "./csrf.js";

const SET_ALL_SPOTS = "spots/getAllSpots";

export const setAllSpots = (spots) => ({
  type: SET_ALL_SPOTS,
  spots,
});

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  // console.log("CALLING GET ALL SPOTS");
  // console.log("RESPONSE", response);
  if (response.ok) {
    const spots = await response.json();
    // console.log("SPOTS-------", spots);
    dispatch(setAllSpots(spots));
  } else {
    console.log("RESPONSE error", response);
  }
};

const initialState = { spots: {} };

function spotsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_SPOTS: {
      const spotsState = {};
      console.log("ACTION SPOTS---------", action.spots.Spots);
      action.spots.Spots.forEach((spot) => {
        spotsState[spot.id] = spot;
      });
      return spotsState;
    }

    default:
      return state;
  }
}
export default spotsReducer;
