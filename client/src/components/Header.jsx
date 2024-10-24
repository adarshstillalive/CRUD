import React from 'react'
import { Link } from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {MdLogout} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from '../redux/slices/userSlice'

const Header = () => {
  const dispatch = useDispatch()
  const {currentUser} = useSelector(state=>state.user)
  const handleLogout = ()=>{
    dispatch(setLogout());

  }

  return (
    <div className="absolute top-8 w-10/12 px-12 flex items-center justify-between bg-customLightBlue rounded-full mx-32 h-16 z-50">
      <Link to='/' className='text-white font-bold text-xl hover:text-gray-300'>
        Home
      </Link>
      <Link to='/profile' className='flex hover:bg-customBlue p-3 rounded-3xl'>
        <FaUser className='text-white text-2xl hover:text-gray-300' />
        <h2 className='pl-2 text-white font-semibold'>{currentUser?.Name}</h2>
      </Link>
      <button onClick={handleLogout} className='flex hover:bg-customBlue p-3 rounded-3xl'>
        <MdLogout className='text-white text-2xl hover:text-gray-300' />
      </button>
    </div>
  )
}

export default Header
