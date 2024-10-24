import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { checkEmail, checkName, checkPassword } from '../utils/validator.js';
import userAxiosInstance from '../utils/userAxiosInstance.js';
import {useDispatch, useSelector} from 'react-redux';
import { setCurrentUser, setError, setLoading, setToken } from '../redux/slices/userSlice.js';

const Signup = () => {
  const dispatch = useDispatch()
  const {error, isLoading} = useSelector(state=>state.user)
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [userError, setUserError] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e)=>{
    e.preventDefault();
    dispatch(setLoading(true))

    const nameError = checkName(user.name);
    const emailError = checkEmail(user.email);
    const passwordError = checkPassword(user.password);
    setUserError({name: nameError, email: emailError, password: passwordError})
    try {

      if(!nameError && !emailError && !passwordError){
        const res = await userAxiosInstance.post('/signup',{
          user
        })
        console.log(res.data);
        
        if(res.data){
          const {userData, token} = res.data
          dispatch(setCurrentUser(userData))
          dispatch(setToken(token))
          navigate('/')
        }
      }
      
    } catch (error) {
      dispatch(setError(error.response?.data || 'Sign up failed'))
    } finally {
      dispatch(setLoading(false))
    }
  }


  return (
    <div className="bg-customBlue flex flex-col items-center justify-center rounded-b-3xl pt-20 pb-12 mb-24">
      <div className="text-white font-bold text-3xl my-4 items-center justify-center"><h1>Sign Up</h1></div>
      <div className="bg-customLightBlue w-1/3 py-2 rounded-3xl">
  
        <div className="font-semibold text-white text-xl px-2">
          <form onSubmit={(e)=>handleSubmit(e)}>
            <div className=' bg-customDarkBlue flex flex-col mb-2 rounded-2xl'>
              <div className='  flex justify-between m-1'>
                <div className='w-min  bg-customLightBlue px-4 rounded-xl'>
                  Full&nbsp;Name
                </div>
                <div className='mx-2 px-4 w-2/3 rounded-xl text-red-700 text-base'>{userError.name}</div>
              </div>
              <input
                type='text'
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                value={user.name}
                className='bg-customDarkBlue rounded-2xl focus:outline-none text-xl py-2 pl-6'
              />
            </div>

            <div className=' bg-customDarkBlue flex flex-col mb-2 rounded-2xl'>
              <div className=' justify-between flex gap-2 m-1'>
                <div className='w-min  bg-customLightBlue px-4 rounded-xl'>
                  Email
                </div>
                <div className='mx-2 px-4 w-2/3 rounded-xl text-red-700 text-base'>{userError.email}</div>
              </div>
              <input
                type='text'
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                value={user.email}
                className='bg-customDarkBlue rounded-2xl focus:outline-none text-xl py-2 pl-6'
              />
            </div>

            <div className=' bg-customDarkBlue flex flex-col mb-2 rounded-2xl'>
              <div className=' justify-between flex gap-2 m-1'>
                <div className='w-min  bg-customLightBlue px-4 rounded-xl'>
                  Password
                </div>
                <div className='mx-2 px-4 w-2/3 rounded-xl text-red-700 text-base'>{userError.password}</div>
              </div>
              <input
                type='password'
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                value={user.password}
                className='bg-customDarkBlue rounded-2xl focus:outline-none text-xl py-2 pl-6'
              />
            </div>

            <div className='py-4 text-red-500 text-lg text-center'>{error}</div>

            <button
              type='submit'
              className='bg-customSkyBlue rounded-2xl font-bold text-customDarkBlue w-full p-4 hover:bg-cyan-400 '
              disabled={isLoading}
            >
              {isLoading? 'Loading...' : 'Sign up'}
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
