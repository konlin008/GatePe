import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import NavbarFooter from '@/components/NavbarFooter'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayOut = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainLayOut