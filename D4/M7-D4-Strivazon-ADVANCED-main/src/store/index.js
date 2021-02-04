import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import cartReducer from '../reducers/cart'
import userReducer from '../reducers/user'
import thunk from 'redux-thunk'

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const initialState = {
  cart: {
    products: [],
    error: false,
  },
  user: {
    username: null,
  },
}

// WRONG
// dispatch "GET_ASYNC_DATA" --> the reducer will intercept it and will perform the fetch

// RIGHT
// get the data beforehand, and dispatch the action with the data as the payload

const bigReducer = combineReducers({ cart: cartReducer, user: userReducer })
// every sub-reducer is triggered at ANY action dispatching

export default function configureStore() {
  return createStore(bigReducer, initialState, composedEnhancer(applyMiddleware(thunk)))
}
