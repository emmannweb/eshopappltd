import React, { useState, useEffect } from 'react';
import Menu from '../component/Menu'
import Footer from '../component/Footer'
import SidebarAdmin from './SidebarAdmin';
import axios from 'axios';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../action/productAction'


const CreateProductAdmin = ({ history }) => {

    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [avatar, setAvatar] = useState("")
    const [category, setCategory] = useState("")
    const [countStock, setCountStock] = useState("")


    const [categories, setCategories] = useState([]);





    const handleImage = (e) => {
        const file = e.target.files[0];
        setFileToBase(file);

    }

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setAvatar(reader.result);
        }

    }

    //console.log("avatar test", avatar);
    //send values to backend
    const handleSubmit = (e) => {
        e.preventDefault();
        //const fileField = document.querySelector('input[type="file"]'); 


        //console.log(name, description, price, avatar);

        // const avatar1 = avatar.avatar.split(",")[1];

        axios.post('/api/product/create', { name, description, price, avatar, category, countStock })
            .then(res => {
                if (res) {
                    // console.log(response);
                    toast.success("Product created successfully");
                    dispatch(listProducts());
                }
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message);
            });

        history.push('/admin/dashboard');
    }

    //load category frmo the backend
    useEffect(() => {
        axios.get('/api/category/all')
            .then(res => {
                //console.log(res.data.categories);
                setCategories(res.data.categories);
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message);
            });
    }, [])

    return <>

        <div className="container custom_class">
            <h2 className="signup_title ">CREATE PRODUCT</h2>
            <form className=" col-sm-6 offset-3 pt-5 signup_form " enctype="multipart/form-data">

                <div className="form-outline mb-4">
                    <input onChange={(e) => setName(e.target.value)} type="text" id="form4Example1" className="form-control" />
                    <label className="form-label" htmlFor="form4Example1">Name</label>
                </div>


                <div className="form-outline mb-4">
                    <input onChange={(e) => setDescription(e.target.value)} type="text" id="form4Example2" className="form-control" />
                    <label className="form-label" htmlFor="form4Example2">Description </label>
                </div>

                <div className="form-outline mb-4">
                    <input onChange={(e) => setPrice(e.target.value)} type="number" id="form4Example3" className="form-control" />
                    <label className="form-label" htmlFor="form4Example2">Price </label>
                </div>

                <div className="form-outline mb-4">
                    <input onChange={(e) => setCountStock(e.target.value)} type="number" id="form4Example3" className="form-control" />
                    <label className="form-label" htmlFor="form4Example2">Number in Stock </label>
                </div>

                <div className="form-outline mb-1">
                    {/* <label style={{textAlign: "left", display: "block", paddingLeft: "14px"}} className="form-label" htmlFor="form4Example2">Category name </label><br/> */}
                    <select onChange={(e) => setCategory(e.target.value)} id="cars" name="cars" className="form-control select select-initialized">
                        <option value="" >Choose Category</option>
                        {
                            categories && categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))
                        }
                    </select>

                </div>


                <div className="form-outline mb-4">
                    <input type="file" id="formupload" name="image" className="form-control" onChange={handleImage} />
                    <label className="form-label" htmlFor="form4Example2">Image</label>
                </div>
                <img className="img-fluid" src={avatar && avatar} alt="" />
                <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mb-4">Create</button>

            </form>
        </div>

    </>
}

export default CreateProductAdmin;
