import {
    SET_WS_OPEN
} from '../types'
import store from '../store';

// store.dispatch((dispatch,getState) => {
//     console.log(dispatch,getState);
//     console.log('test dispatch from store')
// })

/**
 * Handle message received from the reader.
 * @param {object} data Data object returned from reader
 * @param {string} action action string
 */
export const wsMessageHandler = (data,action)=>{
    console.log('wsMessageHandler',data,action)
    switch(action){

        default:
            console.log('wsMessageHandler',data,action);
            break
    }
}


export const wsOnOpen = ()=>{
    store.dispatch({type:SET_WS_OPEN,payload:true})
}

export const wsOnClose = (e)=>{
    console.log('wsOnClose',e)
    store.dispatch({type:SET_WS_OPEN,payload:false})
}

export const wsOnError = (err)=>{
    console.log('wsOnError',err)
}