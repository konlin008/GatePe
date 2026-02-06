import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAssignedEvents } from '@/queries/gateMate.queries';
import { SquareArrowOutUpRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const GateMateDashboard = () => {
    const nav = useNavigate()
    const [events, setEvents] = useState([])
    const { isSuccess, data, error } = useAssignedEvents()

    useEffect(() => {
        if (isSuccess) {
            setEvents(data.events)
        }
        if (error) {
            console.log(error?.response?.data?.message);
        }
    }, [isSuccess, data, error])

    const getEventStatus = (date, startTime, endTime) => {
        const now = new Date();

        const eventDate = new Date(date);
        const [startHour, startMinute] = startTime.split(":");
        const [endHour, endMinute] = endTime.split(":");

        const startDateTime = new Date(eventDate);
        startDateTime.setHours(startHour, startMinute);

        const endDateTime = new Date(eventDate);
        endDateTime.setHours(endHour, endMinute);

        if (now < startDateTime) return "UPCOMING";
        if (now >= startDateTime && now <= endDateTime) return "LIVE";
        return "PAST";
    };

    return (
        <div className='min-h-screen px-60 py-20 bg-gradient-to-b from-blue-100 via-white to-blue-100'>
            <div>
                <div className='items-center mb-5'>
                    <div className='border-black border-1 p-2 rounded-full w-fit mb-2 ' onClick={() => nav('/dashboard')} >
                        <FaArrowLeft size={20} />
                    </div>
                    <h1 className='font-semibold text-xl border-b-2 border-gray-700 w-fit ml-2'>Assigned Entry Staff</h1>
                </div>
                <div>
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Event Name</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                events.map((event) => {
                                    const status = getEventStatus(event.date, event.startTime, event.endTime);
                                    return (
                                        <TableRow key={event._id}>
                                            <TableCell className="font-medium w-[40%]">{event.title}</TableCell>
                                            <TableCell>{new Date(event.date).toLocaleDateString("en-IN")}</TableCell>
                                            <TableCell>{event.startTime}-{event.endTime}</TableCell>
                                            <TableCell className="text-right">
                                                <Badge
                                                    className={
                                                        status === "LIVE"
                                                            ? "bg-red-500"
                                                            : status === "UPCOMING"
                                                                ? "bg-yellow-500"
                                                                : "bg-gray-400"
                                                    }
                                                >
                                                    {status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell onClick={() => nav(`/gateMate/${event._id}`)} className="flex justify-end"> <SquareArrowOutUpRight /></TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default GateMateDashboard
