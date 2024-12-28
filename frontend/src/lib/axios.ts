import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:7913/api',
  withCredentials: true
})
