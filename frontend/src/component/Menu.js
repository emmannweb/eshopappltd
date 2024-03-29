import React, { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
//import toast from 'react-hot-toast';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../action/userAction'
import avatar from '../images/avatar.png'
import SearchBox from './SearchBox';



const Menu = ({ history }) => {

    const { cartItems } = useSelector(state => state.cart);

    const { isAuthenticated, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logOutUser = () => {

        dispatch(logOut());
        toast.success('Log out successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        history.push('/signin');
    }



    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid mobile_nav">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation" >
                        <i className="fas fa-bars"></i>
                    </button>


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <Link className="navbar-brand mt-2 mt-lg-0" to="#">

                        </Link>

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            {
                                isAuthenticated ? (<>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/user/dashboard"><i className="fas fa-tachometer-alt fa-fw me-3"></i>Dashboard </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/"><i className="fas fa-home fa-fw me-3"></i>Home </Link>
                                    </li>

                                </>) : (<>


                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Home </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signup">Sign Up </Link>
                                    </li>
                                </>)
                            }
                        </ul>
                    </div>
                    {/* search box */}
                    <SearchBox history={history} />

                    <div className="d-flex align-items-center test">
                        {/* search box */}
                        <Link className="text-reset " to={'/cart'}>
                            <i className="fas fa-shopping-cart"></i> <span className="cart_text" style={{ fontSize: "12px" }}>Cart </span> <span className="cart_style">{cartItems.length > 0 ? cartItems.length : 0}</span>
                        </Link>


                        <Link
                            className="text-reset me-3 dropdown-toggle hidden-arrow"
                            to="#"
                            id="navbarDropdownMenuLink"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {/* <i className="fas fa-bell"></i> */}
                            {/* <span className="badge rounded-pill badge-notification bg-danger">1</span> */}
                        </Link>



                        <Link
                            className="dropdown-toggle d-flex align-items-center hidden-arrow"
                            to="#"
                            id="navbarDropdownMenuLink"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span className="username"> {user ? user.name : 'Sign In'}</span>
                            <img
                                src={user && user.avatar ? user.avatar : avatar}
                                className="rounded-circle"
                                height="25"
                                alt=""
                                loading="lazy"
                            />
                        </Link>
                        <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="navbarDropdownMenuLink"
                        >
                            <li>
                                <Link className="dropdown-item" to="/user/dashboard">My profile</Link>
                            </li>

                            <li>
                                <Link className="dropdown-item" to="/admin/dashboard">Admin Dashboard</Link>
                            </li>
                            {
                                user && user.name ? (
                                    <li>
                                        <span className="dropdown-item" onClick={logOutUser}>Logout</span>
                                    </li>
                                ) : ''
                            }

                        </ul>
                    </div>

                </div>
            </nav>
        </>

    )
}

export default withRouter(Menu)
