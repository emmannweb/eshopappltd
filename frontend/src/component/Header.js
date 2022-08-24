import React from 'react'
import headerImage from '../images/main.png'

const Header = ({title="Title", description="Description"}) =>(

    <>
        <div className="header_wrapper">
            <img className='img-fluid header_image' src={headerImage} alt={title} />
        </div>
    </>
)

export default Header
