
const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return ({ ...state, cart: [] })
  }
  if (action.type === 'REMOVE') {
    return {
      ...state, cart: state.cart.filter(cartItem => {
      return cartItem.id !== action.payload
    })}
  }

  if (action.type === 'INCREASE') {
    return ({
      ...state, cart: state.cart.map(cartItem => {
        if (action.payload === cartItem.id) {
          return { ...cartItem, amount: cartItem.amount + 1 }
        }
        return cartItem
      })
    })
  }

  if (action.type === 'DECREASE') {
    return ({
      ...state, cart: state.cart.map(cartItem => {
        if (action.payload === cartItem.id) {
          return { ...cartItem, amount: cartItem.amount - 1 }
        }
        return cartItem
      }).filter(cartItem=> cartItem.amount !==0)
    })
  }
  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce((cartTotal, cartItem)=>{
      return { ...cartTotal,  total : cartTotal.total + cartItem.price * cartItem.amount, amount: cartTotal.amount + cartItem.amount }
    }, { total: 0, amount: 0 })
    total = parseFloat(total.toFixed(2))
    return {...state, total, amount}
  }
  if (action.type === 'LOADING') {
    return {...state, loading: true}
  }
  if (action.type === 'DISPLAY_ITEMS') {
    return {
      ...state, cart: action.payload, loading: false
    }
  }
}
export default reducer