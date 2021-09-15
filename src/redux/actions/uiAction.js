import {
    SET_WS_OPEN,
    SET_READER_STATUS,
    SET_SYSTEM_ID,
    SET_FIRMWARE_VERSION,
    SET_CONFIRM_DIALOG,
} from '../types'


export const setConfirmDialog = (payload)=>(dispatch)=>{
    dispatch({
        type: SET_CONFIRM_DIALOG,
        payload
    })
}