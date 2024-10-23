import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';


const getInitialToken = () => {
  try {
    return localStorage.getItem('token') || null;
  } catch {
    return null;
  }
};

const userSlice = createSlice({
  name:'user',
  initialState: {
    users:  [],
    currentUser: null,
    token: getInitialToken(),
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
  },
  extraReducers: (builder)=>{
    builder
    .addCase(fetchCurrentUser.pending, (state)=>{
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchCurrentUser.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null
    })
    .addCase(fetchCurrentUser.rejected, (state, action)=>{
      state.isLoading = false;
      state.currentUser = null;
      state.error = action.payload;
    })
  }
})

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (_, {rejectWithValue})=>{
    try {
      const token = localStorage.getItem('token')|| null
      if(!token) return rejectWithValue('No Token Found')

        const res = await axiosInstance.get('/currentUser')
        return res.data
        
    } catch (error) {
      localStorage.removeItem('token');
      return rejectWithValue(error.response?.data || 'Failed to fetch the user')
    }
  }
)

export const {
  setUsers, 
  setCurrentUser, 
  setToken, 
  setError, 
  setLoading, 
  setLogout
} = userSlice.actions

export default userSlice.reducer;