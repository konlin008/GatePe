import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetAllListedEvents } from '@/queries/organizer.queries'
import { SquarePen } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    const { isSuccess, data, error } = useGetAllListedEvents()
    useEffect(() => {
        if (isSuccess) {
            console.log(data);
            setEvents(data?.events)
        }

    }, [isSuccess, data])

    const getEventSatus = (event) => {
        const now = new Date()
        const eventDate = new Date(event.date)

        if (now < eventDate) return 'Upcoming'
        return 'Ended'
    }

    if (error) return <h1>Error</h1>

    return (
        <div className='min-h-screen px-60 py-20 bg-gradient-to-b from-blue-100 via-white to-blue-100'>

            <div className=' flex items-center justify-end mb-5'>
                <Button onClick={() => navigate('/new-event')}>List New Event</Button>
            </div>

            <Table>
                <TableCaption>List of your Events</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Event Title</TableHead>
                        <TableHead>Event Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Edit</TableHead>
                        <TableHead>Action</TableHead>

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
                                    <TableCell>   <Badge className={'cursor-pointer bg-blue-500'} onClick={() => navigate(`assign-gateMate/${event?._id}`)}>Assign GateMate</Badge> </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div >
    )
}

export default Dashboard