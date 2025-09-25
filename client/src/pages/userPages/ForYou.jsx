import EventCard from '@/components/EventCard'
import React from 'react'

const ForYou = () => {

    return (
        <div className='flex flex-col space-y-10 px-60 py-20 h-fit min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-100  '>

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
        </div >
    )
}

export default ForYou