import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { checkEmail, checkPassword } from '../utils/validator'
import axiosInstance from '../utils/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser, setError, setLoading, setToken } from '../redux/user/userSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {error, isLoading} = useSelector(state=>state.user)
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const [userError, setUserError] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e)=>{

    e.preventDefault();
    dispatch(setLoading(true))
    const emailError = checkEmail(user.email);
    const passwordError = checkPassword(user.password);

    setUserError({email: emailError, password: passwordError})

    try {
      if(!emailError && !passwordError){
        const response = await axiosInstance.post('/login',{user});
        if(response){
          const {userData, token} = response.data
          
          dispatch(setCurrentUser(userData));
          dispatch(setToken(token))
          navigate('/')
        }
      }
    } catch (error) {
      dispatch(setError(error.response?.data || 'Login failed'))
      console.log(error);
      
    } finally {
      dispatch(setLoading(false))
    }

  }


  return (
    <div className="bg-customBlue flex flex-col items-center justify-center rounded-b-3xl pt-20 pb-12 mb-24">
      <div className="text-white font-bold text-3xl my-4 flex items-center justify-center"><h1>Login</h1></div>
      <div className="bg-customLightBlue w-1/3 py-2 rounded-3xl">

        <div className="font-semibold text-white text-xl px-2">
          <form onSubmit={(e)=>handleSubmit(e)}>
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
              {isLoading? 'Loading...' : 'Login'}
            </button>
          </form>

          <div className='p-4 text-sm flex'>
            <p>New to here?</p><Link to='/signup' className='rounded-lg px-2 ml-2 bg-customSkyBlue text-customDarkBlue'>Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
