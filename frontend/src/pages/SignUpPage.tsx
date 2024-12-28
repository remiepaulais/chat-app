import { FormEvent, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Loader2, Lock, MessageSquare, User } from 'lucide-react'
import { Link } from 'react-router'
import AuthImagePattern from '../components/AuthImagePattern'
import toast from 'react-hot-toast'

export interface SignUpFormData {
  fullName: string
  email: string
  password: string
}

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: '',
    email: '',
    password: ''
  })

  const { signUp, isSigningUp } = useAuthStore()

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error('Full name is required')
    if (!formData.email.trim()) return toast.error('Email is required')
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error('Invalid email')
    if (!formData.password.trim()) return toast.error('Password is required')
    if (formData.password.length < 8)
      return toast.error('Password must be at least 8 characters')

    return true
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const success = validateForm()
    if (success === true) {
      signUp(formData)
    }
  }

  return (
    <div className='grid min-h-screen lg:grid-cols-2'>
      {/* Left Side */}
      <div className='flex flex-col items-center justify-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* Logo */}
          <div className='group flex flex-col items-center gap-2'>
            <div className='flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20'>
              <MessageSquare className='size-6 text-primary' />
            </div>
            <h1 className='mt-2 text-2xl font-bold'>Create Account</h1>
            <p className='text-base-content/60'>
              Get started with your free account!
            </p>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className='space-y-6'>
            {/* Full Name Input */}
            <div className='form-control'>
              <label htmlFor='fullName' className='label'>
                <span className='label-text font-medium'>Full Name</span>
              </label>
              <div className='relative'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                  <User className='size-5 text-base-content/40' />
                </div>
                <input
                  type='text'
                  className='input input-bordered w-full pl-10'
                  placeholder='John Doe'
                  id='fullName'
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email Input */}
            <div className='form-control'>
              <label htmlFor='email' className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                  <User className='size-5 text-base-content/40' />
                </div>
                <input
                  type='email'
                  className='input input-bordered w-full pl-10'
                  placeholder='you@example.com'
                  id='email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password Input */}
            <div className='form-control'>
              <label htmlFor='password' className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                  <Lock className='size-5 text-base-content/40' />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='input input-bordered w-full pl-10'
                  placeholder='••••••••'
                  id='password'
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type='button'
                  className='absolute right-0 top-0 flex h-full items-center justify-center pr-3'
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label='Toggle password visibility'
                >
                  {showPassword ? (
                    <EyeOff className='size-5 text-base-content/40' />
                  ) : (
                    <Eye className='size-5 text-base-content/40' />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='btn btn-primary w-full'
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className='size-5 animate-spin' />
                  Loading ...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className='text-center'>
            <p className='text-base-content/60'>
              Already have an account?{' '}
              <Link to='/login' className='link link-primary'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <AuthImagePattern
        title='Join our community'
        subtitle='Connect with friends, share moments, and stay in touch!'
      />
    </div>
  )
}
export default SignUpPage
