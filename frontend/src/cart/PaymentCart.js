import React, {useEffect} from 'react'
import Menu from '../component/Menu'
import Footer from '../component/Footer'
import CheckOutSteps from '../component/CheckOutSteps'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { orderCreate } from '../action/orderAction'
import StripeCheckoutButton from '../stripebutton/StripeButton'
import stripeCreditCard from '../images/stripe.png'


const PaymentCart = (props) => {

    // const {shippingAddress, cartItems} = useSelector(state => state.cart);
    const cart = useSelector(state => state.cart);
    const {shippingAddress, cartItems} = cart;

    useEffect(()=>{
        if(shippingAddress.address== ''){
            props.history.push('/shipping');
            toast.error("You must fill the address");
        }
        if(shippingAddress.cellPhone === ''){
            props.history.push('/shipping');
            toast.error("You must add a phone number");
        }
    },[cart.itemsPrice, cart.shippingPrice, cart.taxPrice, cart.totalPrice ]);


    //two decimals after number
    const twoDecimalsNumber =  (num) =>  Math.round(num * 100 + Number.EPSILON) / 100;

    //adding other properties to cart 
    cart.itemsPrice = twoDecimalsNumber(cart.cartItems.reduce((a, c)=> a + c.price * c.quantity, 0));
    cart.shippingPrice = twoDecimalsNumber(cart.itemsPrice > 200 ? 0: 25);
    cart.taxPrice = twoDecimalsNumber(cart.itemsPrice * 0.05);
    cart.totalPrice =  twoDecimalsNumber(cart.itemsPrice + cart.shippingPrice + cart.taxPrice);
    
  return (
    <>
    <Menu/>
       <div className="container wrapper_add_to_Cart">
            <CheckOutSteps step1 step2 step3></CheckOutSteps>
             
                <div className="container custom_class">
                    <h2 className="signup_title "> Details Summaries</h2>
                    <div className="row">
                        <div className="col-sm-8">
                        {
                           
                           cartItems && cartItems.map((item)=>(
                                <div className="row_loop" key={item.product}>
                                    <div className="colcart">
                                        <img src={item.image} alt={item.name} className="small" />
                                    </div>

                                    <div className="colcart">
                                        <h6>{item.name}</h6>
                                    </div>                         

                                    <div className="colcart">
                                        <h6>${(item.price * item.quantity).toFixed(2)}</h6>
                                    </div>
            
                                </div>
                            ))
                        }
                        </div>
                        <div className="col-sm-4">
                            <div className="shipping_details text-center pt-3">
                                <h4>Shipping</h4>
                                <div className="te"><b>Name:</b> {shippingAddress.fullName}</div>
                                <div className=""><b>Address:</b> {shippingAddress.address}</div>
                                <div className=""><b>Cellphone:</b> {shippingAddress.cellPhone}</div>
                                <div className=""><b>Country:</b> {shippingAddress.country}</div>
                                <div className=""><b>City:</b> {shippingAddress.city}</div>
                                <div className=""><b>Postal Code:</b> {shippingAddress.postalCode}</div>
                            </div>

                            <div className="shipping_details text-center pt-3 mt-3">
                                <h4>Order Summary</h4>
                                <div className="te"><b>Items price:</b> ${cart.itemsPrice}</div>
                                <div className=""><b>Shipping Price:</b> ${cart.shippingPrice}</div>
                                <div className=""><b>Tax price:</b> ${cart.taxPrice}</div>
                                <div className=""><b>Total:</b> ${cart.totalPrice}</div>
                                <div className=""> <img  className= "img-fluid imgstripe_style"src={stripeCreditCard} alt="stripe payment" /></div>
                                <div className='addbtnstrip'><span className='addtocart '><StripeCheckoutButton price={cart.totalPrice}/></span></div>
                                {/* onClick={generateOrder}  */}
                            </div>
                        </div>
                    </div>
                
                </div>
       </div>
    <Footer/>
</>
  )
}

export default PaymentCart

