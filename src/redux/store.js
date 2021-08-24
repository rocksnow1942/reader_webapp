import {createStore, applyMiddleware, compose,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import dataReducer from './reducers/dataReducer'
import uiReducer from './reducers/uiReducer'




// can potentially read cached initial state from localStorage
const initialState = {}

const middleware = [thunk]

const reducers = combineReducers({
    data: dataReducer,
    ui:uiReducer,
})


let reduxTool = window.__REDUX_DEVTOOLS_EXTENSION__?.()

const store = createStore(reducers, 
    initialState,
    reduxTool 
    ? compose(applyMiddleware(...middleware), reduxTool)
    : applyMiddleware(...middleware)
)


export default store
