import { csrfFetch } from "./csrf.js";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

export const login =
  ({ credential, password }) =>
  async (dispatch) => {
    try {
      const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({ credential, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw data;
      }
      dispatch(setUser(data.user));
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  try {
    const { username, firstName, lastName, email, password } = user;
    console.log("INSIDE OF THUNK");
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });
    console.log("beforejson:", response);

    const data = await response.json();
    console.log("afterjson:", data);

    if (!response.ok) {
      console.log("error data:", data);
      throw data;
    }
    dispatch(setUser(data.user));
    return data;
  } catch (e) {
    console.log("ERROR INSIDE CATCH", e);
    throw e;
  }
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;
