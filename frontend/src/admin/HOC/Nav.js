import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logOut } from '../../action/userAction';


const Nav = () => {
    const { isAuthenticated, error, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const history = useHistory()
    // console.log("history", history);

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
            <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div className="container-fluid">
                    <div className="navbar-wrapper">
                        <Link className="navbar-brand" to="javascript:;">Dashboard</Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="navbar-toggler-icon icon-bar" />
                        <span className="navbar-toggler-icon icon-bar" />
                        <span className="navbar-toggler-icon icon-bar" />
                    </button>
                    <div className="collapse navbar-collapse justify-content-end">
                        {/* <form className="navbar-form">
                            <div className="input-group no-border">
                                <input type="text" defaultValue className="form-control" placeholder="Search..." />
                                <button type="submit" className="btn btn-white btn-round btn-just-icon">
                                    <i className="material-icons">search</i>
                                    <div className="ripple-container" />
                                </button>
                            </div>
                        </form> */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="javascript:;">
                                    <i className="material-icons">dashboard</i>
                                    <p className="d-lg-none d-md-block">
                                        Stats
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link" to="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="material-icons">notifications</i>
                                    <span className="notification">5</span>
                                    <p className="d-lg-none d-md-block">
                                        Some Actions
                                    </p>
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                    <Link className="dropdown-item" to="#">Mike John responded to your email</Link>
                                    <Link className="dropdown-item" to="#">You have 5 new tasks</Link>
                                    <Link className="dropdown-item" to="#">You're now friend with Andrew</Link>
                                    <Link className="dropdown-item" to="#">Another Notification</Link>
                                    <Link className="dropdown-item" to="#">Another One</Link>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link" to="javascript:;" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {
                                        user.avatar ?
                                            <>
                                                <img className="rounded-circle" height="30" src={user.avatar ? user.avatar : ''} alt={user.name} />
                                            </>
                                            :
                                            <>
                                                <i className="material-icons">person</i>
                                            </>
                                    }
                                    <p className="d-lg-none d-md-block">
                                        Account
                                    </p>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
                                    <Link className="dropdown-item" to="/user/dashboard">Profile</Link>
                                    {/* <Link className="dropdown-item" to="#">Settings</Link> */}
                                    <div className="dropdown-divider" />
                                    <span onClick={logOutUser} style={{ cursor: "pointer" }} className="dropdown-item" >Log out</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav