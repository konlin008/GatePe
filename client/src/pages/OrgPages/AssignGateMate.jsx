import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { IoMdAdd } from "react-icons/io";

import React from 'react'

const AssignGateMate = () => {
    const handelSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <div className='min-h-screen px-60 py-20 bg-gradient-to-b from-blue-100 via-white to-blue-100'>
            <div>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">No.</TableHead>
                            <TableHead> Name </TableHead>
                            <TableHead> Contact </TableHead>

                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">001</TableCell>
                            <TableCell>Sachin</TableCell>
                            <TableCell>912397263</TableCell>
                            <TableCell className="text-right">
                                <Badge className={'bg-red-700 cursor-pointer'}>Remove</Badge>
                            </TableCell>
                        </TableRow>
                    </TableBody>
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
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
                                    onClick={handelSubmit}
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