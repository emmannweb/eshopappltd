import axios from 'axios';
import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL} from '../constants/productConstants'

export const listProducts = (pageNumber, keyword='') => async (dispatch) => {
    
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})
        const {data} = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
           // payload: data.products
            payload: data
        });
      
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            // payload: error.response && error.response.message.data.messsage ? error.response.data.message : error.message
            payload:  error.response.data.messsage 
        })
    
    }
}