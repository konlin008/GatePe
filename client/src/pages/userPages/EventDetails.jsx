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
import { Award, CalendarDays, MapPin } from 'lucide-react'
import React from 'react'


const EventDetails = () => {
    return (
        <div className=' px-60 py-20 min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-100  '>
            <div className='flex justify-between space-x-10'>
                <div className='w-[60%]'>
                    <Card className={'shadow-none border-none  bg-transparent pt-0'} >
                        <CardContent >
                            <img src="https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_1280/c_crop%2Cg_custom%2Fv1757420514%2Fpnhmpzlycoub6nniebqb.jpg" alt="" className='rounded-lg ' />
                        </CardContent>
                        <CardHeader>
                            <CardTitle className={'text-2xl'}>Papon | Shaam-E-Mehfil |</CardTitle>
                        </CardHeader>

                        <CardFooter className={'flex flex-col items-start space-y-3'}>
                            <p className='text-lg'>About The Event</p>
                            <CardDescription className='text-md'>Papon is an Indian singer, multi-instrumentalist, composer and record producer. He has a wide variety of influences and considered to be an extremely versatile artist and has become one of the most recognizable and sought after voices in India.

                            </CardDescription>
                        </CardFooter>
                    </Card>
                </div>
                <div className=' w-[40%]'>
                    <Card>
                        <CardHeader>
                            <CardTitle className={'text-xl'}>Papon | Shaam-E-Mehfil | Kolkata</CardTitle>
                            <CardAction>
                                <Button>Buy Tickets</Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent className={'flex flex-col space-y-3'}>
                            <div className='flex gap-2'>
                                <Award />
                                <h1 className='font-semibold' >Music, Concerts</h1>
                            </div>
                            <div className='flex gap-2'>
                                <CalendarDays />
                                <h1 className='font-semibold' >Sun, 12 Oct, 8:00 PM</h1>
                            </div>
                            <div className='flex gap-2'>
                                <MapPin />
                                <h1 className='font-semibold' >Biswa Bangla Convention Centre, Kolkata</h1>
                            </div>

                        </CardContent>

                    </Card>
                </div>
            </div>
        </div>
    )
}

export default EventDetails