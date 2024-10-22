import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name:'user',
  initialState: {
    users:  [],
    currentUser: null,
    token: localStorage.getItem('token'),
    isAdmin: false,
    isLoading: false,
    error: null
  },
  reducers: {

    setUsers: (state, action)=>{
      state.users = action.payload
    },
    setCurrentUser: (state, action)=>{
      state.currentUser = action.payload;
      state.isAdmin = action.payload?.IsAdmin===true
    },
    setToken: (state, action)=>{
      state.token = action.payload;
      localStorage.setItem('token', action.payload)
    },
    setError: (state, action)=>{
      state.error = action.payload
    },
    setLoading: (state, action)=>{
      state.isLoading = action.payload
    },
    setLogout: (state, action)=>{
      state.currentUser = null;
      state.isAdmin = false;
      state.token = null;
      localStorage.removeItem('token')
    }
  }
})

export const {
  setUsers, 
  setCurrentUser, 
  setToken, 
  setError, 
  setLoading, 
  setLogout
} = userSlice.actions

export default userSlice.reducer;