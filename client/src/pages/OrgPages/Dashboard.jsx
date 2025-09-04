import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    return (
        <div className='min-h-screen px-60 py-20 bg-gradient-to-b from-blue-100 via-white to-blue-100'>
            <div className=' flex items-center justify-end '>
                <Button onClick={() => navigate('/new-event')}>List New Event</Button>
            </div>
        </div>
    )
}

export default Dashboard