import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [validationError, setValidationError] = useState('')
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })




  return (
    <div className="bg-customBlue flex items-center justify-center rounded-b-3xl pt-40 pb-12 mb-24">
      <div className="bg-customLightBlue w-1/3 py-2 rounded-3xl">
        <div className="text-white font-bold text-xl mb-2 flex items-center justify-center"><h1>Sign Up</h1></div>
        <div className="font-semibold text-white text-xl px-2">
          <form>
            <div className=' bg-customDarkBlue flex flex-col mb-2 rounded-2xl'>
              <div className='px-4 rounded-xl w-min bg-customLightBlue m-1'>Full&nbsp;Name</div>
              <input 
                type='text'
                onChange={(e)=>setUser({...user,name: e.target.value})}
                value={user.name}
                className='bg-customDarkBlue rounded-2xl focus:outline-none text-xl py-2 pl-6'
              />
            </div>

            <div className=' bg-customDarkBlue flex flex-col mb-2 rounded-2xl'>
              <div className='px-4 rounded-xl w-min bg-customLightBlue m-1'>Email</div>
              <input 
                type='email'
                onChange={(e)=>setUser({...user, email: e.target.value})}
                value={user.email}
                className='bg-customDarkBlue rounded-2xl focus:outline-none text-xl py-2 pl-6'
              />
            </div>

            <div className=' bg-customDarkBlue flex flex-col mb-2 rounded-2xl'>
              <div className='px-4 rounded-xl w-min bg-customLightBlue m-1'>Password</div>
              <input 
                type='password'
                onChange={(e)=>setUser({...user, password: e.target.value})}
                value={user.password}
                className='bg-customDarkBlue rounded-2xl focus:outline-none text-xl py-2 pl-6'
              />
            </div>
            <button 
              type='submit'
              className='bg-customSkyBlue rounded-2xl font-bold text-customDarkBlue w-full p-4 hover:bg-cyan-400 '
              >
                Sign up
            </button>
          </form>

          <div className='p-4 text-sm flex'>
          <p>Already have account?</p><Link to='/login' className='rounded-lg px-2 ml-2 bg-customSkyBlue text-customDarkBlue'>Log in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
