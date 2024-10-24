import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FiEdit, FiTrash } from 'react-icons/fi';
import EditModalAdmin from '../components/EditModalAdmin';
import DeleteConfirmationAdmin from '../components/DeleteConfirmationAdmin';

const AdminDashboard = () => {
  const { users } = useSelector(state => state.admin)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [userId, setUserId] = useState(null)

  const handleEdit = (userId)=>{
    setUserId(userId);
    setEditModalOpen(true)
  }

  const handleDelete = (userId)=>{
    setUserId(userId);
    setDeleteModalOpen(true);
  }

  return (
    <div className="bg-customBlue flex flex-col items-center justify-center rounded-b-3xl pt-28 pb-12 mb-24">
      <div className="text-white font-bold text-3xl my-4 flex items-center justify-center"><h1>Users</h1></div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8'>
        {users.length > 0 ? users.map(user => (
          <div key={user._id} className="min-w-[250px] h-72 rounded-2xl bg-customLightBlue shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out relative">
      
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                className="p-1 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-200"
                onClick={() => handleEdit(user._id)}
              >
                <FiEdit className="text-white text-xl" />
              </button>
              <button
                className="p-1 bg-red-600 rounded-full hover:bg-red-500 transition duration-200"
                onClick={() => handleDelete(user._id)}
              >
                <FiTrash className="text-white text-xl" />
              </button>
            </div>

            <div className="h-1/2 w-full flex justify-center items-center mt-4">
              <img
                alt='User image'
                src={`http://localhost:3000${user?.ProfilePic || '/uploads/userAvatar.png'}`}
                className="rounded-full object-cover border-4 border-white w-28 h-28 shadow-md"
              />
            </div>

            <div className="text-center mt-4">
              <h2 className="text-white text-xl font-semibold">{user?.Name}</h2>
              <p className="text-gray-300 text-sm">{user?.Email}</p>
            </div>
          </div>
        )) : (
          <div className="text-white border-white border-2 font-bold text-3xl my-4 flex items-center justify-center">
            <h1>No Users</h1>
          </div>
        )}
      </div>
        {editModalOpen && (
          <EditModalAdmin
            userId={userId}
            onClose={()=>setEditModalOpen(false)}
            />
        )}

        {deleteModalOpen && (
          <DeleteConfirmationAdmin
            userId={userId}
            onClose={()=>setDeleteModalOpen(false)}
          />
        )}

    </div>
  )
}

export default AdminDashboard
