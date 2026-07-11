import React from 'react'
import {Route, Redirect } from 'react-router-dom'
import {useSelector} from 'react-redux'

 

const PrivateRoute = ({...rest}) => {
    const {isAuthenticated, error} = useSelector(state => state.auth);
    // const auth = localStorage.getItem('token');
    return isAuthenticated ? <Route {...rest}/> : <Redirect to ="/signin" />
}

export default PrivateRoute
