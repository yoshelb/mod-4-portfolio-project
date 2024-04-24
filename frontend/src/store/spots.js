import { csrfFetch } from "./csrf.js";

const SET_ALL_SPOTS = "spots/getAllSpots";
const ADD_SPOT = "spots/addSpot";
export const setAllSpots = (spots) => ({
  type: SET_ALL_SPOTS,
  spots,
});

export const addSpot = (spot) => ({
  type: ADD_SPOT,
  spot,
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

export const createSpot = (newSpot) => async (dispatch) => {
  console.log("NEW SPOT", newSpot);
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    "Content-Type": "application/json",
    body: newSpot,
  });
  if (response.ok) {
    const newSpot = response.json();
    dispatch(addSpot(newSpot));
    return newSpot;
  } else {
    console.log("BAD REQUEST");
  }
};

const initialState = { spots: {} };

function spotsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_SPOTS: {
      const spotsState = {};
      // console.log("ACTION SPOTS---------", action.spots.Spots);
      action.spots.Spots.forEach((spot) => {
        spotsState[spot.id] = spot;
      });
      return spotsState;
    }
    case ADD_SPOT: {
      state[action.spot] = action.spot;
    }

    default:
      return state;
  }
}
export default spotsReducer;
