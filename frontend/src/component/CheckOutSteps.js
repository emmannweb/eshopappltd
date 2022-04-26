import React from 'react'

const CheckOutSteps = (props) => {
  return (
    <div className="row checkout_step">
       <div className={props.step1 ? 'active' : ''}>Sign In</div>
       <div className={props.step2 ? 'active' : ''}>Shipping</div>
       <div className={props.step3 ? 'active' : ''}>Confirmation & Payment</div>
     
    </div>
  )
}

export default CheckOutSteps