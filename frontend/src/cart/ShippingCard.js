import React from 'react'
import  Menu from '../component/Menu'
import  Footer from '../component/Footer'
import CheckOutSteps from '../component/CheckOutSteps'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {saveShippingAddress} from '../action/cartAction'

const ShippingCard = (props) => {
    const {isAuthenticated} = useSelector(state => state.auth);
    const {shippingAddress} = useSelector(state => state.cart);

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [cellPhone, setCellPhone] = useState(shippingAddress.cellPhone);
    const [country, setCountry] = useState(shippingAddress.country);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

    //redirect user in sign in page if not authent
    if (!isAuthenticated){
        props.history.push('/signin');
    }
   

    const dispatch = useDispatch();

    const handleSubmitShipping = (e) =>{
        e.preventDefault();
        console.log("clicked");
        dispatch(saveShippingAddress({fullName, address, cellPhone, country, city, postalCode}));
        props.history.push('/payment');
    }
    
  return (
    <>
        <Menu/>
           <div className="container wrapper_add_to_Cart">
                <CheckOutSteps step1 step2></CheckOutSteps>
                 
                    <div className="container custom_class">
                        <h2 className="signup_title "> Shipping Address</h2>
                        <form onSubmit={handleSubmitShipping} className=" col-sm-6 offset-3 pt-5 signup_form " enctype="multipart/form-data">
                            
                            <div className="form-outline mb-4">
                                <input onChange= {(e)=>setFullName(e.target.value)} type="text" id="form4Example1" className="form-control"  value={fullName} required/>
                                <label className="form-label" htmlFor="fullname">Fullname</label>
                            </div>

                            
                            <div className="form-outline mb-4">
                                <input onChange= {(e)=>setAddress(e.target.value)} type="text" id="form4Example2" className="form-control" value={address} required/>
                                <label className="form-label" htmlFor="address">Address </label>
                            </div>

                            <div className="form-outline mb-4">
                                <input onChange= {(e)=>setCellPhone(e.target.value)} type="tel" id="form4Example2" className="form-control" value={cellPhone} required/>
                                <label className="form-label" htmlFor="address">Cellphone </label>
                            </div>

                            <div className="form-outline mb-4">
                                <input onChange= {(e)=>setCountry(e.target.value)} type="text" id="form4Example3" className="form-control" value={country}  required/>
                                <label className="form-label" htmlFor="country">Country </label>
                            </div>

                            <div className="form-outline mb-4">
                                <input onChange= {(e)=>setCity(e.target.value)} type="text" id="form4Example3" className="form-control"  value={city} required/>
                                <label className="form-label" htmlFor="country">City </label>
                            </div>

                            <div className="form-outline mb-4">
                                <input onChange= {(e)=>setPostalCode(e.target.value)} type="text" id="form4Example3" className="form-control" value={postalCode} required/>
                                <label className="form-label" htmlFor="country">Postal Code </label>
                            </div>

                          
                                
                            <button type="submit" className="btn btn-primary btn-block mb-4">Continue</button>
                           
                        </form>
                    </div>
           </div>
        <Footer/>
    </>
  )
}

export default ShippingCard