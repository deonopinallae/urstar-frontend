import { createStore, applyMiddleware, combineReducers } from 'redux'
import { appReducer, productReducer, productsReducer, userReducer } from './reducers'
import { thunk } from 'redux-thunk'

const reducer = combineReducers({
    app: appReducer,
    product: productReducer,
    products: productsReducer,
    user: userReducer
})

export const store = createStore(reducer, applyMiddleware(thunk))
