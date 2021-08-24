import {
  SET_WS_OPEN,
  SET_READER_STATUS,
  SET_SYSTEM_ID,
  SET_FIRMWARE_VERSION,
  CLEAR_READER_STATUS,
  SET_RECENT_DATA,
} from "../types";
import store from "../store";
import ws from "../../util/connection";

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
      console.log("message handler", action, data);
      break;
  }
};

export const wsOnOpen = () => {
  store.dispatch({ type: SET_WS_OPEN, payload: true });
  store.dispatch(getVersion());
  store.dispatch(getSystemID());
};

export const wsOnClose = (e) => {
  store.dispatch({ type: SET_WS_OPEN, payload: false });
  store.dispatch({ type: CLEAR_READER_STATUS });
};

export const wsOnError = (err) => {
  console.log("wsOnError", err);
};

export const getVersion = () => (dispatch) => {
  console.time("Async get data: ");
  ws.get({ action: "main.getVersion" }, 5000)
    .then((data) => {
      console.timeEnd("Async get data: ");
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

/** 
 * @returns Recent data object
 */
export const fetchRecent =
  ({ page, perpage, pwd, returnRaw }) =>
  (dispatch) => {
    ws.get({
      action: "dataStore.getRecentPaginated",
      page: page || 0,
      perpage: perpage || 10,
      pwd: pwd || "",
      returnRaw: returnRaw || false,
    })
      .then((data) => {
        dispatch({ type: "SET_RECENT_DATA", payload: data });
      })
      .catch((err) => {
        console.error(`${err}`);
      });
  };
