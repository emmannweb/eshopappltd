import React from 'react'
import {Route, Redirect } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { toast } from 'react-toastify'

const PrivateAdminRoute = ({...rest}) => {
    const {isAuthenticated, error, user} = useSelector(state => state.auth);
    // const auth = localStorage.getItem('token');
    // if  (user.role===0){
    //     toast.error("You must be an Admin to access this ressource!");
    // }
    //  return isAuthenticated && user.role===1 ? <Route {...rest}/> : <Redirect to ="/" />

    if  (isAuthenticated){
  
        if  (user.role===0){
            toast.error("You must be an Admin to access this ressource!");
        }

        if (user.role===1){
            return isAuthenticated && user.role===1 ? <Route {...rest}/> : <Redirect to ="/admin/dashboard" />
        }
    }
    return  <Redirect to ="/signin" />;
}

export default PrivateAdminRoute



 


