import React from 'react';
import adminAxiosInstance from '../utils/adminAxiosInstance';
import { useDispatch } from 'react-redux';
import { fetchCurrentAdmin } from '../redux/slices/adminSlice';

const DeleteConfirmationAdmin = ({ userId, onClose }) => {
  const dispatch = useDispatch()

  const handleDelete = async()=>{
    try {
      
      const res = await adminAxiosInstance.delete(`/admin/deleteUser/${userId}`)
      if(res){
        dispatch(fetchCurrentAdmin());
        onClose()
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-customLightBlue rounded-2xl p-6 w-1/3 text-center shadow-md">
        <h2 className="text-white text-2xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="text-gray-300 mb-4">
          Are you sure?
        </p>
        <div className="flex justify-around">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 rounded-2xl hover:bg-red-800"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-customSkyBlue rounded-2xl hover:bg-cyan-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationAdmin;
