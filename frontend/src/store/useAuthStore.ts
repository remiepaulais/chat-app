import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { isAxiosError } from 'axios'
import { SignUpFormData } from '../pages/SignUpPage'
import { LogInFormData } from '../pages/LoginPage'

interface AuthStore {
  authUser: unknown
  isSigningUp: boolean
  isLoggingIn: boolean
  isUpdatingProfile: boolean
  isCheckingAuth: boolean
  checkAuth: () => Promise<void>
  signUp: (data: SignUpFormData) => Promise<void>
  logOut: () => Promise<void>
  logIn: (data: LogInFormData) => Promise<void>
}

export const useAuthStore = create<AuthStore>()((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check')
      set({ authUser: res.data })
    } catch (error) {
      console.log('Error in checkAuth:', error)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true })
    try {
      const res = await axiosInstance.post('/auth/signup', data)
      set({ authUser: res.data })
      toast.success('Account created successfully!')
    } catch (error: unknown) {
      console.log('Error in signUp:', error)
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message)
      } else {
        toast.error('An error occurred during sign up')
      }
    } finally {
      set({ isSigningUp: false })
    }
  },

  logOut: async () => {
    try {
      await axiosInstance.post('/auth/logout')
      set({ authUser: null })
      toast.success('Logged out successfully!')
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message)
      }
      toast.error('An error occurred during logout')
      console.log('Error in logout:', error)
    }
  },

  logIn: async (data) => {
    set({ isLoggingIn: true })
    try {
      const res = await axiosInstance.post('/auth/login', data)
      set({ authUser: res.data })
      toast.success('Logged in successfully!')
    } catch (error: unknown) {
      console.log('Error in logIn:', error)
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message)
      } else {
        toast.error('An error occurred during login')
      }
    } finally {
      set({ isLoggingIn: false })
    }
  }
}))
