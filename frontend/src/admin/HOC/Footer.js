import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="container-fluid">
                    <nav className="float-left">
                        <ul>
                            <li>
                                <Link href="#">
                                    Home
                                </Link>
                            </li>

                        </ul>
                    </nav>
                    <div className="copyright float-right">
                        ©2022
                        , made with <i className="material-icons">favorite</i> by
                        <a href="https://github.com/emmannweb" target="_blank">Emmannweb</a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer