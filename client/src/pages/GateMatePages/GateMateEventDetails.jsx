import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import axios from 'axios'
import { CalendarDays, Clock, MapPin, ScanLine, Tags, Ticket } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const GateMateEventDetails = () => {
    const { gateMateId } = useParams()
    const { eventId } = useParams()
    const [eventDetails, setEventDetails] = useState()
    const fetchEventDetails = async () => {
        const res = await axios.get(`${import.meta.env.VITE_GATEMATE_API}event-details/${eventId}`, { withCredentials: true })
        console.log(res?.data);
        if (res.data) setEventDetails(res?.data?.eventDetails)
    }
    useEffect(() => {
        fetchEventDetails()
    }, [eventId])
    return (
        <div className='min-h-screen px-60 py-20 bg-gradient-to-b from-blue-100 via-white to-blue-100'>

            <Card className={'rounded-sm py-10'}>
                <CardHeader >
                    <CardTitle className={'text-xl w-[50%]'}>{eventDetails?.title}</CardTitle>
                    <CardAction className={'bg-blue-600 rounded-sm'}>
                        <Dialog >
                            <DialogTrigger className='flex py-2 px-2 text-white gap-2 font-semibold items-center'> <ScanLine /> Scan Ticket</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription  >
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
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
        </div>
    )
}

export default GateMateEventDetails