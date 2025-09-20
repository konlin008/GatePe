import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'

const OrganizeEvents = () => {
    const [formData, setFormData] = useState({
        title: '',
        catagory: '',
        description: '',
        date: '',
        time: '',
        duration: '',
        venue: '',
        adress: '',
        deadline: '',
        ticketPrice: '',
        ticketQuantity: null,
        image1: null,
        image2: null,

    })
    const [imagePreviews, setImagePreviews] = useState({
        image1: null,
        image2: null,
    });
    const [imageWarnings, setImageWarnings] = useState({
        image1: '',
        image2: '',
    });
    const [loading, setLoading] = useState(null)
    const handelOnChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData, [name]: value
        })
    }
    const onChangeImage = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            setFormData({
                ...formData,
                [name]: file,
            });

            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                let warning = '';
                const width = img.width;
                const height = img.height;

                if (name === 'image1') { // landscape
                    if (width <= height) {
                        warning = '⚠️ This should be a landscape image';
                    }
                } else if (name === 'image2') { // portrait
                    if (height <= width) {
                        warning = '⚠️ This should be a portrait image';
                    }
                }

                setImageWarnings(prev => ({ ...prev, [name]: warning }));
            };

            setImagePreviews(prev => ({
                ...prev,
                [name]: URL.createObjectURL(file),
            }));
        }
    };

    const handelSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                if (formData[key]) {
                    data.append(key, formData[key])
                }
            })

            const res = await axios.post(`${import.meta.env.VITE_ORG_API}create_new_event`, data, { withCredentials: true })
            if (res?.data) {
                console.log(res.data);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }
    return (
        <div className='min-h-screen px-60 py-20 bg-gradient-to-b from-blue-100  to-white'>
            <Card className={'rounded-lg shadow-none border-none  bg-transparent'}>
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
                            <Label htmlFor="title" className={"text-lg"}>
                                Event Title
                            </Label>
                            <Input
                                type="text"
                                required
                                className={"w-full border-gray-400"}
                                placeholder={"3 Idiots"}
                                name='title'
                                value={formData.title}
                                onChange={handelOnChange}

                            />
                        </div>
                        <div className="grid gap-2 ">
                            <Label htmlFor="catagory" className={"text-lg"}>
                                Event Catagory
                            </Label>
                            <Input v
                                type="text"
                                required
                                className={"w-full border-gray-400"}
                                placeholder={"Movie"}
                                name='catagory'
                                value={formData.catagory}
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
                            <Label htmlFor="date" className={"text-lg"}>
                                Event Date
                            </Label>
                            <Input
                                type="date"
                                required
                                className={"w-full border-gray-400"}
                                name='date'
                                value={formData.date}
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
                                name='deadline'
                                value={formData.deadline}

                                onChange={handelOnChange}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 my-10 pt-10 border-t-2">
                        <div className="grid gap-2 ">
                            <Label htmlFor="landscapePoster" className={"text-lg"}>
                                Event Poster (*landscape)
                            </Label>
                            <Input
                                type="file"
                                accept="image/*"
                                required
                                name='image1'
                                className={"w-full border-gray-400"}
                                onChange={onChangeImage}
                            />
                            {imagePreviews.image1 && (
                                <img
                                    src={imagePreviews.image1}
                                    alt="Landscape Preview"
                                    className="mt-2 w-full h-48 object-contain border"
                                />
                            )}
                            {imageWarnings.image1 && (
                                <p className="text-red-600 mt-1">{imageWarnings.image1}</p>
                            )}
                        </div>

                        <div className="grid gap-2 ">
                            <Label htmlFor="potraitPoster" className={"text-lg"}>
                                Event Poster (*portrait)
                            </Label>
                            <Input
                                type="file"
                                accept="image/*"
                                required
                                className={"w-full border-gray-400"}
                                name='image2'
                                onChange={onChangeImage}
                            />
                            {imagePreviews.image2 && (
                                <img
                                    src={imagePreviews.image2}
                                    alt="Portrait Preview"
                                    className="mt-2 w-full h-48 object-contain border"
                                />
                            )}
                            {imageWarnings.image2 && (
                                <p className="text-red-600 mt-1">{imageWarnings.image2}</p>
                            )}
                        </div>

                    </div>
                </CardContent>
                <CardFooter>
                    <div className='flex justify-end w-full'>
                        <Button disabled={loading} type={'submit'} className={"bg-blue-700 hover:bg-blue-800 py-5 px-10 text-md"}
                            onClick={handelSubmit}
                        >
                            {
                                loading ? <><Loader2 className='animate-spin' /> Please Wait</> : 'Submit'
                            }
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default OrganizeEvents;