import React,  { useEffect, useState } from 'react'
import Menu from '../component/Menu'
import Footer from '../component/Footer'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'


const UserDashboard =  ({history}) => {

    const {isAuthenticated} = useSelector(state => state.auth);

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        avatar: "",
        role: ""
    })
    const {name, email, role, avatar, createdAt, _id} = profile
    // try {
    //     const getUser = async ()=>{
    //         const {data} =  await axios.get('/api/getme')
    //         // setProfile(data)
    //         console.log(profile.user.name)
    //         getUser();
    //     }
      
    // } catch (error) {
    //     console.log(error)
    // }v

  
   useEffect(()=>{

       if (!isAuthenticated){
        history.push('/signin');
       }

    fetch('/api/getme')
    .then(res =>{
       return  res.json()
    })
    .then(result =>{
        // console.log(result.user)
        setProfile(result.user)
    })
    .catch(error =>{
        console.log(error) 
    })
   },[isAuthenticated])

    // fetch('/api/getme')
    // .then(response=>{
    //     return response.json()
    // })
    // .then(user =>console.log(user))
    // .catch(error => (
    //     console.log(error)v
    //  ))

 
    return (
        <div>
            <Menu />
        
                <Sidebar id={_id}/>
            
          

                 <div className="container py-5">
                     
                     <div className="profile">
                        {/* <h2 className="text-center">User Info</h2> */}
                        <img src={avatar ? avatar : ""} alt={name} className='dash_profile' />
                         <ul className="list-group list-group-flush">
                            <li className="list-group-item"><b>Name:</b> {name}</li>
                            <li className="list-group-item"><b>E-mail:</b> {email}</li>
                            <li className="list-group-item"><b>Join at:</b> {new Date(createdAt).toLocaleDateString()}</li>
                            <li className="list-group-item"><b>Status:</b> {role === 1 ? 'Admin' : 'Registred user'}</li>
                         </ul>
                     </div>
                 </div>

           
            <Footer />
        </div>
    )
}

export default UserDashboard

// export const isAuthenticated = () => {
//     if (typeof window == 'undefined') {
//         return false;
//     }
//     if (localStorage.getItem('jwt')) {
//         return JSON.parse(localStorage.getItem('jwt'));
//     } else {
//         return false;
//     }
// };