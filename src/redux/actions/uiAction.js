import {
    SET_WS_OPEN,
    SET_READER_STATUS,
    SET_SYSTEM_ID,
    SET_FIRMWARE_VERSION,
    SET_CONFIRM_DIALOG,
    SET_SNACK_ALERT,
    REMOVE_SNACK_ALERT
} from '../types'


export const setConfirmDialog = (payload)=>(dispatch)=>{
    dispatch({
        type: SET_CONFIRM_DIALOG,
        payload
    })
}

export const createSnackAlert = (payload)=>(dispatch)=>{
    dispatch({
        type: SET_SNACK_ALERT,
        payload:{...payload, id: Date.now()}
    })
}

export const closeSnackAlert = (id)=>(dispatch)=>{
    dispatch({
        type: REMOVE_SNACK_ALERT,
        payload: id
    })
}

