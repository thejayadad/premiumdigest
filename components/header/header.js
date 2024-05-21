import React from 'react'
import Box from '../box'
import Logo from '../logo'
import { FiLogOut, FiUser } from "react-icons/fi"
import { auth, signIn, signOut } from '@/auth'
import { Button } from '@nextui-org/react'
import NavLinks from './nav-links'

const Header = async () => {
    const session = await auth()
    const user = session?.user
  return (
    <header className='py-6  border-b'>
        <Box>
            <nav className='flex justify-between items-center'>
                <Logo />
                <div className=''>
               {user ?
                <div className='flex items-center'>
                <NavLinks />
                <LogoutButton />
                </div> 
                :
                <>                
                  <SignInButton />
                </>
              }
            </div>
            </nav>
        </Box>
    </header>
  )
}


function SignInButton(){
    return (
        <form
        action={async () => {
            'use server'
            await signIn()
        }}
        >
            <Button
            variant='light'
            type='submit'>
                <FiUser className='h-4 w-4' />
            </Button>
        </form>
    )
  }
  
  function LogoutButton(){
    return(
        <form
        action={async () => {
            'use server'
            await signOut()
        }}
        >
            <Button
            type='submit'
            variant='light'
            >
                <FiLogOut className='h-4 w-4' />
            </Button>
        </form>
    )
  }

export default Header