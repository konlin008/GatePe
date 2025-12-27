import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { IoMdAdd } from "react-icons/io";

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AssignGateMate = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [gateMates, setGateMates] = useState([])
    const { eventId } = useParams()

    const fetchGateMates = async () => {
        const res = await axios.get(`${import.meta.env.VITE_ORG_API}getAllGateMates/${eventId}`, { withCredentials: true })
        if (res?.data?.gateMates.length != 0) setGateMates(res.data.gateMates)
    }

    useEffect(() => {
        fetchGateMates()
    }, [eventId])
    const handelSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (email && password) {
            const res = await axios.post(`${import.meta.env.VITE_ORG_API}assignGateMate`, { email, password, eventId }, { withCredentials: true })
            if (res.data.success) {
                toast.success(res?.data?.message || "GateMate Assigned")
                fetchGateMates()

            }
        }
        else {
            toast.error("All Fields Are Required")
        }
        setLoading(false)
    }
    const removeGateMate = async (gateMateId) => {
        const res = await axios.delete(`${import.meta.env.VITE_ORG_API}removeGateMate/${gateMateId}`)
        if (res?.data?.success) {
            toast.success(res?.data?.message || "GateMate Removed")
            fetchGateMates();
        }

    }
    return (
        <div className='min-h-screen px-60 py-20 bg-gradient-to-b from-blue-100 via-white to-blue-100'>
            <div>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">No.</TableHead>
                            <TableHead> Email </TableHead>

                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    {gateMates.map((gateMate, index) => {
                        return (
                            <TableBody key={gateMate._id}>
                                <TableRow>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{gateMate.email}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge onClick={() => removeGateMate(gateMate._id)} className={'bg-red-700 cursor-pointer'}>Remove</Badge>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )
                    })}
                </Table>
                <div className=' flex justify-end'>
                    <Dialog>
                        <DialogTrigger className={'bg-blue-500 py-2 px-4 rounded-md text-white flex items-center gap-2'}><IoMdAdd size={20} /> GateMate</DialogTrigger>
                        <DialogContent className="flex flex-col justify-center mt-10">

                            <DialogHeader>
                                <DialogTitle>
                                    Create GateMate Account
                                </DialogTitle>
                                <DialogDescription>
                                    Assign a trusted person as a GateMate for this event.
                                </DialogDescription>
                            </DialogHeader>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        GateMate Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="example@email.com"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Create password"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
                                    onClick={handelSubmit}
                                    disabled={loading}
                                >
                                    Assign GateMate
                                </button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div >
    )
}

export default AssignGateMate