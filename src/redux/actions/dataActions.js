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
 * @returns Recent data object
 */
export const fetchRecent =
  ({ page, perpage, pwd, returnRaw }) =>
  (dispatch) => {
    dispatch({ type: SET_RECENT_DATA, payload: {loading:true}});
    ws.get({
      action: "dataStore.getRecentPaginated",
      page: page || 0,
      perpage: perpage || 10,
      pwd: pwd || "",
      returnRaw: returnRaw || false,
    }, 3000)
      .then((data) => {
        dispatch({ type: SET_RECENT_DATA, payload: {...data, loading:false} });
      })
      .catch((err) => {
        console.error(`${err}`);
        dispatch(createSnackAlert({message:'Cannot download recen results.',type:'warning'}))
      });
  };


