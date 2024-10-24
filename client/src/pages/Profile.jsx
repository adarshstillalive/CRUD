import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userAxiosInstance from '../utils/userAxiosInstance';
import { setCurrentUser, setError, setLoading } from '../redux/slices/userSlice';

const Profile = () => {
  const dispatch = useDispatch()
  const {currentUser, isLoading} = useSelector(state=>state.user)
  const uploadInput = useRef(null);

  const handleInputButton = ()=>{
    uploadInput.current.click();
  }

  const handleInput = (e)=>{
    console.log(e.target.files[0]);
    dispatch(setLoading(true))
    
    handleImageUpload(e.target.files[0])
  }

  const handleImageUpload = async (image)=>{

    const formData = new FormData;
    formData.append('profilePic', image)

    try {
      console.log(formData);
      
      
      const res = await userAxiosInstance.post('/uploadProfileImage', formData, {
        headers: {
          'Content-Type': 'multipart-form-data',
        }
      })
      const {user} = res.data
      dispatch(setCurrentUser(user))

    } catch (error) {
      dispatch(setError(error.response?.data || 'Upload failed'))
    } finally {
      dispatch(setLoading(false))
    }

  }

  return (
    <div className="bg-customBlue flex flex-col items-center justify-center rounded-b-3xl pt-28 pb-12 mb-24">
      <div className="text-white font-bold text-3xl my-4 flex items-center justify-center"><h1>Hi, {currentUser.Name}</h1></div>
      <div className="bg-customLightBlue w-2/3 py-8 flex flex-col items-center justify-center rounded-3xl">
        <div className="w-48 h-48 rounded-full border-2 flex justify-center items-center bg-customBlue border-white">
          <input 
            type='file'
            className="hidden"
            name='profilePic'
            ref={uploadInput}
            onChange={handleInput}
          />
          {isLoading && <div className="text-white">Loading...</div>}
          {!currentUser?.ProfilePic && !isLoading && <button onClick={handleInputButton} className='text-5xl rounded-full hover:bg-customSkyBlue w-full h-full text-white font-normal'>+</button>}
          {currentUser?.ProfilePic && <img alt="User image" src={`http://localhost:3000${currentUser.ProfilePic}`} className='w-full h-full object-cover rounded-full'></img>}
        </div>
        <div className='w-5/6 my-12 '>
          <div className='py-4 mb-4 flex rounded-2xl bg-customBlue text-white text-xl font-bold'>
              <div className='border-r-2 w-1/6 px-2 text-center border-white'>Full name </div>
              <input 
                className='bg-customBlue cursor-default pl-6 focus:outline-none font-medium' 
                value={currentUser.Name}
                readOnly
                />
          </div>

          <div className='py-4 mb-4 flex rounded-2xl bg-customBlue text-white text-xl font-bold'>
              <div className='border-r-2 w-1/6 px-2 text-center border-white'>Email </div>
              <input 
                className='bg-customBlue cursor-default pl-6 focus:outline-none font-medium' 
                value={currentUser.Email}
                readOnly
                />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
