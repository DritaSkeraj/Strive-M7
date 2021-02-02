import { createStore } from 'redux'
import { mainReducer } from '../reducers'

export const initialState = {
  count: 0,
  mickey: 'mouse',
  strive: 'School',
}

const configureStore = () =>
  createStore(mainReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default configureStore

// configureStore will need 3 parameters:

// 1) the main reducer
// 2) the initial state of the application
// 3) enhancer -> we'll use this for allowing our devTools