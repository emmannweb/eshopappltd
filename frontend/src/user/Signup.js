import React, {useState} from 'react'
import Footer from '../component/Footer'
import Menu from '../component/Menu';
import { toast } from "react-toastify";
import axios from 'axios'

const Signup = ({history}) => {



    const [values, setValues] = useState({
        name: '',
        email: '',
        password:'',
    });

    const [avatar, setAvatar] = useState("");

    const {name, email, password} = values;

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

    // get the values in the form
    const handleChange = name => (e) =>{
        setValues({...values, [name]: e.target.value});
    }


    //send values to backend
    const handleSubmit = async (e) =>{
             e.preventDefault();
            
        //console.log(name, email, password);
        try {
            const user ={name, email, password}
            const {data} = await  axios.post(`/api/signup`, {
                name, 
                email,
                password,
                avatar
            });
        
          
            if (data.success === true){
                //console.log(signUser.data);
               toast.success("Account created, please log In");
                setValues({ name: '', email: '',  password:''  });
            }

            history.push('/signin');
            
        } catch (err) {
            //console.log(err.response.data.error);

            if (err.response.data.success === false){
                toast.error(err.response.data.error);
            } 
        }  
    }





    return (
        <div>
            <Menu/>
            {/* <Header title="Sign Up" description="Please sign up to our application"/> */}
            <div className="container custom_class">
                <h2 className="signup_title ">SIGN UP</h2>
                <form className=" col-sm-6 offset-3 pt-5 signup_form">
                    
                    <div className="form-outline mb-4">
                        <input onChange= {handleChange('name')} type="text" id="form4Example1" className="form-control" value={name} />
                        <label className="form-label" htmlFor="form4Example1">Name</label>
                    </div>

                    
                    <div className="form-outline mb-4">
                        <input onChange= {handleChange('email')} type="email" id="form4Example2" className="form-control" value={email} />
                        <label className="form-label" htmlFor="form4Example2">Email </label>
                    </div>

                
                    <div className="form-outline mb-4">
                        <input onChange= {handleChange('password')} type="password" id="form4Example3" className="form-control" value={password}/>
                        <label className="form-label" htmlFor="form4Example3">Password</label>
                    </div>

                    {/* <div className="form-outline mb-4">
                        <input  type="file" id="formupload" name="image" className="form-control" />
                        <label className="form-label" htmlFor="form4Example2"  onChange={handleImage} >Avatar</label>
                    </div> */}

                    <div className='form-outline mb-4'>
                     
                        {/* <label className="form-label" htmlFor="formFileLg">Avatar</label> */}
                        <input className="form-control " id="formFileLg" type="file" onChange={handleImage} placeholder="Add profile picture"  />
                    </div>

             
                
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mb-4">Register</button>
                    <img className="img-fluid"  alt={name} src={avatar} />
                </form>
            </div>
            <Footer />
           
        </div>
    )
}

export default Signup
