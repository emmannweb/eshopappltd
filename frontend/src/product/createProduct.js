import React, {useState} from 'react'
import Menu from '../component/Menu'
import Footer from '../component/Footer'
import axios from 'axios'
import {toast} from 'react-toastify'


const CreateProduct = () => {

   
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] =  useState("");
    const [avatar, setAvatar] = useState("");



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

    //console.log("avatar test", avatar);
            //send values to backend
    const handleSubmit =  (e) =>{
        e.preventDefault();
            //const fileField = document.querySelector('input[type="file"]'); 
        
        console.log(name, description, price, avatar);
   
        // const avatar1 = avatar.avatar.split(",")[1];

        axios.post('/api/product/create', {name, description, price, avatar})
          .then(function (response) {
              console.log(response);
              if (response){
                toast.success(`Product created`);
              }
            
          })
          .catch(function (error) {
            console.log(error);
        });
    }


    return (
        <div>
        <Menu/>
     
        <div className="container custom_class">
            <h2 className="signup_title ">CREATE PRODUCT.</h2>
            <form className=" col-sm-6 offset-3 pt-5 signup_form " enctype="multipart/form-data">
                
                <div className="form-outline mb-4">
                    <input onChange= {(e)=>setName(e.target.value)} type="text" id="form4Example1" className="form-control" />
                    <label className="form-label" htmlFor="form4Example1">Name</label>
                </div>

                
                <div className="form-outline mb-4">
                    <input onChange= {(e)=>setDescription(e.target.value)} type="text" id="form4Example2" className="form-control" />
                    <label className="form-label" htmlFor="form4Example2">Description </label>
                </div>

                <div className="form-outline mb-4">
                    <input onChange= {(e)=>setPrice(e.target.value)} type="text" id="form4Example3" className="form-control" />
                    <label className="form-label" htmlFor="form4Example2">Price </label>
                </div>

                <div className="form-outline mb-4">
                    <select id="cars" name="cars">
                        <option value="volvo">Volvo XC90</option>
                        <option value="saab">Saab 95</option>
                        <option value="mercedes">Mercedes SLK</option>
                        <option value="audi">Audi TT</option>
                    </select>
                    <label className="form-label" htmlFor="form4Example2">Category name </label>
                </div>

            
                <div className="form-outline mb-4">
                    <input  type="file" id="formupload" name="image" className="form-control" onChange={handleImage} />
                    <label className="form-label" htmlFor="form4Example2">Image</label>
                </div>
                       
                <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mb-4">Create</button>
                <img className="img-fluid" src={avatar&&avatar} alt="" />
            </form>
        </div>
        <Footer />
       
    </div>
    )
}

export default CreateProduct
