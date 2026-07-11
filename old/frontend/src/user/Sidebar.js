import React from 'react'
import {Link} from 'react-router-dom'

const Sidebar = ({id}) => {

    //console.log({id});
    return (
        <>
            <header>
                  
                  <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
                      <div className="position-sticky">
                          <div className="list-group list-group-flush mx-3 mt-4">
                              <Link to="/user/dashboard" className="list-group-item list-group-item-action py-2 ripple" aria-current="true">
                                  <i className="fas fa-user-circle fa-fw me-3"></i><span>user Information</span>
                              </Link>
                          
                              <Link to={`/user/dashboard/edit/${id}`} className="list-group-item list-group-item-action py-2 ripple"><i
                                  className="fas fa-edit fa-fw me-3"></i><span>Edit info</span>
                              </Link>
                          
                          
                              <Link to='/user/dashboard/orders' className="list-group-item list-group-item-action py-2 ripple"><i
                                  className="fas fa-chart-bar fa-fw me-3"></i><span>Orders history</span>
                              </Link>   
                          </div>
                      </div>
                  </nav>
              
              </header>  
        </>
    )
}

export default Sidebar
