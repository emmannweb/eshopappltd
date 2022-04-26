import {ADD_TO_CART, REMOVE_TO_CART, SAVE_SHIPPING_ADDRESS, CART_EMPTY, CLEAR_SHIPPING_ADDRESS} from '../constants/cartConstants'

export const cartReducer = (state={cartItems: []}, action) =>{
    switch (action.type){
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find(i=>i.product === item.product);
            if (isItemExist){
                 return{
                    ...state,
                    cartItems: state.cartItems.map(i=>i.product === isItemExist.product ? item : i)
                 }


            } else {
                return {
                    ...state,
                     cartItems: [...state.cartItems, item]
                }
            }

        case REMOVE_TO_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i =>i.product !== action.payload)
            }


        case SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }

        case CLEAR_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: {},
            }
            
        case CART_EMPTY:
            return {
                ...state,
                cartItems: [],
            }
          
       default:
           return state;
    }

}