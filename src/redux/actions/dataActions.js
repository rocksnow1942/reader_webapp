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
        dispatch({ type: SET_RECENT_DATA, payload: data });
      })
      .catch((err) => {
        console.error(`${err}`);
      });
  };


