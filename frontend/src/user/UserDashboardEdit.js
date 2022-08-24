import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Menu from '../component/Menu'
import Footer from '../component/Footer'
import Sidebar from './Sidebar'
import { toast } from 'react-toastify'

const UserDashboardEdit = ({ match, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");


    // console.log(match);

    //axios.put(`/api/user/dashboard/edit/${match.params.id}`)

    // //FETCH USER FROM THE BACKEND IN THE FORM
    useEffect(() => {
        axios.get(`/api/user/${match.params.id}`)
            .then((res) => {
                // console.log(res.data.user);
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

        axios.put(`/api/user/dashboard/edit/${match.params.id}`, { name, email, avatar })
            .then(function (response) {
                if (response) {
                    //console.log(response);
                    toast.success(`User name: ${name}, was updated`);
                    history.push('/user/dashboard');
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.error(error.message);
            });
    }


    return (
        <>

            <div className="container custom_class">
                <h2 className="signup_title ">EDIT USER INFO</h2>
                <form className=" col-sm-6 offset-3 pt-5 signup_form " encType="multipart/form-data">

                    <div className="form-outline mb-4">
                        <input onChange={(e) => setName(e.target.value)} type="text" id="form4Example1" className="form-control" value={name} />
                        <label className="form-label" htmlFor="form4Example1">Name</label>
                    </div>


                    <div className="form-outline mb-4">
                        <input onChange={(e) => setEmail(e.target.value)} type="text" id="form4Example2" className="form-control" value={email} />
                        <label className="form-label" htmlFor="form4Example2">E-mail </label>
                    </div>


                    <div className="form-outline mb-4">
                        <input onChange={handleImage} type="file" id="formupload" name="image" className="form-control" />
                        <label className="form-label" htmlFor="form4Example2">Image</label>
                    </div>

                    <img className="img-fluid" alt={name} src={avatar} style={{ marginBottom: "15px" }} />

                    <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mb-4">Update user</button>

                </form>
            </div>
        </>

    )
}

export default UserDashboardEdit