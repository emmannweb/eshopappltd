import React, {useState, useEffect}from 'react'
import  Menu from '../component/Menu'
import  Footer from '../component/Footer'
import SidebarAdmin from './SidebarAdmin';
import axios from   'axios'
import { toast } from 'react-toastify';

const AdminEditProductCategory = ({match, history}) => {
    const [name, setName] = useState("");

    const showSingleCategory = () =>{
        axios.get(`/api/product/category/show/${match.params.id}`)
        .then(res =>{
           if (res){
            //console.log(res.data.category);
            setName(res.data.category.name)
           }
        })
        .catch(error =>{
            console.log(error);
        })
    }

    useEffect(()=>{
        showSingleCategory();
    }, []);


    //submit update
    const handleSubmitCategory = (e) =>{
        e.preventDefault();
        axios.put(`/api/product/category/update/${match.params.id}`, {name}) 
        .then(res =>{
            if (res){
                showSingleCategory();
                toast.success(`category name: ${name} was updated`)
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
        <Menu/>
        
        <SidebarAdmin/>
        <div className="container custom_class">
            <h2 className="signup_title ">EDIT PRODUCT CATEGORY</h2>
            <form className=" col-sm-6 offset-3 pt-5 signup_form " enctype="multipart/form-data">
                
                <div className="form-outline mb-4">
                    <input onChange= {(e)=>setName(e.target.value)} type="text" id="form4Example1" className="form-control" value={name ? name : ""} />
                    <label className="form-label" htmlFor="form4Example1">Name</label>
                </div>
            
                <button onClick={handleSubmitCategory} type="submit" className="btn btn-primary btn-block mb-4">Update Category</button>
                
            </form>
        </div>
         <Footer/>
    </>
  )
}

export default AdminEditProductCategory