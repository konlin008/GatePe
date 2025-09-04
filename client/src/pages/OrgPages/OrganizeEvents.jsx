import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'

const OrganizeEvents = () => {
    const [formData, setFormData] = useState({
        eventTitle: '',
    })
    const handelOnChange = (e) => {

    }
    return (
        <div className='min-h-screen px-60 py-20 bg-gradient-to-b from-blue-100  to-white'>
            <Card className={'rounded-lg shadow-none border-none'}>
                <CardHeader>
                    <CardTitle className={'text-2xl'}>
                        Set Up Your Event
                    </CardTitle>
                    <CardDescription className={'text-md'}>
                        Provide essential details about your event to help attendees know what to expect.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="grid gap-2 ">
                            <Label htmlFor="eventTitle" className={"text-lg"}>
                                Event Title
                            </Label>
                            <Input
                                type="text"
                                required
                                className={"w-full border-gray-400"}
                                placeholder={"comedy Night"}
                                name='eventTitle'
                                value={formData.eventTitle}
                                onChange={handelOnChange}

                            />
                        </div>
                        <div className="grid gap-2 ">
                            <Label htmlFor="eventCatagory" className={"text-lg"}>
                                Event Catagory
                            </Label>
                            <Input
                                type="text"
                                required
                                className={"w-full border-gray-400"}
                                placeholder={"Movie"}
                                name='eventCatagory'
                                value={formData.eventCatagory}
                                onChange={handelOnChange}

                            />
                        </div>
                        <div className="grid gap-2 ">
                            <Label htmlFor="description" className={"text-lg"}>
                                Event Description
                            </Label>
                            <Input
                                type="text"
                                required
                                className={"w-full border-gray-400"}
                                placeholder={"Movie"}
                                name='description'
                                value={formData.description}
                                onChange={handelOnChange}

                            />
                        </div>
                        <div className="grid gap-2 ">
                            <Label htmlFor="eventDate" className={"text-lg"}>
                                Event Date
                            </Label>
                            <Input
                                type="date"
                                required
                                className={"w-full border-gray-400"}
                                name='eventDate'
                                value={formData.eventDate}
                                onChange={handelOnChange}

                            />
                        </div>
                        <div className="grid gap-2 ">
                            <Label htmlFor="time" className={"text-lg"}>
                                Event Time
                            </Label>
                            <Input
                                type="time"
                                required
                                className={"w-full border-gray-400"}
                                name='time'
                                value={formData.time}
                                onChange={handelOnChange}

                            />
                        </div>
                        <div className="grid gap-2 ">
                            <Label htmlFor="duration" className={"text-lg"}>
                                Duration
                            </Label>
                            <Input
                                type="text"
                                required
                                className={"w-full border-gray-400"}
                                name='duration'
                                value={formData.duration}
                                placeholder={'e.g. 2h 30m'}
                                onChange={handelOnChange}

                            />
                        </div>
                        <div className="grid gap-2 ">
                            <Label htmlFor="venue" className={"text-lg"}>
                                Venue
                            </Label>
                            <Input
                                type="text"
                                required
                                className={"w-full border-gray-400"}
                                name='venue'
                                value={formData.venue}
                                placeholder={'e.g. Eden Gardens'}
                                onChange={handelOnChange}
                            />
                        </div>
                        <div className="grid gap-2 ">
                            <Label htmlFor="adress" className={"text-lg"}>
                                Adress
                            </Label>
                            <Input
                                type="text"
                                required
                                className={"w-full border-gray-400"}
                                name='adress'
                                value={formData.adress}
                                placeholder={'Gostho Paul Sarani, Maidan, B. B. D. Bagh Kolkata, West Bengal India'}
                                onChange={handelOnChange}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 my-10 pt-10 border-t-2">
                        <div className="grid gap-2 ">
                            <Label htmlFor="ticketPrice" className={"text-lg"}>
                                Ticket Price (INR)
                            </Label>
                            <Input
                                type="text"
                                required
                                className={"w-full border-gray-400"}
                                placeholder={"300"}
                                name='ticketPrice'
                                value={formData.ticketPrice}
                                onChange={handelOnChange}

                            />
                        </div>
                        <div className="grid gap-2 ">
                            <Label htmlFor="ticketQuantity" className={"text-lg"}>
                                Ticket Quantity
                            </Label>
                            <Input
                                type="text"
                                required
                                className={"w-full border-gray-400"}
                                placeholder={"30"}
                                name='ticketQuantity'
                                value={formData.ticketQuantity}
                                onChange={handelOnChange}
                            />
                        </div>
                        <div className="grid gap-2 ">
                            <Label htmlFor="ticketQuantity" className={"text-lg"}>
                                Ticket Booking Deadline
                            </Label>
                            <Input
                                type="date"
                                required
                                className={"w-full border-gray-400"}
                                placeholder={"30"}
                                name='ticketQuantity'
                                value={formData.ticketQuantity}
                                onChange={handelOnChange}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 my-10 pt-10 border-t-2">
                        <div className="grid gap-2 ">
                            <Label htmlFor="adress" className={"text-lg"}>
                                Event Poster (*landscape)
                            </Label>
                            <Input
                                type="file"
                                accept="image/*"
                                required
                                className={"w-full border-gray-400"}
                                name='adress'
                                value={formData.adress}
                                onChange={handelOnChange}
                            />
                        </div>
                        <div className="grid gap-2 ">
                            <Label htmlFor="adress" className={"text-lg"}>
                                Event Poster (*potrait)
                            </Label>
                            <Input
                                type="file"
                                accept="image/*"
                                required
                                className={"w-full border-gray-400"}
                                name='adress'
                                value={formData.adress}
                                onChange={handelOnChange}
                            />
                        </div>

                    </div>
                </CardContent>
                <CardFooter>
                    <div className='flex justify-end w-full'>
                        <Button className={"bg-blue-700 hover:bg-blue-800 py-5 px-10 text-md"}  
                        >
                            List Event
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default OrganizeEvents;