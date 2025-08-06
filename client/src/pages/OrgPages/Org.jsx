import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Film, Guitar, Handshake, ScanQrCode, Trophy, Users } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Org = () => {
    const navigate = useNavigate()
    const handelOnClick = () => {
        navigate('/org-registration')
    }
    return (
        <div className="min-h-screen px-100 py-20 bg-gradient-to-b from-fuchsia-100 via-blue-100 to-white ">
            <div className="flex flex-col items-center">
                <h1 className="text-center font-semibold text-6xl">
                    What GatePe Supports?
                </h1>
                <p className="text-center font-semibold my-5">
                    As your event companion, GatePe empowers you with end-to-end solutions —
                    from event registration to successful execution. Here's what you can
                    host with us.
                </p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-10 my-10 ">
                    <Card
                        className={
                            "h-60 w-60 shadow-lg hover:shadow-2xl transform hover:sc-105 transition-all duration-100"
                        }
                    >
                        <CardContent className={'flex flex-col items-center space-y-5'}>
                            <Guitar size={100} />
                            <h2 className="font-semibold text-2xl">Performance</h2>
                        </CardContent>
                    </Card>
                    <Card
                        className={
                            "h-60 w-60 shadow-lg hover:shadow-2xl transform hover:sc-105 transition-all duration-300"
                        }
                    >
                        <CardContent className={'flex flex-col items-center space-y-5'}>
                            <Trophy size={100} />
                            <h2 className="font-semibold text-2xl">Sports</h2>
                        </CardContent>
                    </Card>
                    <Card
                        className={
                            "h-60 w-60 shadow-lg hover:shadow-2xl transform hover:sc-105 transition-all duration-300"
                        }
                    >
                        <CardContent className={'flex flex-col items-center space-y-5'}>
                            <Film size={100} />
                            <h2 className="font-semibold text-2xl">Movie</h2>
                        </CardContent>
                    </Card>
                    <Card
                        className={
                            "h-60 w-60 shadow-lg hover:shadow-2xl transform hover:sc-105 transition-all duration-300"
                        }
                    >
                        <CardContent className={'flex flex-col items-center space-y-5'}>
                            <ScanQrCode size={100} />
                            <h2 className="font-semibold text-2xl">QR-scaning Entry</h2>
                        </CardContent>
                    </Card>
                    <Card
                        className={
                            "h-60 w-60 shadow-lg hover:shadow-2xl transform hover:sc-105 transition-all duration-300"
                        }
                    >
                        <CardContent className={'flex flex-col items-center space-y-5'}>
                            <Handshake size={100} />
                            <h2 className="font-semibold text-2xl">Community</h2>
                        </CardContent>
                    </Card>
                    <Card
                        className={
                            "h-60 w-60 shadow-lg hover:shadow-2xl transform hover:sc-105 transition-all duration-300"
                        }
                    >
                        <CardContent className={'flex flex-col items-center space-y-5'}>
                            <Users size={100} />
                            <h2 className="font-semibold text-2xl">Seminer</h2>
                        </CardContent>
                    </Card>
                </div>
                <div className="pt-10">
                    <Button onClick={() => handelOnClick()} className={'rounded-sm py-7 px-10 bg-blue-600 hover:bg-blue-800 text-md'}>List Your Show</Button>
                </div>
            </div>

        </div>
    );
};

export default Org;