import {
    SET_WS_OPEN,
    SET_READER_STATUS,
    SET_SYSTEM_ID,
    SET_FIRMWARE_VERSION,
    CLEAR_READER_STATUS,
    SET_RECENT_DATA
} from '../types'



const initialState = {
    wsOpen: false,
    systemID: 'unknown',
    firmwareVersion: '',
    readerStatus: {
        wifi: 'ap',
        bt: 'unknown',
        pico: 'unknown',
        heater: 'unknown',
        measurement: {
            remainingTime: 0,
            started: false,
            reason: null,
        },        
    },
    recentData: {
        items: [],
        hasNext: true,
        hasPrev: false,
    },

}


export default function dataReducer(state = initialState, action) {
    const payload = action.payload    
    switch(action.type) {
        case SET_WS_OPEN:
            return {...state,wsOpen:payload}
        case CLEAR_READER_STATUS:
            return {...state, readerStatus: initialState.readerStatus}
        case SET_READER_STATUS:
            return {...state,readerStatus:payload}
        case SET_SYSTEM_ID:
            return {...state,systemID:payload}
        case SET_FIRMWARE_VERSION:
            return {...state,firmwareVersion:payload}
        case SET_RECENT_DATA:
            return {...state,recentData:payload}        
        default:
            return state
    }
}