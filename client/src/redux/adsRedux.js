import axios from "axios";
import { API_URL } from "../config";
import initialState from "./initialState";

// SELECTORS
export const getAllAds = (state) => state.ads.data;
export const getAdById = (state, id) =>
  state.ads.data.find((ad) => ad._id === id);

// ACTIONS

const reducerName = "ads";
const createActionName = (name) => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName("START_REQUEST");
const END_REQUEST = createActionName("END_REQUEST");
const ERROR_REQUEST = createActionName("ERROR_REQUEST");

export const LOAD_ADS = createActionName("LOAD_ADS");
export const ADD_AD = createActionName("ADD_AD");
export const EDIT_AD = createActionName("EDIT_AD");
export const DELETE_AD = createActionName("DELETE_AD");

export const startRequest = (payload) => ({ payload, type: START_REQUEST });
export const endRequest = (payload) => ({ payload, type: END_REQUEST });
export const errorRequest = (payload) => ({ payload, type: ERROR_REQUEST });

export const loadAds = (payload) => ({ payload, type: LOAD_ADS });
export const addAd = (payload) => ({ payload, type: ADD_AD });
export const editAd = (payload) => ({ payload, type: EDIT_AD });
export const deleteAd = (payload) => ({ payload, type: DELETE_AD });

// THUNKS

export const loadAdsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest({ name: LOAD_ADS }));
    try {
      let res = await axios.get(`${API_URL}/ads`);

      dispatch(loadAds(res.data));
      dispatch(endRequest({ name: LOAD_ADS }));
    } catch (e) {
      dispatch(errorRequest({ name: LOAD_ADS, error: e.message }));
    }
  };
};

export const addAdRequest = (data) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: ADD_AD }));
    try {
      console.log(data);
      let res = await axios.post(`${API_URL}/ads`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(addAd(res.data));
      dispatch(loadAdsRequest());
      dispatch(endRequest({ name: ADD_AD }));
    } catch (e) {
      dispatch(errorRequest({ name: ADD_AD, error: e.message }));
    }
  };
};

export const editAdRequest = (data, id) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: EDIT_AD }));
    try {
      let res = await axios.put(`${API_URL}/ads/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(editAd(res.data));
      dispatch(loadAdsRequest());
      dispatch(endRequest({ name: EDIT_AD }));
    } catch (e) {
      dispatch(errorRequest({ name: EDIT_AD, error: e.message }));
    }
  };
};

export const deleteAdRequest = (id) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: DELETE_AD }));
    try {
      let res = await axios.delete(`${API_URL}/ads/${id}`);
      dispatch(deleteAd(id));
      dispatch(endRequest({ name: DELETE_AD }));
    } catch (e) {
      dispatch(errorRequest({ name: DELETE_AD, error: e.message }));
    }
  };
};

const adsReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_ADS:
      return {
        ...statePart,
        data: [...action.payload],
      };
    case ADD_AD:
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
      };
    case EDIT_AD:
      return {
        ...statePart,
        data: statePart.data.map((ad) =>
          ad.id === action.payload._id ? { ...ad, ...action.payload } : ad
        ),
      };
      case DELETE_AD: 
      return {
        ...statePart, 
        data: statePart.data.filter(ad => ad._id !== action.payload)
      }
    case START_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: { pending: true, error: null, success: false },
        },
      };
    case END_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: { pending: false, error: null, success: true },
        },
      };
    case ERROR_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: {
            pending: false,
            error: action.payload.message,
            success: false,
          },
        },
      };

    default:
      return statePart;
  }
};

export default adsReducer;
