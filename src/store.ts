import { createStore, applyMiddleware, combineReducers } from 'redux'
import { appReducer } from './reducers'
import { thunk } from 'redux-thunk'
import { productReducer } from './reducers';

const reducer = combineReducers({
    product: productReducer
})

export const store = createStore(reducer, applyMiddleware(thunk))
