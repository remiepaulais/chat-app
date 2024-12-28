import { LogOut, MessageSquare, Settings, User } from 'lucide-react'
import { Link } from 'react-router'
import { useAuthStore } from '../store/useAuthStore'

const Navbar = () => {
  const { authUser, logOut } = useAuthStore()
  return (
    <header className='fixed top-0 z-40 w-full border-b border-base-300 bg-base-100 bg-base-100/80 backdrop-blur-lg'>
      <div className='container mx-auto h-16 px-4'>
        <div className='flex h-full items-center justify-between'>
          <Link
            to='/'
            className='flex items-center gap-2.5 transition-all hover:opacity-80'
          >
            <div className='flex size-9 items-center justify-center rounded-lg bg-primary/10'>
              <MessageSquare className='size-5 text-primary' />
            </div>
            <h3 className='text-lg font-bold'>ChatMe</h3>
          </Link>
          <div className='flex items-center gap-2'>
            <Link to='/settings' className='btn btn-sm gap-2 transition-colors'>
              <Settings className='size-4' />
              <span className='hidden lg:inline'>Settings</span>
            </Link>

            {authUser ? (
              <>
                <Link to='/profile' className='btn btn-sm gap-2'>
                  <User className='size-5' />
                  <span className='hidden lg:inline'>Profile</span>
                </Link>

                <button className='flex items-center gap-2' onClick={logOut}>
                  <LogOut className='size-5' />
                  <span className='hidden lg:inline'>Logout</span>
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}
export default Navbar
