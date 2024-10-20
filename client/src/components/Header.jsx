import React from 'react'
import { Link } from 'react-router-dom'
import {FaUser} from 'react-icons/fa'

const Header = () => {
  return (
    <div className="absolute top-8 w-10/12 px-12 flex items-center justify-between bg-customLightBlue rounded-full mx-32 h-16 z-50">
      <Link to='/' className='text-white font-bold text-xl hover:text-gray-300'>
        Home
      </Link>
      <Link to='/profle'>
        <FaUser className='text-white text-2xl hover:text-gray-300' />
      </Link>
    </div>
  )
}

export default Header
