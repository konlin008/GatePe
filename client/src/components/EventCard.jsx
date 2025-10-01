import React from 'react'
import { Card, CardContent, CardFooter, } from './ui/card'
import { useNavigate } from 'react-router-dom'

const EventCard = ({ event }) => {
    const navigate = useNavigate()
    return (
        <Card
            onClick={() => navigate(`/eventDetails/${event._id}`)}
            className='shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden w-60 h-100 cursor-pointer pt-0'
        >
            <CardContent className='h-64 p-0'>
                <img
                    src={event?.imageUrlPortrait}
                    alt={event?.title}
                    className='w-full h-full object-cover'
                />
            </CardContent>
            <CardFooter className='flex flex-col items-start space-y-5 pl-2 pt-0 h-32  '>
                <h2 className='font-bold text-md line-clamp-2 w-full'>
                    {event?.title}
                </h2>
                <p className='text-sm text-gray-600'>
                    {event.city} | <span>₹{event.ticketPrice}</span>
                </p>
            </CardFooter>
        </Card>
    )
}

export default EventCard