import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { Button } from '@/components/ui/button';

const CancelPage = () => {
    return (
        <div className=' px-60 py-20 min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-100'>
            <div className=' flex flex-col justify-center items-center pt-20'>
                <FaCheckCircle className="text-green-500 w-30 h-30 mb-5" />
                <h1 className='font-semibold text-2xl mb-2'>Payment Successful</h1>
                <p>Your Ticket For The Event Confirmed</p>
                <div className='border-2 py-5 rounded-sm border-blue-300 px-40 mt-5'>
                    <p>OrderID: #12873dn</p>
                    <p>Amount Paid: $50</p>
                    <p>Event Name:Movie</p>
                </div>
                <div className='flex gap-7 mt-5'>
                    <Button>View Ticket</Button>
                    <Button>Home</Button>
                </div>
            </div>
        </div>
    )
}

export default CancelPage