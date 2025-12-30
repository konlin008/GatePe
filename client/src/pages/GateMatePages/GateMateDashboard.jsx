import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SquareArrowOutUpRight } from 'lucide-react';
import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const GateMateDashboard = () => {
    const nav = useNavigate()
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
                            <TableRow>
                                <TableCell className="font-medium">Event</TableCell>
                                <TableCell> 31.12.26</TableCell>
                                <TableCell>15:00pm</TableCell>
                                <TableCell className="text-right  "><Badge className={'bg-red-500'}>Live</Badge></TableCell>
                                <TableCell className="flex justify-end"> <SquareArrowOutUpRight /></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default GateMateDashboard
