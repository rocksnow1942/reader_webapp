import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import dataReducer from './reducers/dataReducer'


// can potentially read cached initial state from localStorage
const initialState = {}

const middleware = [thunk]

let reduxTool = window.__REDUX_DEVTOOLS_EXTENSION__?.()

const store = createStore(dataReducer, 
    initialState,
    reduxTool 
    ? compose(applyMiddleware(...middleware), reduxTool)
    : applyMiddleware(...middleware)
    )

export default store