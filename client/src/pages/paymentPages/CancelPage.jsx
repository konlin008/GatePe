import React, { useEffect, useState } from 'react'
import { FaRegTimesCircle } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CancelPage = () => {

    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    const [paymentId, setPaymentId] = useState(null)
    const [status, setStatus] = useState("")
    const nav = useNavigate()
    useEffect(() => {
        if (sessionId) {
            axios.get(`${import.meta.env.VITE_TICKET_API}cancelled-payment-details/${sessionId}`)
                .then(res => {
                    setPaymentId(res.data.paymentIntentId);
                    setStatus(res.data.status);
                });
        }
    }, [sessionId]);


    return (
        <div className=' px-60 py-20 min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-100'>
            <div className=' flex flex-col justify-center items-center pt-20'>
                <FaRegTimesCircle className="text-red-500 w-30 h-30 mb-5" />
                <h1 className='font-semibold text-2xl mb-2'>Payment Declined</h1>
                <p>Your Ticket For The Event Cannot Be Confirmed</p>
                <div className='border-2 py-5 rounded-sm border-blue-300 px-40 mt-5 min-h-[10vh] flex flex-col items-center justify-center'>
                    {
                        paymentId ? <p>PaymentID: {paymentId} </p> : ''
                    }
                    <p>Status: {status}</p>
                </div>
                <div className='flex gap-7 mt-5'>

                    <Button onClick={() => nav('/')}>Home</Button>
                </div>
            </div>
        </div>
    )
}

export default CancelPage