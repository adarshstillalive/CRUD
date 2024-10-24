import React, { useEffect, useRef, useState } from 'react'
import { RiUserAddLine } from "react-icons/ri";
import { MdLogout } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { fetchCurrentAdmin, setAdminLogout } from '../redux/slices/adminSlice';
import { checkEmail, checkName, checkPassword } from '../utils/validator';
import adminAxiosInstance from '../utils/adminAxiosInstance';

const HeaderAdmin = () => {
  const uploadInput = useRef(null)
  const [createUserModal, setCreateUserModal] = useState(false)
  const [searchBar, setSearchBar] = useState(null)
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
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchCurrentAdmin(searchBar))
  },[searchBar])
  
  const handleLogout = () => {
    dispatch(setAdminLogout());

  }
  const handleInputButton = (e) => {
    e.preventDefault()
    uploadInput.current.click()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameError = checkName(user.name);
    const emailError = checkEmail(user.email);
    const passwordError = checkPassword(user.password);
    setUserError({name: nameError, email: emailError, password: passwordError})
    try {
      if(!nameError && !emailError && !passwordError){
        const formData = new FormData();
        formData.append('name',user.name);
        formData.append('email',user.email);
        formData.append('password',user.password);
        if(uploadInput?.current?.files[0]){
          formData.append('profilePic', uploadInput.current.files[0])
        }

        const res = await adminAxiosInstance.post('/admin/createUser', formData)
        if(res?.data){
          setUser({name:'', email:'', password:''})
          dispatch(fetchCurrentAdmin())
          setCreateUserModal(false)
        }
      }
      
    } catch (error) {
      console.log(error);
      
    }
    

  }

  return (
    <>
      <div className="absolute top-8 w-10/12 px-12 flex items-center justify-between bg-customLightBlue rounded-full mx-32 h-16 z-50">
        <button onClick={()=>setCreateUserModal(true)} className='flex hover:bg-customBlue p-3 text-white text-lg font-bold rounded-3xl'>
          Create user
          <RiUserAddLine className='text-white text-2xl hover:text-gray-300' />

        </button>
        <input 
          className='h-full w-1/2 text-white text-lg px-4 font-bold bg-customDarkBlue focus:outline-none'
          placeholder='Search'
          value={searchBar}
          onChange={(e)=>setSearchBar(e.target.value)}
          ></input>
        <button onClick={handleLogout} className='flex hover:bg-customBlue p-3 rounded-3xl'>
          <MdLogout className='text-white text-2xl hover:text-gray-300' />
        </button>
      </div>
      {createUserModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="bg-customLightBlue w-1/3 p-4 rounded-3xl flex justify-center items-center gap-4"
          >
            <div className="w-36 h-36 rounded-full border-2 flex justify-center items-center bg-customBlue border-white">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                name="profilePic"
                ref={uploadInput}
              />
                <button
                  onClick={handleInputButton}
                  className="text-2xl rounded-full hover:bg-customSkyBlue w-full h-full text-white font-normal"
                >
                  Image
                </button>
            </div>

            <div className="font-semibold text-white text-xl px-2 w-full">
              <div className="bg-customDarkBlue flex flex-col mb-2 rounded-2xl">
                <div className="flex justify-between m-1">
                  <div className="w-min bg-customLightBlue px-4 rounded-xl">Full&nbsp;Name</div>
                  <div className="mx-2 px-4 w-2/3 rounded-xl text-red-700 text-sm">
                    {userError.name}
                  </div>
                </div>
                <input
                  type="text"
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  value={user.name}
                  className="bg-customDarkBlue rounded-2xl focus:outline-none text-xl py-2 pl-6"
                />
              </div>

              <div className="bg-customDarkBlue flex flex-col mb-2 rounded-2xl">
                <div className="flex justify-between gap-2 m-1">
                  <div className="w-min bg-customLightBlue px-4 rounded-xl">Email</div>
                  <div className="mx-2 px-4 w-2/3 rounded-xl text-red-700 text-sm">
                    {userError.email}
                  </div>
                </div>
                <input
                  type="text"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  value={user.email}
                  className="bg-customDarkBlue rounded-2xl focus:outline-none text-xl py-2 pl-6"
                />
              </div>

              <div className="bg-customDarkBlue flex flex-col mb-2 rounded-2xl">
                <div className="flex justify-between gap-2 m-1">
                  <div className="w-min bg-customLightBlue px-4 rounded-xl">Password</div>
                  <div className="mx-2 px-4 w-2/3 rounded-xl text-red-700 text-sm">
                    {userError.password}
                  </div>
                </div>
                <input
                  type="password"
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  value={user.password}
                  className="bg-customDarkBlue rounded-2xl focus:outline-none text-xl py-2 pl-6"
                />
              </div>

              <div className="py-4 text-red-500 text-lg text-center"></div>
              <div className="flex justify-around">
                <button
                  type="button"
                  onClick={() => setCreateUserModal(false)}
                  className="px-4 py-2 bg-red-600 rounded-2xl hover:bg-red-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-customSkyBlue rounded-2xl font-bold text-customDarkBlue p-4 hover:bg-cyan-400"
                >
                  Create user
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

    </>
  )
}

export default HeaderAdmin
