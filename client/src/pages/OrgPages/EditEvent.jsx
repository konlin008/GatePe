import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EditEvent = () => {
    const params = useParams()
    const id = params.eventId
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
    const [preview, setPreview] = useState({
        image1: null,
        image2: null
    })
    useEffect(() => {
        try {
            const fetchEvent = async () => {
                const res = await axios.get(`${import.meta.env.VITE_ORG_API}get-event-details/${id}`)
                if (res?.data) {
                    const eventDetails = res.data.eventDetails
                    console.log(eventDetails);
                    setFormData({
                        title: eventDetails.title || '',
                        catagory: eventDetails.catagory || '',
                        description: eventDetails.description || '',
                        date: eventDetails.date ? new Date(eventDetails.date).toISOString().split('T')[0] : '',
                        time: eventDetails.time || '',
                        duration: eventDetails.duration || '',
                        venue: eventDetails.venue || '',
                        adress: eventDetails.adress || '',
                        deadline: eventDetails.deadline ? new Date(eventDetails.deadline).toISOString().split('T')[0] : '',
                        ticketPrice: eventDetails.ticketPrice || '',
                        ticketQuantity: eventDetails.ticketQuantity || '',
                        image1: null,
                        image2: null,
                    });
                    setPreview({
                        image1: eventDetails.imageUrlLandscape,
                        image2: eventDetails.imageUrlPortrait
                    })
                }
            }
            fetchEvent()
        } catch (error) {
            console.error(error);
        }
    }, [])
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
            const img = new Image();

            img.onload = () => {
                const width = img.width;
                const height = img.height;

                if (name === "image1" && Math.abs(width / height - 16 / 9) > 0.01) {
                    alert("Landscape image must be 16:9 ratio!");
                    return;
                }

                if (name === "image2" && Math.abs(width / height - 9 / 16) > 0.01) {
                    alert("Portrait image must be 9:16 ratio!");
                    return;
                }
                setFormData({ ...formData, [name]: file });
                setPreview({ ...preview, [name]: URL.createObjectURL(file) });
            };
            img.src = URL.createObjectURL(file);
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
                            {preview.image1 && (
                                <img src={preview.image1} alt="Landscape Preview" className="w-64 h-auto rounded" />
                            )}
                        </div>
                        <div className="grid gap-2 ">
                            <Label htmlFor="potraitPoster" className={"text-lg"}>
                                Event Poster (*potrait)
                            </Label>
                            <Input
                                type="file"
                                accept="image/*"
                                required
                                className={"w-full border-gray-400"}
                                name='image2'
                                onChange={onChangeImage}
                            />
                            {preview.image2 && (
                                <img src={preview.image2} alt="Portrait Preview" className="w-64 h-auto rounded" />
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

export default EditEvent