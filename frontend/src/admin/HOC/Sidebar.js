import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Sidebar = () => {

    const { isAuthenticated, error, user } = useSelector(state => state.auth);

    const location = useLocation();
    const { pathname } = location;

    //active link dynamically
    const activeLink = (pathname, path) => {
        const active = 'nav-item  active';
        return pathname === path ? active : 'nav-item';
    }


    return (
        <>
            <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
                <div className="logo"><Link to="/" className="simple-text logo-normal">
                    Eshopapp ltd
                </Link></div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        {
                            user.role == 0 ?
                                <>
                                    <li className={activeLink(pathname, '/user/dashboard')} >
                                        <Link className="nav-link " to="/user/dashboard">
                                            <i className="material-icons">dashboard</i>
                                            <p>Dashboard</p>
                                        </Link>
                                    </li>
                                    <li className={activeLink(pathname, `/user/dashboard/edit/${user._id}`)}>
                                        <Link className="nav-link" to={`/user/dashboard/edit/${user._id}`} >
                                            <i className="material-icons">person</i>
                                            <p>Edit Profile</p>
                                        </Link>
                                    </li>
                                    <li className={activeLink(pathname, '/user/dashboard/orders')}>
                                        <Link className="nav-link" to="/user/dashboard/orders" >
                                            <i className="material-icons">library_books</i>
                                            <p>Orders</p>
                                        </Link>
                                    </li>
                                </> :
                                <>
                                    <li className={activeLink(pathname, '/admin/dashboard')} >
                                        <Link className="nav-link " to="/admin/dashboard">
                                            <i className="material-icons">dashboard</i>
                                            <p>Dashboard</p>
                                        </Link>
                                    </li>

                                    <li className={activeLink(pathname, '/admin/products')}>
                                        <Link className="nav-link" to="/admin/products">
                                            <i className="material-icons">content_paste</i>
                                            <p>Product</p>
                                        </Link>
                                    </li>
                                    <li className={activeLink(pathname, '/admin/product/categories')}>
                                        <Link className="nav-link" to="/admin/product/categories">
                                            <i className="material-icons">bubble_chart</i>
                                            <p>Category</p>
                                        </Link>
                                    </li>
                                    <li className={activeLink(pathname, '/admin/dashboard/orders')} >
                                        <Link className="nav-link" to="/admin/dashboard/orders">
                                            <i className="material-icons">library_books</i>
                                            <p>Orders</p>
                                        </Link>
                                    </li>
                                    <li className={activeLink(pathname, '/admin/users')}>
                                        <Link className="nav-link" to="/admin/users" >
                                            <i className="material-icons">group</i>
                                            <p>Users</p>
                                        </Link>
                                    </li>
                                    {/* <li className="nav-item ">
                                        <Link className="nav-link" to="./map.html">
                                            <i className="material-icons">location_ons</i>
                                            <p>Maps</p>
                                        </Link>
                                    </li> */}
                                    {/* <li className="nav-item ">
                                        <Link className="nav-link" to="./rtl.html">
                                        <i className="material-icons">language</i>
                                        <p>RTL Support</p>
                                        </Link>
                                        </li>
                                        <li className="nav-item active-pro ">
                                        <Link className="nav-link" to="./upgrade.html">
                                        <i className="material-icons">unarchive</i>
                                        <p>Upgrade to PRO</p>
                                        </Link>
                                    </li> */}
                                </>
                        }


                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar