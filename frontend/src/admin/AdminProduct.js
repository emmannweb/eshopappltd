import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Menu from '../component/Menu'
import Footer from '../component/Footer'
import SidebarAdmin from './SidebarAdmin'
import { listProducts } from '../action/productAction'
import { Link } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify'
import 'antd/dist/antd.css';
import { Pagination } from 'antd';

const AdminProduct = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, products, count, page, error } = productList

    useEffect(() => {
        dispatch(listProducts(pageNumber))
    }, [dispatch, pageNumber, page])

    //Delete product
    //console.log(props)
    const deleteProduct = (id, name) => {

        if (window.confirm(`Are you sure, you want to delete Product: ${name}`)) {
            //console.log("clicked")
            axios.delete(`/api/product/delete/${id}`)
                // axios.delete(`/product/delete/${match.params.id}`)
                .then(prod => {
                    if (prod) {
                        //console.log("product deleted");
                        toast.success(`Product name: ${name} was deleted`);
                        //window.alert(`product ID: ${id} were deleted`);

                        //update product list after deleting product
                        dispatch(listProducts());
                    }

                })
                .catch(error => {
                    console.log(error)
                });
        }

    }

    return (
        <>
            <div className="container-fluid " >
                <h1>List of products</h1>
                <div className="btn_div_button" style={{ display: "flex", justifyContent: "right" }}>
                    <Link to="/admin/product/create" className="btn btn-default btn-primary "> + Create product</Link>
                </div>
                <table className="table">

                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products && products.map((product, id) => (

                                <tr key={id}>
                                    <th scope="row">{product._id}</th>
                                    <td>{product.name}</td>
                                    <td>{product.countStock}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category ? product.category.name : ""}</td>
                                    <td><Link to={`/admin/product/edit/${product._id}`}> <i class="fas fa-edit btn-primary"></i></Link></td>
                                    <td style={{ cursor: "pointer" }} onClick={() => deleteProduct(product._id, product.name)}><i className="far fa-trash-alt btn-danger"></i></td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>

                <Pagination current={pageNumber} total={count} onChange={(value) => setPageNumber(value)} pageSize={8} />
            </div>

        </>
    )
}

export default AdminProduct