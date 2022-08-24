import React from 'react'
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