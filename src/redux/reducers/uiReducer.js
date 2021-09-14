import {
    SET_WS_OPEN,
    SET_READER_STATUS,
    SET_SYSTEM_ID,
    SET_FIRMWARE_VERSION,
} from '../types'



const initialState = {
    loading:false,
    
}


export default function uiReducer(state = initialState, action) {
    const payload = action.payload    
    switch(action.type) {

        default:
            return state
    }
}