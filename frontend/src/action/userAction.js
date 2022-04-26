import axios from 'axios'
import { toast } from "react-toastify";
import { CART_EMPTY, CLEAR_SHIPPING_ADDRESS} from '../constants/cartConstants';
import {LOGIN_REQUEST,
       LOGIN_SUCCESS,
       LOGIN_FAIL,
       LOAD_USER_REQUEST,
       LOAD_USER_SUCCESS,
       LOAD_USER_FAIL,
       LOGOUT_SUCCESS,
       LOGOUT_FAIL,
       CLEAR_ERRORS,
       LOGOUT_AUTO_SUCCESS,
       LOGOUT_AUTO_FAIL} from  '../constants/userConstants'

//LOGIN
// export const login = (email, password) => async (dispatch) =>{

//         try{
//             dispatch ({type: LOGIN_REQUEST});
//             const {data} = await axios.post('/api/signin', {email, password} )
//             dispatch ({
//                 type: LOGIN_SUCCESS,
//                 payload: data.user
//             });
//         } catch(error){
//             dispatch ({
//                 type: LOGIN_FAIL,
//                 payload: error.response.data.message
//             });
//         }
// }

// SIGN IN USER

export const signin = (email, password) => async (dispatch)=>{
    dispatch ({
            type: LOGIN_REQUEST,
            payload: {email, password }
        });

    try{
        const {data} = await axios.post('/api/signin', {email, password} );
        dispatch ({
            type: LOGIN_SUCCESS,
            payload: data.user});
            if  (data.success === true){
                toast.success('Login successfully');
           
            }
            

    }catch(error){
        dispatch ({
            type: LOGIN_FAIL,
            // payload: error.response && error.response.message.data.messsage ? error.response.data.message : error.message
            payload:  error.response.data.message,
            
        });
        
        toast.error( error.response.data.error);
    }
}



//CURRENTLY LOGGED USER
export const loadUser = () => async (dispatch)=>{
 
    try{
        const {data} = await axios.get('/api/getme');
        dispatch ({
            type: LOAD_USER_SUCCESS,
            payload: data.user});

    }catch(error){
        dispatch ({
            type: LOAD_USER_FAIL,
            payload:  error.response.data.message 
        });
        
    }
}


//LOG OUT
export const logOut = () => async (dispatch)=>{

    try{

     const {data} = await axios.get('/api/logout');
        dispatch ({
            type: LOGOUT_SUCCESS
        });
        dispatch({type: CART_EMPTY});
        dispatch({type: CLEAR_SHIPPING_ADDRESS});
        localStorage.removeItem('cartItems');
        localStorage.removeItem('shippingAddress');

    }catch(error){
        dispatch ({
            type: LOGOUT_FAIL,
            payload:  error.response.data.message 
        });
        
    }
}


export const logOutAuto = () => async (dispatch) =>{
    setTimeout( async ()=>{
        try{

            const {data} = await axios.get('/api/logout');
               dispatch ({
                   type: LOGOUT_AUTO_SUCCESS
               });
               dispatch({type: CART_EMPTY});
               dispatch({type: CLEAR_SHIPPING_ADDRESS});
               localStorage.removeItem('cartItems');
               localStorage.removeItem('shippingAddress');
               window.location.reload(true);
               toast.error("Your token is expired, please log again");
       
           }catch(error){
               dispatch ({
                   type: LOGOUT_AUTO_FAIL,
                   payload:  error.response.data.message 
               });
               
           }
      
    }, 3600000);
}

// 3600000