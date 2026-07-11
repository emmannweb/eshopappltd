import { ORDER_FAIL, ORDER_REQUEST, ORDER_RESET, ORDER_SUCCESS } from "../constants/orderConstants"

export const OrderReducer = (state = {}, action) =>{
    switch (action.type){
        case ORDER_REQUEST:
            return {
                loading: true
            }
            
        case ORDER_SUCCESS:
            return {    
                loading: false,
                payload: action.payload
            }

        case ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_RESET:
            return {}


        default: return state
    }


}