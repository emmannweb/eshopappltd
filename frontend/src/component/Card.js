import {Link} from 'react-router-dom'
import {addItemToCart} from '../action/cartAction'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import imgDefault from '../images/imgcallback.png'
import Rating from './Rating'

const Card = ({product, id, countStock, rating, numReviews}) => {

    const dispatch = useDispatch();
    const addToCardHome = () =>{
        dispatch(addItemToCart(id, 1));
        toast.success("Added to shopping cart");
    }
    return (
    
        <div className="col-md-3 col-6 " style={{marginTop: "20px"}}>
        <div className="card">
            <div className="card-body">
                <div className="card-img-actions"> <img src={product.avatar ? product.avatar : imgDefault } className="card-img img-fluid" width="96" height="350" alt="" /> </div>
            </div>
            <div className="card-body bg-light text-center">
                <div className="mb-2">
                    <h5 className="font-weight-semibold mb-2 card_title"> <Link to={`/product/${product._id}`} className="text-default mb-2" data-abc="true">{product.name}</Link> </h5> <a href="#" className="text-muted" data-abc="true">{product.category? product.category.name : "" }</a>
                </div>
                <h3 className="mb-0 font-weight-semibold ">${product.price}</h3>
                {/* <div> <i className="fa fa-star star"></i> <i className="fa fa-star star"></i> <i className="fa fa-star star"></i> <i className="fa fa-star star"></i> </div> */}
                <Rating value={rating} />
                
                
                <div className="text-muted mb-3">{numReviews} reviews</div>
                    <Link to={`/product/${product._id}`}><h6>Details</h6></Link>
              
                 <button disabled={countStock === 0} onClick={()=>addToCardHome(id, 1)} type="button" className="btn bg-cart"><i className="fa fa-cart-plus mr-2"></i> Add to cart </button>
                {/* <button type="button" className="btn bg-cart">  {id}</button> */}
                
            </div>
        </div>
    </div>
    )
}

export default Card;