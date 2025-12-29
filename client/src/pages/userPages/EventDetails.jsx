import { Button } from '@/components/ui/button'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import axios from 'axios'
import { Award, CalendarDays, IndianRupee, MapPin, Minus, Plus, Timer } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const EventDetails = () => {
    const params = useParams()
    const id = params.eventId;
    const [eventDetails, setEventDetails] = useState({})
    const [ticketQuantity, setTicketQuantity] = useState(1)
    const [maximumTickets, setMaximumTickets] = useState(10)
    useEffect(() => {
        try {
            const fetchEventDetails = async () => {
                const res = await axios.get(`${import.meta.env.VITE_ORG_API}get-event-details/${id}`, { withCredentials: true })
                console.log(res?.data);
                if (res?.data.eventDetails) {
                    const ev = res.data.eventDetails;
                    setEventDetails(ev);


                    const maxAllowed = Math.min(ev.availableTickets, 10);
                    setMaximumTickets(maxAllowed);
                }
            }
            fetchEventDetails()

        } catch (error) {
            console.error(error);
        }
    }, [id])
    const handelPay = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_EVENT_API}create-checkout-session`, {
                eventDetails: {
                    eventId: eventDetails._id,
                    eventName: eventDetails.title,
                    amount: eventDetails.ticketPrice,
                    quantity: ticketQuantity,
                }
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            }
            );
            window.location.href = res.data.url;
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className=' px-60 py-20 min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-100  '>
            <div className='flex justify-between space-x-10'>
                <div className='w-[60%]'>
                    <Card className={'shadow-none border-none  bg-transparent pt-0'} >
                        <CardContent >
                            <img src={eventDetails?.imageUrlLandscape} alt="" className='rounded-lg ' />
                        </CardContent>
                        <CardHeader>
                            <CardTitle className={'text-2xl'}>{eventDetails?.title}</CardTitle>
                        </CardHeader>

                        <CardFooter className={'flex flex-col items-start space-y-3'}>
                            <p className='text-lg'>About The Event</p>
                            <CardDescription className='text-md'>
                                {eventDetails?.description}
                            </CardDescription>
                        </CardFooter>
                    </Card>
                </div>
                <div className=' w-[40%]'>
                    <Card>
                        <CardHeader>
                            <CardTitle className={'text-xl'}>{eventDetails?.title}</CardTitle>
                            <CardAction>
                                <Dialog>
                                    {maximumTickets > 1 ?
                                        <DialogTrigger className={'bg-black text-white py-1 px-3 rounded-md font-semibold  '}>
                                            Buy Tickets
                                        </DialogTrigger> : <div className={'bg-gray-500 text-white py-1 px-3 rounded-md font-semibold'}>Sold Out</div>
                                    }
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle >
                                                How many tickets?
                                            </DialogTitle>
                                            <DialogDescription>
                                                <div className='flex  justify-center gap-1'>
                                                    <Button onClick={() => ticketQuantity > 1 ? setTicketQuantity(ticketQuantity - 1) : ticketQuantity}><Minus /></Button>
                                                    <Button className={'px-7'}>{ticketQuantity}</Button>
                                                    <Button onClick={() => ticketQuantity < maximumTickets ? setTicketQuantity(ticketQuantity + 1) : ticketQuantity}><Plus /></Button>
                                                </div>
                                                <div className='flex justify-center pt-10'>
                                                    <Button onClick={handelPay} variant={"outline"} className={'text-gray-900 '}> <span className='text-black font-bold'>Pay</span>&nbsp;<span className="flex items-center gap-0">
                                                        <IndianRupee className="!m-0 !p-0" />{eventDetails?.ticketPrice * ticketQuantity}
                                                    </span>
                                                    </Button>
                                                </div>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </CardAction>
                        </CardHeader>
                        <CardContent className={'flex flex-col space-y-3'}>
                            <div className='flex gap-2'>
                                <Award />
                                <h1 className='font-semibold' >{eventDetails?.category}</h1>
                            </div>
                            <div className='flex gap-2'>
                                <IndianRupee />
                                <h1 className='font-semibold' >{eventDetails?.ticketPrice}</h1>
                            </div>
                            <div className='flex gap-2'>
                                <CalendarDays />
                                <h1 className='font-semibold' >{new Date(eventDetails?.date).toDateString()}, {eventDetails?.time}</h1>
                            </div>
                            <div className='flex gap-2'>
                                <Timer />
                                <h1 className='font-semibold' >{eventDetails?.duration}</h1>
                            </div>
                            <div className='flex gap-2'>
                                <MapPin />
                                <h1 className='font-semibold' >{eventDetails?.venue}, {eventDetails?.adress} , {eventDetails?.city}</h1>
                            </div>

                        </CardContent>

                    </Card>
                </div>
            </div>
        </div>
    )
}

export default EventDetails