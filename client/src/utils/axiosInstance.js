import axios from "axios";
import appStore from "../redux/appStore";

const axiosInstance = axios.create({
  baseURL:"http://localhost:3000",
  withCredentials: true
})

axiosInstance.interceptors.request.use(config=>{
  const token = appStore.getState().user.token;
  if(token){
    config.headers.Authorization = token;
  }
  return config
})

export default axiosInstance;