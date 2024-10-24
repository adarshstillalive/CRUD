import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkEmail, checkName, checkPassword } from '../utils/validator'
import adminAxiosInstance from '../utils/adminAxiosInstance'
import { fetchCurrentAdmin } from '../redux/slices/adminSlice'

const EditModalAdmin = ({userId, onClose}) => {
  const {users} = useSelector(state=>state.admin)
  const getUser = users.find(user=>user._id===userId)
  const uploadInput = useRef(null)
  const [createUserModal, setCreateUserModal] = useState(false)
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
    if(getUser){
      setUser({
        name: getUser.Name || '',
        email: getUser?.Email || '',
        password: ''
      })
    }
  },[getUser])

  const handleInputButton = (e) => {
    e.preventDefault();
    uploadInput.current.click();
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const nameError = checkName(user.name);
    const emailError = checkEmail(user.email);
    const passwordError = checkPassword(user.password);
    setUserError({name: nameError, email: emailError, password: passwordError})

    try {
      
      if(!nameError && !emailError && !passwordError){
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        if(user.password){
          formData.append('password', user.password)
        }
        if(uploadInput?.current?.files[0]){
          formData.append('profilePic', uploadInput.current.files[0])
        }
        
        const res = await adminAxiosInstance.put(`/admin/updateUser/${userId}`, formData)
        if(res.data){
          
          dispatch(fetchCurrentAdmin())
          onClose()
        }
        
      }

    } catch (error) {
      console.log(error);
      
    }
  }

  return (
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
                  onClick={onClose}
                  className="px-4 py-2 bg-red-600 rounded-2xl hover:bg-red-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-customSkyBlue rounded-2xl font-bold text-customDarkBlue p-4 hover:bg-cyan-400"
                >
                  Update user
                </button>
              </div>
            </div>
          </form>
        </div>
  )
}

export default EditModalAdmin
