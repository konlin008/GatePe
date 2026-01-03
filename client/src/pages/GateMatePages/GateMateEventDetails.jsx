import Scanner from '@/components/Scanner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { CalendarDays, ChartBar, Clock, MapPin, Tags, UserRound, } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const GateMateEventDetails = () => {
    const { gateMateId } = useParams()
    const { eventId } = useParams()
    const [eventDetails, setEventDetails] = useState()
    const [scannedCode, setScannedCode] = useState(null)
    const [ticketdetails, setTicketDetails] = useState()


    const fetchEventDetails = async () => {
        const res = await axios.get(`${import.meta.env.VITE_GATEMATE_API}event-details/${eventId}`, { withCredentials: true })
        console.log(res?.data);
        if (res.data) setEventDetails(res?.data?.eventDetails)
    }
    const fetchTicketDetails = async () => {
        const res = await axios.get(`${import.meta.env.VITE_TICKET_API}ticketdetails-gateMate/${scannedCode}/${eventId}`)
        if (res?.data?.ticketDetails) setTicketDetails(res?.data?.ticketDetails)
    }
    useEffect(() => {
        fetchEventDetails()
    }, [eventId])
    useEffect(() => {
        fetchTicketDetails()
    }, [scannedCode])
    return (
        <div className='min-h-screen px-60 py-20 bg-gradient-to-b from-blue-100 via-white to-blue-100'>

            <div className='flex flex-col gap-5'>
                <Card className={'rounded-sm py-10'}>
                    <CardHeader >
                        <CardTitle className={'text-xl w-[50%]'}>{eventDetails?.title}</CardTitle>
                        <CardAction className={'bg-blue-600 rounded-sm'}>
                            <Scanner onScan={setScannedCode} />
                        </CardAction>
                    </CardHeader>
                    <CardContent className={'flex flex-col gap-2'}>
                        <div className='flex gap-1 items-center'>
                            <CalendarDays />
                            <p className='font-semibold'>  {new Date(eventDetails?.date).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}</p>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <Clock />
                            <p className='font-semibold'>{eventDetails?.startTime}-{eventDetails?.endTime}</p>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <MapPin />
                            <p className='font-semibold'>{eventDetails?.location}</p>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <Tags />
                            <p className='font-semibold'>Total Tickets: {eventDetails?.ticketQuantity}</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                </Card>
                {
                    !scannedCode ? (<></>) :

                        <Card className={'rounded-sm py-10'}>
                            <CardHeader>
                                <CardTitle className={'text-xl'}>Ticket Details</CardTitle>
                                <CardDescription>Scanned Ticket Details</CardDescription>

                            </CardHeader>
                            <CardContent className={'flex flex-col gap-2'}>
                                <div className='flex gap-1 items-center'>
                                    <UserRound />
                                    <p className='font-semibold'>Person Allowed to Enter: {ticketdetails?.quantity}</p>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <ChartBar />
                                    <p className='font-semibold'>Ticket Details: <Badge className={'bg-green-600'}>{ticketdetails?.status}</Badge></p>
                                </div>
                            </CardContent>
                            <CardFooter className={'flex justify-end'}>
                                <CardAction ><Button className={'bg-blue-600 hover:bg-blue-500'}>Verify</Button></CardAction>
                            </CardFooter>
                        </Card>

                }
            </div>
        </div>
    )
}

export default GateMateEventDetails