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
import axios from 'axios'
import { Award, CalendarDays, MapPin, Timer } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const EventDetails = () => {
    const params = useParams()
    const id = params.eventId;
    const [eventDetails, setEventDetails] = useState({})
    useEffect(() => {
        try {
            const fetchEventDetails = async () => {
                const res = await axios.get(`${import.meta.env.VITE_ORG_API}get-event-details/${id}`)
                console.log(res?.data);
                if (res?.data.eventDetails) {
                    setEventDetails(res?.data.eventDetails)
                }
            }
            fetchEventDetails()
            if (eventDetails) {
                const date = new Date(eventDetails.date).toDateString()
                console.log(date);
            }
        } catch (error) {
            console.error(error);
        }
    }, [])
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
                                <Button>Buy Tickets</Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent className={'flex flex-col space-y-3'}>
                            <div className='flex gap-2'>
                                <Award />
                                <h1 className='font-semibold' >{eventDetails?.category}</h1>
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