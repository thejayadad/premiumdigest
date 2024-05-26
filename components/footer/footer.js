import React from 'react'
import Box from '../box'
import Logo from '../logo'
import SocialIcons from './social-icons'

const Footer = () => {
  return (
    <footer className='py-6 m-auto text-gray-600 body-font border-t'>
        <Box>
           <div className='px-5 py-8 mx-auto flex items-center justify-between sm:flex-row'>
              <div className='flex items-center'>
              <Logo />
              <p className='text-sm text-gray-500 border-l-2 pl-2 border-gray-200'>
                Premium Digest
              </p>
              </div>
              <span>
                <SocialIcons />
              </span>
           </div>
        </Box>
    </footer>
  )
}

export default Footer