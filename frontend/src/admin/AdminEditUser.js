import React, { useEffect, useState } from 'react'
import Menu from '../component/Menu'
import Footer from '../component/Footer'
import SidebarAdmin from './SidebarAdmin'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';



const AdminEditUser = ({ match, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");


    // //FETCH USER FROM THE BACKEND IN THE FORM
    useEffect(() => {
        axios.get(`/api/user/${match.params.id}`)
            .then((res) => {
                //console.log(res.data.user);
                if (res) {
                    setName(res.data.user.name)
                    setEmail(res.data.user.email)
                    setAvatar(res.data.user.avatar)
                }

            })
            .catch(error => {
                console.log(error)
            })
    }, []);

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

    //send values to backend
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`/api/admin/user/edit/${match.params.id}`, { name, email, avatar })
            .then(response => {
                if (response) {
                    // console.log(response);
                    toast.success(`User: ${name}, updated`);
                    history.push('/admin/users');
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.error(error.message);
            });
    }

    return (
        <>

            <div className="container ">
                <h2 className="signup_title ">EDIT USER</h2>
                <form className=" col-sm-6 offset-3 pt-5 signup_form " enctype="multipart/form-data">

                    <div className="form-outline mb-4">
                        <input type="text" onChange={(e) => setName(e.target.value)} id="form4Example1" className="form-control" value={name ? name : ""} />
                        <label className="form-label" htmlFor="form4Example1">Name</label>
                    </div>


                    <div className="form-outline mb-4">
                        <input type="text" onChange={(e) => setEmail(e.target.value)} id="form4Example2" className="form-control" value={email ? email : ""} />
                        <label className="form-label" htmlFor="form4Example2">E-mail </label>
                    </div>


                    <div className="form-outline mb-4">
                        <input type="file" onChange={handleImage} id="formupload" name="image" className="form-control" />
                        <label className="form-label" htmlFor="form4Example2">Image</label>
                    </div>

                    <img className="img-fluid" alt="" src={avatar && avatar} />

                    <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mb-4">Update user</button>

                </form>
            </div>

        </>
    )
}

export default AdminEditUser