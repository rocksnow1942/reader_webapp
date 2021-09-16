import {
    SET_WS_OPEN,
    SET_READER_STATUS,
    SET_SYSTEM_ID,
    SET_FIRMWARE_VERSION,
    SET_CONFIRM_DIALOG,
    REMOVE_SNACK_ALERT,
    SET_SNACK_ALERT,
} from '../types'



const initialState = {
    loading:false,
    confirmDialog: {
        open: false,
        title: '',
        message: '',
        onConfirm: () => {},
        onCancel: () => {},        
    },

    //store snack bars.
    // each snack bar is an object with the following properties:
    // - id: unique identifier for the snack bar (use Date.now())
    // - message: the message to display
    // - type: the type of snack bar (success, error, warning, info)
    // - autoHideDuration: the duration in ms to display the snack bar
    // - onClose: the function to call when the snack bar is closed    
    snackbar: [],
}


export default function uiReducer(state = initialState, action) {
    const payload = action.payload    
    switch(action.type) {
        case SET_SNACK_ALERT:
            // add a new snack bar to the top of the snackbar array
            // if the snack bar array is too long, remove the last element to
            // keep max of 5 snack bars            
            return {...state,snackbar: [payload, ...state.snackbar.slice(0,4)]}
        case REMOVE_SNACK_ALERT:
            return {...state,snackbar: state.snackbar.filter(snack => snack.id !== payload)}
        case SET_CONFIRM_DIALOG:
            return {...state, confirmDialog: {...state.confirmDialog, ...payload}}
        default:
            return state
    }
}