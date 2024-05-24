import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>
        <Header />
        <main className='h-full'>
        {children}
        </main>
        <Footer />
    </div> 
  )
}

export default layout