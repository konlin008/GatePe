import EventCard from '@/components/EventCard'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import axios from 'axios'
import { Skeleton } from "@/components/ui/skeleton"

const ForYou = () => {
    const location = 'kolkata'
    const [isOpen, setIsOpen] = useState(!location)
    const cities = [
        { value: "mumbai", label: "Mumbai" },
        { value: "delhi", label: "Delhi" },
        { value: "bangalore", label: "Bangalore" },
        { value: "chennai", label: "Chennai" },
        { value: "kolkata", label: "Kolkata" },
        { value: "hyderabad", label: "Hyderabad" },
        { value: "pune", label: "Pune" },
        { value: "ahmedabad", label: "Ahmedabad" },
        { value: "jaipur", label: "Jaipur" },
        { value: "lucknow", label: "Lucknow" },
    ];
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(null)
    useEffect(() => {
        try {

            const fetchEvents = async () => {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_EVENT_API}getEventsByCatgory?location=${location}`)
                if (res.data.events) {
                    setEvents(res.data.events)
                }
                setLoading(false)
            }
            fetchEvents()
        } catch (error) {
            console.log(error);
        }
    }, [])
    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Choose Your Location</DialogTitle>
                        <DialogDescription>
                            Select your location to get personalized event recommendations near you. Stay updated with events that match your preferences!
                        </DialogDescription>
                        <div className=' mt-10'>
                            <Select value={location ?? undefined} onValueChange={(val) => {
                                // setLocation(val);
                                setIsOpen(false);
                            }}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Select your city..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {cities.map((city) => (
                                        <SelectItem key={city.value} value={city.value}>
                                            {city.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <div className='flex flex-col space-y-10 px-60 py-20 h-fit min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-100  '>
                {loading
                    ? <div className='flex space-x-10'>
                        {
                            [1, 2, 3, 4].map((i) => (
                                <div key={i} className="space-y-4 w-[250px] ">

                                    <Skeleton className="h-[150px] w-full rounded-xl bg-gray-400" />

                                    <Skeleton className="h-[20px] w-[70%] rounded-full  bg-gray-400" />

                                    <Skeleton className="h-[16px] w-[50%] rounded-full  bg-gray-400" />
                                </div>
                            ))
                        }
                    </div >
                    :

                    <div >
                        <h1 className='text-2xl font-semibold mb-10'>Events For You</h1>
                        <div className='flex space-x-10'>
                            {
                                events.map((e) => {
                                    return (<div key={e._id} >
                                        <EventCard event={e} />
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                }
            </div >

        </>
    )
}

export default ForYou