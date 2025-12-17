import React from 'react'

const TicketComponent = () => {
    return (
        <div className="relative bg-blue-100 rounded-2xl p-4 shadow-md">
            <div className="absolute left-[-12px] top-2/5 -translate-y-2/5 w-6 h-6 bg-white rounded-full" />
            <div className="absolute right-[-12px] top-2/5 -translate-y-2/5 w-6 h-6 bg-white  rounded-full" />
            <div className="text-center font-semibold">
                SUCHITRA
            </div>
            <div className="mt-30 mb-4 border-t-2 border-dashed border-gray-500" />
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