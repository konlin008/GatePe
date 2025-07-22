import { Dribbble, FacebookIcon, Figma, GitBranch, Github, Instagram } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <footer className='w-full h-80 bg-blue-950 p-10 flex flex-col space-y-5'>
            <div className='flex justify-between h-[80%]'>
                <div className='h-full w-100 flex flex-col justify-center space-y-3'>
                    <h1 className='font-semibold text-2xl text-gray-300'>Gate<span className='text-blue-500'>Pe</span></h1>
                    <p className='text-white text-sm '>GatePe is a modern event management platform designed to simplify ticketing and access control.</p>
                </div>
                <div className='h-full w-100 text-gray-300 flex flex-col space-y-2 justify-center'>
                    <h2 className='font-bold text-2xl text-white'>Use Cases</h2>
                    <p>College & University Fests</p>
                    <p>Startup/Tech Meetups</p>
                    <p>Concerts & Cultural Events</p>
                    <p>Workshops & Seminars</p>
                    <p>Exhibitions & Trade Fairs</p>
                </div>
                <div className='h-full w-100 text-white flex flex-col justify-center space-y-5'>
                    <h1 className='font-semibold text-2xl'>Follow Us</h1>
                    <div className='flex space-x-2'>
                        <FacebookIcon />
                        <Instagram />
                        <Github />
                        <Figma />
                        <Dribbble />
                    </div>

                </div>
            </div>
            <div className='h-[15%] border-t-2 border-gray-500'>
                <p className='text-gray-500 text-sm font-semibold mt-3'>By accessing this page, you confirm that you have read, understood, and agreed to our Terms of Service, Cookie Policy, Privacy Policy, and Content Guidelines. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer