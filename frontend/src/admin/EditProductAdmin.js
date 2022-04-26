import React, {useState, useEffect} from 'react';
import  Menu from '../component/Menu'
import  Footer from '../component/Footer'
import SidebarAdmin from './SidebarAdmin';
import axios from 'axios';
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../action/productAction'

const EditProductAdmin = ({match, history}) => {
    const dispatch = useDispatch;
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] =  useState("")
    const [avatar, setAvatar] = useState("")
    const [category, setCategory] = useState("")
    const [countStock, setCountStock] = useState("")
    

    //console.log(match);
    console.log("category test", category);

    //FETCH PRODUCT FMO THE BACKEND IN THE FORM
    useEffect(()=>{
        axios.get(`/api/product/${match.params.id}`)
        .then((prod)=>{
          console.log(prod.data.product);
            if (prod){
                setName(prod.data.product.name)
                setDescription(prod.data.product.description)
                setPrice(prod.data.product.price)
                setAvatar(prod.data.product.avatar);
                setCategory(prod.data.product.category);
                setCountStock(prod.data.product.countStock);

                dispatch(listProducts());
                
            }
          
        })
        .catch(error =>{
            console.log(error)
        })
    }, []);

    const handleImage = (e) =>{
        const file = e.target.files[0];
        setFileToBase(file);

    }

  

    const setFileToBase = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setAvatar(reader.result);
        }

    }

 
            //send values to backend
    const handleSubmit =  (e) =>{
        e.preventDefault();

        axios.put(`/api/product/edit/${match.params.id}`, {name, description, price, avatar, category, countStock})
        .then(function (response) {
           // console.log(response);
            toast.success(`Product: ${name}, updated`);
            history.push('/admin/dashboard');
        })
        .catch(function (error) {
            console.log(error);
            toast.error(error.message);
        });
    }

  return (
      <>
      
      <Menu/>
                <SidebarAdmin/>
                <div className="container custom_class">
                    <h2 className="signup_title ">EDIT PRODUCT</h2>
                    <form className=" col-sm-6 offset-3 pt-5 signup_form " enctype="multipart/form-data">
                        
                        <div className="form-outline mb-4">
                            <input onChange= {(e)=>setName(e.target.value)} type="text" id="form4Example1" className="form-control" value={name ? name : ""} />
                            <label className="form-label" htmlFor="form4Example1">Name</label>
                        </div>

                        
                        <div className="form-outline mb-4">
                            <input onChange= {(e)=>setDescription(e.target.value)} type="text" id="form4Example2" className="form-control" value={description ?  description : ""}  />
                            <label className="form-label" htmlFor="form4Example2">Description </label>
                        </div>

                        <div className="form-outline mb-4">
                            <input onChange= {(e)=>setPrice(e.target.value)} type="text" id="form4Example3" className="form-control" value={price ? price :  ""}  />
                            <label className="form-label" htmlFor="form4Example2">Price </label>
                        </div>

                        <div className="form-outline mb-4">
                            <input onChange= {(e)=>setCountStock(e.target.value)} type="number" id="form4Example4" className="form-control"  value={countStock}/>
                            <label className="form-label" htmlFor="form4Example2">Number in Stock </label>
                        </div>

                        <div className="form-outline mb-4">
                            <input onChange= {(e)=>setCategory(e.target.value)} type="text" id="form4Example5" className="form-control" value={category ? category.name:  ""}  />
                            <label className="form-label" htmlFor="form4Example2">Category </label>
                        </div>

                    
                        <div className="form-outline mb-4">
                            <input  type="file" id="formupload" name="image" className="form-control" onChange={handleImage} />
                            <label className="form-label" htmlFor="form4Example2">Image</label>
                        </div>
                        
                        <img className="img-fluid" src={avatar&&avatar} alt="" />

                        <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mb-4">Update product</button>
                        
                    </form>
                </div>
           <Footer/>
      </>
  )
};

export default EditProductAdmin;
