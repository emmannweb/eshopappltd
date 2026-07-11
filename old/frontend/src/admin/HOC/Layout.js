import React from 'react'
import '../assets/css/dashboard.min.css'
import '../assets/css/demo.css'

import Footer from './Footer'
import Nav from './Nav'
import Sidebar from './Sidebar'

const Layout = (Component) => ({ ...props }) => {
    return (
        <>
            <div className="wrapper">
                <Sidebar />
                <div className="main-panel">
                    <Nav />
                    <div className="content">
                        <Component {...props} />
                    </div>
                    <Footer />

                </div>
            </div>
        </>
    )
}

export default Layout