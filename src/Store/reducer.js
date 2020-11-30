export const initialState = {
    cart: [],
    user: null
}

export const getCartTotal = (cart) => 
 cart?.reduce((amount, item) => item.price + amount, 0)


const reducer = (state = initialState, action) => {
 switch(action.type) {
    case 'ADD_TO_CART':
        return {
            ...state,
            cart: [...state.cart, action.item]
        }
    case 'REMOVE_ITEM_FROM_CART':
        const index = state.cart.findIndex(
            (item) => item.id === action.id
        )
        let newCart = [...state.cart];
        if (index >= 0) {
            newCart.splice(index, 1)
        } else {
            alert('Cant Remove Product')
        }
        return {
            ...state,
            cart: newCart
        }
    case 'SET_USER':
        return {
            ...state,
            user: action.user
        }
    case 'EMPTY_CART':
        return {
            ...state,
            cart: []
        }
        
    default: 
       return state;
 }
}
 

export default reducer