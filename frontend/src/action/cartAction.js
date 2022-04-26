import { ADD_TO_CART, REMOVE_TO_CART, SAVE_SHIPPING_ADDRESS, CLEAR_SHIPPING_ADDRESS} from '../constants/cartConstants'
import React from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

export const addItemToCart = (id, quantity) => async (dispatch, getState) =>{

    const {data} = await axios.get(`/api/product/${id}`);
    //console.log("datacarAction", data)
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.avatar,
            countStock: data.product.countStock,
            quantity

        }
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    //toast.success("Added successfully");
}


//remove item in the cart
export const removeToCart = (id) => async (dispatch, getState) =>{
    //console.log("datacarAction", data)
    dispatch({
        type: REMOVE_TO_CART,
        payload: id
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    toast.success("Removed successfully from cart");

}


// save shipping
export const saveShippingAddress = (data) => async (dispatch) =>{

    dispatch({
        type: SAVE_SHIPPING_ADDRESS,
        payload: data 
    }) 

    localStorage.setItem("shippingAddress", JSON.stringify(data));

}

// clear shipping address
export const clearShippingAddress = (data) => async (dispatch) =>{

    dispatch({
        type: CLEAR_SHIPPING_ADDRESS,
        payload: {} 
    }) 

    localStorage.removeItem("shippingAddress");

}