import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>
        <Header />
        <main className='h-[100vh]'>
        {children}
        </main>
        <Footer />
    </div>
  )
}

export default layout