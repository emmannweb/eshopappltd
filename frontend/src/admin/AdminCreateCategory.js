import React, {useState, useEffect} from 'react'
import  Menu from '../component/Menu'
import  Footer from '../component/Footer'
import SidebarAdmin from './SidebarAdmin';
import axios from 'axios'
import {toast} from 'react-toastify'

const AdminCreateCategory = ({history}) => {

    const [name, setName] = useState('');

    //submit update
    const handleSubmitCategory = (e) =>{
            e.preventDefault();
            axios.post("/api/category/create", {name}) 
            .then(res =>{
               // console.log(res);
                if (res){
                    toast.success("Product category were created")
                }
            })
            .catch(error =>{
                console.log(error);
            })
        // console.log("clicked");
        
        history.push('/admin/product/categories')
        }

  return (
        <>
            <Menu />
       
                <SidebarAdmin/>

                <div className="container custom_class">
                    <h2 className="signup_title ">CREATE PRODUCT CATEGORY</h2>
                    <form className=" col-sm-6 offset-3 pt-5 signup_form " enctype="multipart/form-data">
                        
                        <div className="form-outline mb-4">
                            <input onChange= {(e)=>setName(e.target.value)} type="text" id="form4Example1" className="form-control" value={name} />
                            <label className="form-label" htmlFor="form4Example1">Name</label>
                        </div>
                    
                        <button onClick={handleSubmitCategory} type="submit" className="btn btn-primary btn-block mb-4">Create Category</button>
                        
                    </form>
                </div>
            <Footer />
             
        </>
  )
}

export default AdminCreateCategory