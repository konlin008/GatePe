import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button";

const OrgRequestStatusPage = () => {
    const status = "rejected"
    const navigate = useNavigate()
    return (
        <div className='flex items-center justify-center p-0 min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-100  '>
            <div className="bg-white shadow-md rounded-xl p-10 w-[450px] text-center">

                {status === "pending" && (
                    <>
                        <div className="text-blue-500 text-6xl mb-4">⏳</div>
                        <h2 className="text-xl font-semibold">
                            Your organizer request is under review
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Our team usually responds within 24–48 hours.
                        </p>
                    </>
                )}

                {status === "rejected" && (
                    <>
                        <div className="text-red-500 text-6xl mb-4">❌</div>
                        <h2 className="text-xl font-semibold text-red-600">
                            Your organizer request was rejected
                        </h2>

                        {/* <p className="text-gray-600 mt-2">
                            Reason: {data?.reason || "Invalid information"}
                        </p> */}

                        <Button
                            className="mt-6"
                            onClick={() => navigate("/become-organizer")}
                        >
                            Reapply
                        </Button>
                    </>
                )}

                {status === "approved" && (
                    <>
                        <div className="text-green-500 text-6xl mb-4">✅</div>
                        <h2 className="text-xl font-semibold text-green-600">
                            Your organizer request is approved
                        </h2>

                        <p className="text-gray-600 mt-2">
                            You can now create and manage events.
                        </p>

                        <Button
                            className="mt-6"
                            onClick={() => navigate("/organizer-dashboard")}
                        >
                            Go to Dashboard
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}

export default OrgRequestStatusPage