import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState()
    useEffect(() => {
        setLoading(true)
        try {
            const fetchEvents = async () => {
                const res = await axios.get(`${import.meta.env.VITE_ORG_API}get_all_events`, { withCredentials: true })
                setEvents(res?.data.events)
                setLoading(false)
            }
            fetchEvents()
        } catch (error) {
            console.log(error);
        }

    }, [])
    const getEventSatus = (event) => {
        console.log(events);
        const now = new Date()
        const eventDate = new Date(event.data)

        if (now < eventDate) return 'Upcoming'
        return 'Ended'
    }
    return (
        <div className='min-h-screen px-60 py-20 bg-gradient-to-b from-blue-100 via-white to-blue-100'>
            <div className=' flex items-center justify-end mb-5'>
                <Button onClick={() => navigate('/new-event')}>List New Event</Button>
            </div>
            <div>
                <Table>
                    <TableCaption>List of your Events</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Event Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Edit</TableHead>
                            <TableHead>Revenue</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            events?.map((event) => {
                                return (
                                    <TableRow key={event._id}>
                                        <TableCell>{event.title}</TableCell>
                                        <TableCell>{event.catagory}</TableCell>
                                        <TableCell>{getEventSatus(events)}</TableCell>
                                        <TableCell>Edit</TableCell>
                                        <TableCell>Rs. 0</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Dashboard