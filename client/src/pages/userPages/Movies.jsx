import React, { useEffect, useState } from 'react'
import EventCard from '@/components/EventCard'
import axios from 'axios'
import { useAppStore } from '@/app/appStore'

const Movies = () => {
    const { location } = useAppStore();
    const [events, setEvents] = useState([])
    useEffect(() => {
        try {
            const fetchEvents = async () => {
                const res = await axios.get(`${import.meta.env.VITE_EVENT_API}getEventsByCatgory?category=movie&location=${location}`)
                if (res?.data.events) {
                    setEvents(res.data.events)
                    console.log(res.data.events);
                }

            }
            fetchEvents()
        } catch (error) {
            console.error(error);
        }
    }, [])
    return (
        <div className="min-h-screen px-60 py-20 bg-gradient-to-b from-blue-100 via-white to-blue-100">
            <div >
                <h1 className='text-2xl font-semibold mb-10'>Movies</h1>
                <div className='flex space-x-10'>
                    {
                        events?.map(() => {
                            return (<>
                                <EventCard />
                            </>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Movies