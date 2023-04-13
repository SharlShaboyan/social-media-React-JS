import axios from 'axios'
import { errorMessage } from "../utils/NotifyToastHelper";

const baseURL = "http://localhost:8000";

const getToken = () => {
  return `Bearer ${localStorage.getItem("accessToken")}`
}

export default () => {
  const axiosInstance = axios.create({
      baseURL : baseURL,
      headers: {
          "authorization" : getToken()
      }
  })


  axiosInstance.interceptors.response.use((config) => {
      return config.data;
    }, function (e) {
      if(e.response.status === 401){
          errorMessage("You are not accessed rad exeq!")
      } else if(e.response.status === 0) {
          errorMessage("Network error")
      } else if(e.response.status >= 500) {
          errorMessage("Server error")
      } else {
          errorMessage("Xndir!! xndrum enq dimel dzer jeki petin!!!")
      }
      return Promise.reject(e);
    })

  return axiosInstance
}

export function loginUserAPI(url, { email, password }){
  try{
    const user = axios.post(baseURL+url, {
      email,
      password
    })
    return user
  } catch(e) {}
}