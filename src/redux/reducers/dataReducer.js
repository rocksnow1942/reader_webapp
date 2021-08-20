import {
    SET_WS_OPEN
} from '../types'



const initialState = {
    wsOpen: false
}


export default function dataReducer(state = initialState, action) {
    const payload = action.payload
    console.log('dataRducer',payload);
    switch(action.type) {
        case SET_WS_OPEN:
            return {...state,wsOpen:payload}
        default:
            return state
    }
}