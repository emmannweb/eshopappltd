import React from 'react'
import  Menu from '../component/Menu'
import  Footer from '../component/Footer'

const OrderSuccess = () => {
  return (
    <>
         <Menu/>
           
            <div className="container" style={{padding: "100px 0"}}>
                <h1 className='text-center'>Order Confirmation</h1>
                <div className="bg">
                
                    <div className="card" style={{paddingTop: "66px"}}>
                        
                        <span className="card__success"><i className="fa fa-check"></i></span>
                        
                        <h1 className="card__msg">Payment Complete</h1>
                        <h2 className="card__submsg">Thank you for choosing us!</h2>
                        
                        <div className="card__body">
        
                        </div>
                        
                        <div className="card__tags">
                            <span className="card__tag">completed</span>
                                
                        </div>
                        
                    </div>
                    
                </div>
            </div>
          <Footer/>
    </>
  )
}

export default OrderSuccess