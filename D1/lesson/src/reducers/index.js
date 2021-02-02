import { initialState } from '../store'

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        // mickey: state.mickey,
        // strive: state.strive,
        count: state.count + 1,
      }

    case 'DECREMENT':
      return {
        ...state,
        // mickey: state.mickey,
        // strive: state.strive,
        count: state.count - 1,
      }

    case 'CHANGE_NAME':
      return {
        ...state,
        mickey: action.payload,
      }

    default:
      return state
  }
}