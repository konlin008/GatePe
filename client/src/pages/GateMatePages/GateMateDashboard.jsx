import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";  

const GateMateDashboard = () => {
    return (
        <div className='min-h-screen px-60 py-20 bg-gradient-to-b from-blue-100 via-white to-blue-100'>
            <div>
                <div className='items-center mb-5'>
                    <div className='border-black border-1 p-2 rounded-full w-fit mb-2 ' onClick={() => nav('/dashboard')} >
                        <FaArrowLeft size={20} />
                    </div>
                    <h1 className='font-semibold text-xl border-b-2 border-gray-700 w-fit ml-2'>Assigned Entry Staff</h1>
                </div>
            </div>
        </div>
    )
}

export default GateMateDashboard