import {
    SET_WS_OPEN,
    SET_READER_STATUS,
    SET_SYSTEM_ID,
    SET_FIRMWARE_VERSION,
    CLEAR_READER_STATUS,
    SET_RECENT_DATA,
    SET_WIFI_STATUS,
    SET_WIFI_NETWORKS,
    FORGET_WIFI_NETWORK
} from '../types'



const initialState = {
    wsOpen: false,
    systemID: 'unknown',
    firmwareVersion: '',
    readerStatus: {
        wifi: 'ap',
        bt: 'unknown', 
        pico: 'unknown', // running
        heater: 'unknown',
        reader: "Disconnected",
        measurement: {
            remainingTime: 0,
            started: false,
            reason: null,
        },        
    },
    recentData: {
        loading: false,
        items: [],
        hasNext: true,
        hasPrev: false,
    },

    wifiStatus: {
        loading: false,
        error:false,
        ssid:"",
        mode:"", // 'ap' or 'client'
        knownNetworks: [],
        availableNetworks: [],        
    }

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
            return {...state,recentData:{...state.recentData,...payload}}
        case SET_WIFI_STATUS:
            return {...state,wifiStatus:{...state.wifiStatus,...payload}}
        case FORGET_WIFI_NETWORK:
            // remove a ssid from knwonNetworks            
            return {...state,wifiStatus:{...state.wifiStatus,
                knownNetworks:state.wifiStatus.knownNetworks.filter(n => n.ssid !== payload)}}
        case SET_WIFI_NETWORKS:
            // set wifi psk and ssid in known networks
            return {...state,wifiStatus:{...state.wifiStatus,
                knownNetworks:state.wifiStatus.knownNetworks.map(n => {
                    if (n.ssid === payload.ssid) {
                        return {...n, ...payload}
                    }
                    return n
                })}}
        default:
            return state
    }
}