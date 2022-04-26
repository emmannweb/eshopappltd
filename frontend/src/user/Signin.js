import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Footer from '../component/Footer'
import Menu from '../component/Menu';
import axios from 'axios'
import {signin, logOutAuto} from '../action/userAction.js'
import {Link} from 'react-router-dom'





const Signin = (props) => {

    //query string url parameter
    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';


    const [values, setValues] = useState({
        email: '',
        password:''
    });

    const { email, password} = values;

    const dispatch = useDispatch();


    const {isAuthenticated, error} = useSelector(state => state.auth);
  

    // useEffect(()=>{
    //     if  (isAuthenticated){
    //         history.push('/');
    //     }

    // }, [dispatch, isAuthenticated, error, history])
  

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push(redirect);
            dispatch(logOutAuto());
        }
      }, [props.history, redirect, isAuthenticated]);

    // get the values in the form
    const handleChange = name => (e) =>{
        setValues({...values, [name]: e.target.value});
    }

    //send values to backend
    const handleSubmit = async (e) =>{
             e.preventDefault();
             dispatch(signin(email, password));
           
             
           
        
            //const {data} = await axios.post('/api/signin', {email, password} );
            //console.log(data);
            
        //console.log(name, email, password);
        // try {
        //     const user ={email, password}
        //     const signIn = await  axios.post(`/api/signin`, {
    
        //         email,
        //         password
        //     });
          
        //     if (signIn.data.success === true){
        //         //console.log(signIn.data);
        //         toast.success("Successfully log In");
        //         setValues({  email: '',  password:''  });

        //         if  (typeof window !== "undefined"){
        //             localStorage.setItem('token', JSON.stringify(signIn.data))
        //         }
        //     }

        //     history.push('/dashboard');
            
        // } catch (err) {
        //     console.log(err.response.data.error);
        //     if (err.response.data.success === false){
        //         toast.error(err.response.data.error);
        //     } 
        // }  
    }


    return (
        <div>
            <Menu/>
            {/* <Header title="Sign Up" description="Please sign up to our application"/> */}
            <div className="container custom_class">
                <h2 className="signup_title ">SIGN IN </h2>
                <form className=" col-sm-6 offset-3 pt-5 signup_form">
                    
                                
                    <div className="form-outline mb-4">
                        <input onChange= {handleChange('email')} type="email" id="form4Example2" className="form-control" value={email} />
                        <label className="form-label" htmlFor="form4Example2">Email </label>
                    </div>
                
                    <div className="form-outline mb-4">
                        <input onChange= {handleChange('password')} type="password" id="form4Example3" className="form-control" value={password}/>
                        <label className="form-label" htmlFor="form4Example3">Password</label>
                    </div>
                
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mb-4">Sign In</button>
                    <h6>Not a user? {<Link to='/signup'>Sign Up</Link>} </h6>
                </form>
            </div>
            <Footer />
           
        </div>
    )
}

export default Signin
