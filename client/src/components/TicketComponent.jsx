import React from 'react'
import { TbCalendarEvent } from "react-icons/tb";
import { TbLocation } from "react-icons/tb";
import { GoPerson } from "react-icons/go";
import { MdAccessTime } from "react-icons/md";
import { DialogDescription, DialogTitle } from './ui/dialog';


const TicketComponent = ({ ticketDetails }) => {

    const isoDate = ticketDetails.eventId.date;
    const formattedDate = new Date(isoDate).toLocaleDateString("en-IN");

    return (
        <div className="relative bg-gray-200 rounded-2xl p-4 shadow-md flex flex-col">
            <div className="absolute left-[-12px] top-3/5 -translate-y-3/5 w-6 h-6 bg-white rounded-full" />
            <div className="absolute right-[-12px] top-3/5 -translate-y-3/5 w-6 h-6 bg-white  rounded-full" />
            <div className="text-center font-semibold flex gap-5 py-2 justify-start ">
                <div className='w-[35%] h-40 '>
                    <img src={ticketDetails.eventId.imageUrlPortrait} alt="" className='h-full object-cover  rounded-lg ' />
                </div>
                <div className='w-[60%] h-[100%] flex flex-col items-start gap-2 py-2'>
                    <DialogTitle className='flex justify-start text-start gap-2'>
                        <TbCalendarEvent size={20} />
                        {ticketDetails.eventId.title}
                    </DialogTitle>
                    <DialogDescription className='flex justify-start text-start gap-2'>
                        <TbLocation size={30} />
                        {ticketDetails.eventId.location}
                    </DialogDescription>
                    <DialogDescription className='flex justify-start text-start gap-2'>
                        <MdAccessTime size={20} />
                        {ticketDetails.eventId.startTime}-{ticketDetails.eventId.endTime} {formattedDate}
                    </DialogDescription>
                    <DialogDescription className='flex justify-start text-start gap-2'>
                        <GoPerson size={20} />
                        {ticketDetails.quantity} Person Allowed 
                    </DialogDescription>
                </div>
            </div>
            <div className="mt-30 mb-4 border-t-2 border-dashed border-gray-500" />
            <div className="flex flex-col items-center gap-2">
                <img
                    src={ticketDetails.qrCode}
                    alt="QR Code"
                    className="w-40 h-40"
                />
                <p className='text-sm'>{ticketDetails.paymentId}</p>
            </div>
        </div>

    )
}

export default TicketComponent
