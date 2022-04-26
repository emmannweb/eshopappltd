import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import Menu from '../component/Menu'
import Footer from '../component/Footer'
import {addItemToCart} from '../action/cartAction'
import Loading from '../component/Loading'
import Rating from '../component/Rating';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewProduct = ({match, history}) => {
    const [product, setProduct] = useState("");
    const [qty, setQty] = useState(1);
    const {name, price, description, countStock, reviews, numReviews,  avatar, _id} = product;
    const {isAuthenticated} = useSelector(state => state.auth);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
   


    const dispatch = useDispatch();
    useEffect(()=>{
        //axios.get(`/api/${props.match.url}`)
        axios.get(`/api/product/${match.params.productid}`)
        .then(res=>{
           // console.log("res review",res.data.product);
            setProduct(res.data.product);
          
            setLoading(false);
        })
       },[numReviews ])

         // handle click card
         const handleClickCard = () =>{
            dispatch(addItemToCart(match.params.productid, qty));
            //console.log("item add to cart");
            history.push('/cart');
       }

    
       //INCREASE VALUE
       const increaseValue = () =>{
           const count = Number( document.getElementById('number').value )
           if   (count >= countStock) return;
           const quantity = count + 1;
           setQty(quantity);
       }
       
       

       //DECREASE VALUE
       const decreaseValue = () =>{
        const count = Number( document.getElementById('number').value )
        if   (count <= 1) return;
        const quantity = count - 1;
        setQty(quantity);
        
       }

       // submit rating
       const submitRating= async (e) =>{
           e.preventDefault();
        // try {
        //     const {data} = axios.post(`/api/product/${_id}/reviews`, {rating, comment});
        //     console.log(data)
        //     if  (data.status === 404){
        //         toast.error("you already add review!")
        //     }
        //    toast.success("review added")
        //         setComment('');
        //         setRating(0)
           
        //     console.log(data)
        // } catch (error) {
        //    //console.log("submit error", error.response.data.message) 
        //    //toast.error(error.response.data.error)
        //   console.log("error resp", error.response.data.error)
        // }
        axios.post(`/api/product/${_id}/reviews`, {rating, comment})
        .then(res =>{
            console.log("res review", res)
            toast.success("review added")
            setComment('');
            setRating(0)
        })
        .catch(error =>{
            console.log("error review", error.response.data.error);
            toast.error(error.response.data.error)
        })
       }

       useEffect(()=>{

       },[numReviews])
 
  return (
    <>
        <Menu/>
            <div className="container single_product">
                {
                    loading ? <Loading/> : (
                        <div className="row">
                        <div className="col-sm-6 ">
                             
                             <div className="img_div">
                                 <img className= "img-fluid"src={avatar ? avatar : ""} alt={name} />
                                 <div className="review" style={{paddingTop: "10px"}}>
                                        <h4 >REVIEWS</h4>
                                         
                                            
                                             {reviews && reviews.length === 0 && <>
                                                    <div class="alert alert-warning alert_warning_custom" role="alert" data-mdb-color="warning"> No review added yet  </div>
                                                 </>
                                             }
                                        
                                         <div className="review_loop">
                                             {
                                                 reviews && reviews.map(review =>(
                                                    <ul className='review_list'>
                                                         <li><strong>{review.name}</strong></li>
                                                         <li><Rating value={review.rating} /></li>
                                                         <li><strong>{new Date(review.createdAt).toLocaleDateString()}</strong></li>
                                                         <li><p>{review.comment}</p></li>
                                                     </ul>
                                                 ))
                                             }
                                            <hr />
                                            <div className='review_comment'>
                                                {
                                                    isAuthenticated ?
                                                     <>
                                                             <form className="col-sm-6  pt-5" onSubmit={submitRating}>
                                                                 <h4>Leave a review</h4>
                                                                <div className="mb-2">
                                                                    <select class="mdb-select" onChange={(e)=>setRating(e.target.value)}  value={rating} required>
                                                                        <option value=""  selected>Choose your rating</option>
                                                                        <option value="1"> 1 - Poor</option>
                                                                        <option value="2"> 2 - Fair</option>
                                                                        <option value="3"> 3 - Good</option>
                                                                        <option value="4"> 4 - Very Good</option>
                                                                        <option value="5"> 5 - Excellent</option>
                                                                    </select> 
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label className="form-label" htmlFor="form4Example1">Leave a comment</label>
                                                                    <textarea required  value={comment} onChange={(e)=>setComment(e.target.value)} className='form-control' name="" id="" cols="100" rows="3" placeholder='Comment...'></textarea>
                                                                    
                                                                </div>
                                                                <button  type="submit" className="btn btn-primary btn-block mb-4">Add review</button>
                                                              
                                                            </form>
                                                     
                                                     </> :
                                                    <>Please <Link to={'/signin'}>Sign In</Link> to leave a review</>
                                                }
                                            </div>
                                         </div>
                                 </div>
                             </div>
                            
                        </div>
                        <div className="col-sm-6">
                             <div className="product_desc_wrapper">
                                <div className="product_title">
                                     <h1>{name}</h1> 
                                     <span><h6>Product # {_id}</h6></span>
                                     <hr />
                                     <h1>${price}</h1>
                                </div>
                                 
                                 <div className="qty_and_addtocart">
                                     <div>
                                         <div onClick={decreaseValue}  class="value-button" id="decrease"  value="Decrease Value">-</div>
                                                 <input type="number" id="number" value={qty}  readOnly/>
                                         <div onClick={increaseValue} class="value-button" id="increase"  value="Increase Value">+</div>
                                     </div>
                                     <button style={{display: countStock ? 'block' : 'none' }} onClick={handleClickCard} className='addtocart'>Add to cart</button>
                                 </div>
                                  <div className="stock">
                                      <hr />
                                      <h6>
                                          Status:  {
                                           countStock < 1 ? (<span  className='text-danger'>Out of Stock</span>) : (<span className='text-success'>Available</span>)
                                         }
                                       </h6> 
                                      
                                  </div>
                              
                                 <hr />
                                 <div className="desc">
                                     <h2>Description</h2>
                                     <p>{description}</p>
                                 </div>
                             </div>
                        </div>
                    </div>
                    )
                }
        
         
            </div>
        <Footer/>
    </>
  )
}

export default ViewProduct;




