import React, { useEffect, useState } from 'react'
import Menu from '../component/Menu'
import Footer from '../component/Footer'
import axios from 'axios'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'



const UserOrderHistory = ({ history }) => {
    const { isAuthenticated } = useSelector(state => state.auth);

    const [orders, setOrders] = useState([])
    const [orderDetails, setOrderDetails] = useState([])


    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('/api/orders/me')
            if (data) {
                setOrders(data.orders);
                // console.log("use effect", data.orders)  
            }
        } catch (error) {
            console.log(error)
        }

        fetchSingleOrderDetails();
    }

    // single order details
    const fetchSingleOrderDetails = async (id) => {
        if (id) {
            try {
                const { data } = await axios.get(`/api/ordersingle/${id}`)
                if (data) {
                    setOrderDetails(data.singleOrder.orderItems);
                    console.log("use effect", data.singleOrder.orderItems)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    if (!isAuthenticated) {
        history.push('/signin');
    }

    useEffect(() => {
        fetchOrders();
    }, [isAuthenticated]);


    return (
        <>
            <div className="order_user_history paddingTB container-fluid" >
                {
                    orders && orders.length === 0 ? <><h2 className='text-center pt-5'>Your don't have any purchase yet!</h2></> : (
                        <table className="table">

                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">OrderID</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Paid</th>
                                    <th scope="col">Delivered</th>
                                    <th scope="col">Delivered at</th>
                                    <th scope="col">Details</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    // orders && orders.length === 0 ? <><h2>Your don't have any purcharse</h2></> :  

                                    orders.map(res => (

                                        <tr key={res._id}>
                                            <th scope="col">{res._id}</th>
                                            <th scope="col">{new Date(res.createdAt).toLocaleDateString()}</th>
                                            <th scope="col">${res.itemsPrice.toFixed(2)}</th>
                                            <th scope="col">{res.isPaid ? (<span style={{ color: "green" }}>Paid</span>) : (<span style={{ color: "#ffc107" }}>Processing</span>)}</th>
                                            <th scope="col"> {res.isDelivered ? (<span style={{ color: "green" }}>Yes</span>) : (<span style={{ color: "#ffc107" }}>No</span>)}</th>
                                            <th scope="col">{res.isPaid && res.isDelivered ? res.deliveredAt : ''}</th>
                                            <th scope="col">
                                                <button onClick={() => fetchSingleOrderDetails(res._id)} type="button" className="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
                                                    details
                                                </button>
                                            </th>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    )
                }


                {/* modal */}
                {/* <!-- Button trigger modal --> */}
                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Purchase Details</h5>
                                <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <table className="table">

                                    <thead className="">
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price </th>
                                            <th scope="col">image</th>
                                            <th scope="col">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody className='ordersdetailsBody'>

                                        {
                                            //  orders && orders.length === 0 ? <><h2>Your don't have any purcharse</h2></> :  

                                            orderDetails.map(det => (

                                                <tr key={det.product}>
                                                    <th scope="col">{det.name}</th>
                                                    <th scope="col">${det.price}</th>
                                                    <th scope="col"><img style={{ maxWidth: "40%" }} src={det.image} alt={det.name} /></th>
                                                    <th scope="col">{det.quantity}</th>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-mdb-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UserOrderHistory