import EventCard from '@/components/EventCard'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAppStore } from '@/app/appStore'


const ForYou = () => {
    const { location, setLocation } = useAppStore();
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
                                setLocation(val);
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


            {/* Main */}
            <div className='flex flex-col space-y-10 px-60 py-20 h-fit min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-100  '>

                <div >
                    <h1 className='text-2xl font-semibold mb-10'>Hits from previous weeks</h1>
                    <div className='flex space-x-10'>
                        {
                            [1, 2, 3, 4].map(() => {
                                return (<>
                                    <EventCard />
                                </>)
                            })
                        }
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold mb-10'>Happening this week</h1>
                    <div className='flex space-x-10'>
                        {
                            [1, 2, 3, 4].map(() => {
                                return (<>
                                    <EventCard />
                                </>)
                            })
                        }
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold mb-10'>Sports</h1>
                    <div className='flex space-x-10'>
                        {
                            [1, 2, 3, 4].map(() => {
                                return (<>
                                    <EventCard />
                                </>)
                            })
                        }
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold mb-10'>plays</h1>
                    <div className='flex space-x-10'>
                        {
                            [1, 2, 3, 4].map(() => {
                                return (<>
                                    <EventCard />
                                </>)
                            })
                        }
                    </div>
                </div>
            </div >
        </>
    )
}

export default ForYou