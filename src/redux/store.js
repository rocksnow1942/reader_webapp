import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import dataReducer from './reducers/dataReducer'
import MyWebSocket from '../util/connection'
import {wsMessageHandler,wsOnOpen,wsOnError,wsOnClose} from './actions/dataActions'


const websocket = new MyWebSocket(
    wsOnOpen,    
    wsOnClose, 
    wsOnError,
    wsMessageHandler,    
)


// can potentially read cached initial state from localStorage
const initialState = {ws:websocket}


const middleware = [thunk]

let reduxTool = window.__REDUX_DEVTOOLS_EXTENSION__?.()

const store = createStore(dataReducer, 
    initialState,
    reduxTool 
    ? compose(applyMiddleware(...middleware), reduxTool)
    : applyMiddleware(...middleware)
    )



export default store