import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../component/Menu'
import Footer from '../component/Footer'
import SidebarAdmin from './SidebarAdmin'
import axios from 'axios'
import { toast } from 'react-toastify'

const AdminShowCategory = () => {

    const [categories, setCategories] = useState([]);

    //destructure
    const { name, _id } = categories;
    // console.log("category console", categories);

    //show all categories
    const showCategory = () => {
        axios.get('/api/category/all')
            .then(res => {
                // console.log(res.data.categories);
                setCategories(res.data.categories);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        showCategory();
    }, []);


    //delete category
    const deleteCategory = (id, name) => {
        if (window.confirm(`Do you want to delete the Category name: ${name} / ${id}`)) {
            //console.log(`${id}`);
            axios.delete(`/api/category/delete/${id}`)
                .then(res => {
                    if (res) {
                        //console.log(res);
                        showCategory();
                        toast.success(`The category name: ${name} was deleted`);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
    return (
        <>



            <div className="container-fluid" >

                <h1>Product Categories</h1>


                <div className="btn_div_button" style={{ display: "flex", justifyContent: "right" }}>
                    <Link to="/admin/category/create" className="btn btn-default btn-primary "> + Create Category</Link>
                </div>
                <table className="table">

                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col"> Name</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories && categories.map((category, id) => (

                                <tr key={id}>
                                    <th scope="row">{category._id}</th>
                                    <td>{category.name}</td>
                                    <td><Link to={`/admin/product/category/edit/${category._id}`}> <i class="fas fa-edit btn-primary"></i></Link></td>
                                    <td><i onClick={() => deleteCategory(category._id, category.name)} class="far fa-trash-alt btn-danger" style={{ cursor: "pointer" }}></i></td>
                                </tr>
                            ))
                        }


                    </tbody>
                </table>


            </div>


        </>
    )
}

export default AdminShowCategory