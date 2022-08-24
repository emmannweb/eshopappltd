import { useDispatch, useSelector } from 'react-redux'
import './App.css';
import Menu from './component/Menu';
import Footer from './component/Footer';
import Header from './component/Header';
import { listProducts } from './action/productAction';
import React, { useEffect, useState } from 'react'
import Card from './component/Card'
import Loading from './component/Loading';
import 'antd/dist/antd.css';
import { Pagination } from 'antd';




const App = ({match}) => {

    const keyword = match.params.keyword;

    const [pageNumber, setPageNumber] = useState(1);

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, products, count, page, error } = productList


    useEffect(() => {
        dispatch(listProducts(pageNumber, keyword))
    }, [dispatch, pageNumber, page, keyword])

  
    return ( 
        <>
       
            <Menu/>
           
            <Header/>
          
                <div className="container mobile justify-content-center mb-50" >
                        {/* <h2>Latest Product</h2> */}
                   
                        <div className="row pd_app" >

                            {
                                loading ? <Loading/>: products&&products.length === 0 ? <><h2>{`No result found for your search query: "${keyword}"`}</h2></> :
                                products && products.map(product => (
                                    <Card key={product._id} product={product} id={product._id} countStock={product.countStock} rating={product.rating} numReviews={product.numReviews}/>    
                                ))    
                            }
            
                        </div>
                  
                        <div className="container text-center pt-5">
                            <Pagination current={pageNumber} total= {typeof keyword !== "undefined" ? products.length :  count } onChange={(value)=>setPageNumber(value)}  pageSize={8} />
                        </div>
                </div>
              
            <Footer/>
        </>
    )
}

export default App;

