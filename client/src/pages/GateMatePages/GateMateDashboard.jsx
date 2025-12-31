import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from 'axios';
import { SquareArrowOutUpRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaVolumeHigh } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';

const GateMateDashboard = () => {
    const nav = useNavigate()
    const [events, setEvents] = useState([])
    const param = useParams()
    const { gateMateId } = param
    console.log(gateMateId);
    const fetchGateMateDetails = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_GATEMATE_API}details/${gateMateId}`
            );
            setEvents(res?.data?.gateMate?.eventId || []);
        } catch (error) {
            console.error("Failed to fetch gate mate details", error);
        }
    }
    useEffect(() => {
        fetchGateMateDetails()
    }, [gateMateId])
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
                                    console.log("ok: ", event);
                                    return (
                                        <TableRow key={event._id}>
                                            <TableCell className="font-medium">{event.title}</TableCell>
                                            <TableCell>{new Date(event.date).toLocaleDateString("en-IN")}</TableCell>
                                            <TableCell>{event.startTime}-{event.endTime}</TableCell>
                                            <TableCell className="text-right  "><Badge className={'bg-red-500'}>Live</Badge></TableCell>
                                            <TableCell className="flex justify-end"> <SquareArrowOutUpRight /></TableCell>
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
