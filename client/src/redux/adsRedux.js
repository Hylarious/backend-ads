import axios from "axios";
import { API_URL } from "../config";
import initialState from "./initialState";

// SELECTORS
export const getAllAds = (state) => state.ads.data;
export const getAdById = (state, id) => state.ads.data.find(ad => ad._id === id)

// ACTIONS

const reducerName = "ads";
const createActionName = (name) => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName("START_REQUEST");
const END_REQUEST = createActionName("END_REQUEST");
const ERROR_REQUEST = createActionName("ERROR_REQUEST");

export const LOAD_ADS = createActionName('LOAD_ADS');

export const startRequest = (payload) => ({ payload, type: START_REQUEST });
export const endRequest = (payload) => ({ payload, type: END_REQUEST });
export const errorRequest = (payload) => ({ payload, type: ERROR_REQUEST });

export const loadAds = payload => ({ payload, type: LOAD_ADS });

// THUNKS

export const loadAdsRequest = () => {
    return async dispatch => {
  
      dispatch(startRequest({ name: LOAD_ADS }));
      try {
  
        let res = await axios.get(`${API_URL}/ads`);
  
        dispatch(loadAds(res.data));
        dispatch(endRequest({ name: LOAD_ADS }));
  
      } catch(e) {
        dispatch(errorRequest({ name: LOAD_ADS, error: e.message }));
      }
  
    };
  };
  

 const adsReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_ADS: 
        return {
            ...statePart, data: [...action.payload]
        };
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
}

export default adsReducer