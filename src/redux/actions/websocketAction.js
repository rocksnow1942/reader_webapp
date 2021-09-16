import {
    SET_WS_OPEN,
    SET_READER_STATUS,
    SET_SYSTEM_ID,
    SET_FIRMWARE_VERSION,
    CLEAR_READER_STATUS,
    SET_RECENT_DATA,
    SET_WIFI_STATUS
  } from "../types";

import store from "../store";
import ws from "../../util/connection";
import {createSnackAlert} from './uiAction'

/**
 * Handle message received from the reader.
 * @param {object} data Data object returned from reader
 * @param {string} action action string
 */
 export const wsMessageHandler = (data, action) => {
    switch (action) {
      case "status.reportStatus":
        store.dispatch({ type: SET_READER_STATUS, payload: data });
        break;
      default:
        console.log("message handler unhandled message", action, data);
        break;
    }
  };
  

export const getVersion = () => (dispatch) => {
ws.get({ action: "main.getVersion" }, 5000)
    .then((data) => {    
    dispatch({ type: SET_FIRMWARE_VERSION, payload: data });
    })
    .catch((err) => {
    console.error(`${err}`);
    });
};

export const getSystemID = () => (dispatch) => {
ws.get({ action: "main.getSystemID" })
    .then((data) => {
    dispatch({ type: SET_SYSTEM_ID, payload: data });
    })
    .catch((err) => {
    console.error(`${err}`);
    });
};


export const wsOnOpen = () => {
    store.dispatch({ type: SET_WS_OPEN, payload: true });
    store.dispatch(getVersion());
    store.dispatch(getSystemID());
  };
  
  export const wsOnClose = (e) => {
    store.dispatch({ type: SET_WS_OPEN, payload: false });
    store.dispatch({ type: CLEAR_READER_STATUS });
    store.dispatch(createSnackAlert({message:"App lost connection to reader", type:"warning"}))
  };
  
  export const wsOnError = (err) => {
    console.log("wsOnError", err);
  };