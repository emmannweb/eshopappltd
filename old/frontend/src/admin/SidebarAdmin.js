import React from 'react';
import {Link} from 'react-router-dom'

const SidebarAdmin = () => (
    <header>
 
    <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
        <div className="position-sticky">
            <div className="list-group list-group-flush mx-3 mt-4">
                <Link to="/admin/dashboard" className="list-group-item list-group-item-action py-2 ripple" aria-current="true">
                    <i className="fab fa-product-hunt me-3"></i><span>Products</span>
                </Link>


                <Link to="/admin/product/categories" className="list-group-item list-group-item-action py-2 ripple" aria-current="true">
                    <i className="fas fa-list-alt fa-fw me-3"></i><span>Categories</span>
                </Link>

                <Link to="/admin/dashboard/orders" className="list-group-item list-group-item-action py-2 ripple"><i
                    className="fas fa-chart-bar fa-fw me-3"></i><span>Orders</span></Link>

                <Link to="/admin/users" className="list-group-item list-group-item-action py-2 ripple"><i
                    className="fas fa-users fa-fw me-3"></i><span>Users</span></Link>
            
                <Link to="#" className="list-group-item list-group-item-action py-2 ripple"><i
                    className="fas fa-chart-line fa-fw me-3"></i><span>Analytics</span></Link>
            
            </div> 
        
        </div>
    </nav>
   
</header>  
)

export default SidebarAdmin;
