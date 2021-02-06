export default function (state = {}, action) {
  switch (action.type) {
    case 'ADD_ITEM_TO_CART':
      console.log('add to cart state:::::::', state)
      return {
        ...state,
        products: state.products.concat(action.payload),
      }
    case 'REMOVE_ITEM_FROM_CART':
      return {
        ...state,
        products: [...state.products.filter((bookId) => bookId !== action.payload)],
      }

    default:
      return state
  }
}
