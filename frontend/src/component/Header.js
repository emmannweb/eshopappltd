import React from 'react'
import mainImage from '../images/main.png'

const Header = ({title="Title", description="Description"}) =>(

    <img className='img-fluid' src={mainImage} alt={title} />
)

export default Header
