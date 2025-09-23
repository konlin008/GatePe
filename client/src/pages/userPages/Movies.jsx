import React, { useEffect } from 'react'
import EventCard from '@/components/EventCard'
import axios from 'axios'

const Movies = () => {
    useEffect(() => {
        try {
            const fetchEvents = async () => {
                const res = await axios.get(`${import.meta.env.VITE_EVENT_API}`)
            }
            fetchEvents()
        } catch (error) {
            console.error(error);
        }
    }, [])
    return (
        <div className="min-h-screen px-60 py-20 bg-gradient-to-b from-blue-100 via-white to-blue-100">
            <div >
                <h1 className='text-2xl font-semibold mb-10'>Hits from previous weeks</h1>
                <div className='flex space-x-10'>
                    {
                        [1, 2, 3, 4].map(() => {
                            return (<>
                                <EventCard />
                            </>)
                        })
                    }
                </div>
            </div>
            <div>
                <h1 className='text-2xl font-semibold mb-10'>Happening this week</h1>
                <div className='flex space-x-10'>
                    {
                        [1, 2, 3, 4].map(() => {
                            return (<>
                                <EventCard />
                            </>)
                        })
                    }
                </div>
            </div>
            <div>
                <h1 className='text-2xl font-semibold mb-10'>Sports</h1>
                <div className='flex space-x-10'>
                    {
                        [1, 2, 3, 4].map(() => {
                            return (<>
                                <EventCard />
                            </>)
                        })
                    }
                </div>
            </div>
            <div>
                <h1 className='text-2xl font-semibold mb-10'>plays</h1>
                <div className='flex space-x-10'>
                    {
                        [1, 2, 3, 4].map(() => {
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