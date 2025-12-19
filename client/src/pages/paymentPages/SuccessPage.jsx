import TicketComponent from '@/components/TicketComponent';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from "react-icons/fa";
const SuccessPage = () => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id")
    const [ticketDetails, setTicketDetails] = useState({})
    useEffect(() => {
        if (sessionId) {
            const fetchTicketdetails = async () => {
                try {
                    let res = await axios.get(`${import.meta.env.VITE_TICKET_API}ticketdetails/${sessionId}`)
                    if (res) {
                        console.log(res.data.ticketDetails);
                        setTicketDetails(res.data.ticketDetails
                        )
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            fetchTicketdetails()

        }
    }, [sessionId])

    return (
        <div className=' px-60 py-20 min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-100'>
            <div className=' flex flex-col justify-center items-center pt-20'>
                <FaCheckCircle className="text-green-500 w-30 h-30 mb-5" />
                <h1 className='font-semibold text-2xl mb-2'>Payment Successful</h1>
                <p>Your Ticket For The Event Confirmed</p>
                <div className='border-2 py-10 rounded-sm border-blue-300 px-20 mt-5 '>
                    <p><span className='font-semibold'>Event Name:</span>{ticketDetails?.eventId?.title}</p>
                    <p><span className='font-semibold'>STATUS:</span>{ticketDetails?.status}</p>
                    <p><span className='font-semibold'>PAYMENT ID</span>: {ticketDetails?.paymentId}</p>
                </div>
                <div className='flex gap-7 mt-5 '>
                    <Dialog className={'bg-transparent'}>
                        <DialogTrigger className={'bg-black text-white px-5 py-2 rounded-lg'}>
                            View Ticket
                        </DialogTrigger>
                        <DialogContent>
                            <TicketComponent ticketDetails={ticketDetails} />
                        </DialogContent>
                    </Dialog>
                    <Button className={'bg-black text-white px-5 py-5 rounded-lg'}>Home</Button>
                </div>
            </div>
        </div>
    )
}

export default SuccessPage