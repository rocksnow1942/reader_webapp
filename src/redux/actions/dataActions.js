import {
    SET_WS_OPEN,
    SET_READER_STATUS,
    SET_SYSTEM_ID,
    SET_FIRMWARE_VERSION,
} from '../types'
import store from '../store';
import ws from '../../util/connection'


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
    switch(action){
        case 'status.reportStatus':
            store.dispatch({type:SET_READER_STATUS,payload:data})
            break;
        default:            
            console.log('message handler',action,data)
            break
    }
}

export const getVersion = (dispatch,getState)=>{    
    console.time('Async get data: ', )
    ws.get({action:'main.getVersion'},5000)
    .then(data=>{
        console.timeEnd('Async get data: ', )
        dispatch({type:SET_FIRMWARE_VERSION,payload:data})
    })
    .catch(err=>{console.error(`${err}`)})
}

export const getSystemID = (dispatch,getState)=>{
    ws.get({action:'main.getSystemID'})
    .then(data=>{
        dispatch({type:SET_SYSTEM_ID,payload:data})
    })
    .catch(err=>{console.error(`${err}`)})
}

export const wsOnOpen = ()=>{
    store.dispatch({type:SET_WS_OPEN,payload:true})
    store.dispatch(getVersion)
    store.dispatch(getSystemID)
}

export const wsOnClose = (e)=>{
    console.log('wsOnClose',e)
    store.dispatch({type:SET_WS_OPEN,payload:false})
}

export const wsOnError = (err)=>{
    console.log('wsOnError',err)
}