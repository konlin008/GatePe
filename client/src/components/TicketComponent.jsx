import React from 'react'
import { TbCalendarEvent } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";


const TicketComponent = ({ ticketDetails }) => {
    return (
        <div className="relative bg-blue-100 rounded-2xl p-4 shadow-md">
            <div className="absolute left-[-12px] top-2/5 -translate-y-2/5 w-6 h-6 bg-white rounded-full" />
            <div className="absolute right-[-12px] top-2/5 -translate-y-2/5 w-6 h-6 bg-white  rounded-full" />
            <div className="text-center font-semibold flex gap-2 py-2">
                <div className='bg-black w-[30%] h-50'>
                    <img src={ticketDetails.eventId.imageUrlPortrait} alt="" className='h-full object-cover' />
                </div>
                <div className='w-[50%] h-[100%] flex flex-col items-start py-2'>
                    <div className='flex justify-center items-center gap-2'>
                        <TbCalendarEvent />
                        <p className='font-semibold text-lg
                             '>

                            {ticketDetails.eventId.title}
                        </p>
                    </div>
                    <div className='flex  justify-center  '>
                        <CiLocationOn size={30} />
                        <p className='font-normal text-start'>{ticketDetails.eventId.location}</p>
                    </div>
                </div>
            </div>
            <div className="mt-27 mb-4 border-t-2 border-dashed border-gray-500" />
            <div className="flex justify-center">
                <img
                    src="/qr.png"
                    alt="QR Code"
                    className="w-32 h-50"
                />
            </div>
        </div>

    )
}

export default TicketComponent