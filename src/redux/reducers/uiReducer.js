import {
    SET_WS_OPEN,
    SET_READER_STATUS,
    SET_SYSTEM_ID,
    SET_FIRMWARE_VERSION,
    SET_CONFIRM_DIALOG,
} from '../types'



const initialState = {
    loading:false,
    confirmDialog: {
        open: false,
        title: '',
        message: '',
        onConfirm: () => {},
        onCancel: () => {},        
    }
    
}


export default function uiReducer(state = initialState, action) {
    const payload = action.payload    
    switch(action.type) {
        case SET_CONFIRM_DIALOG:
            return {...state, confirmDialog: {...state.confirmDialog, ...payload}}
        default:
            return state
    }
}