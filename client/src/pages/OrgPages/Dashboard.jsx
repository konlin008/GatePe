import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios'
import { SquarePen } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    useEffect(() => {
        try {
            const fetchEvents = async () => {
                const res = await axios.get(`${import.meta.env.VITE_ORG_API}get_all_events`, { withCredentials: true })
                setEvents(res?.data.events)
            }
            fetchEvents()
        } catch (error) {
            console.log(error);
        }

    }, [])
    const getEventSatus = (event) => {
        console.log(events);
        const now = new Date()
        const eventDate = new Date(event.date)

        if (now < eventDate) return 'Upcoming'
        return 'Ended'
    }
    return (
        <div className='min-h-screen px-60 py-20 bg-gradient-to-b from-blue-100 via-white to-blue-100'>

            <div className=' flex items-center justify-end mb-5'>
                <Button onClick={() => navigate('/new-event')}>List New Event</Button>
            </div>
            <dispatchEvent>
                <Table>
                    <TableCaption>List of your Events</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Event Title</TableHead>
                            <TableHead>Event Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Revenue</TableHead>
                            <TableHead>Edit</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            events?.map((event) => {
                                return (
                                    <TableRow key={event._id}>
                                        <TableCell>{event.title}</TableCell>
                                        <TableCell>{event.catagory}</TableCell>
                                        <TableCell>{getEventSatus(event)}</TableCell>
                                        <TableCell>Rs. 0</TableCell>
                                        <TableCell onClick={() => navigate(`/dashboard/editEvent/${event?._id}`)} ><SquarePen size={20} /></TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </dispatchEvent>

        </div>
    )
}

export default Dashboard