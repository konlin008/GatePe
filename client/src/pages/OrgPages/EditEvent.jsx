import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditEvent = () => {
    const { eventId } = useParams();
    const [isPending, setIsPending] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        venue: "",
        city: "",
        location: "",
        deadline: "",
        ticketPrice: "",
        ticketQuantity: "",
    });

    const [posters, setPosters] = useState({
        landscape: "",
        portrait: "",
    });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_ORG_API}get-event-details/${eventId}`,
                    { withCredentials: true }
                );

                const event = res.data.eventDetails;

                setFormData({
                    title: event.title || "",
                    category: event.category || "",
                    description: event.description || "",
                    date: event.date?.split("T")[0] || "",
                    startTime: event.startTime || "",
                    endTime: event.endTime || "",
                    venue: event.venue || "",
                    city: event.city || "",
                    location: event.location || "",
                    deadline: event.deadline?.split("T")[0] || "",
                    ticketPrice: event.ticketPrice || "",
                    ticketQuantity: event.ticketQuantity || "",
                });

                setPosters({
                    landscape: event.imageUrlLandscape,
                    portrait: event.imageUrlPortrait,
                });
            } catch (error) {
                console.error("Fetch failed:", error);
            }
        };

        fetchEvent();
    }, [eventId]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        try {
            await axios.put(
                `${import.meta.env.VITE_ORG_API}update-event/${eventId}`,
                formData,
                { withCredentials: true }
            );

            alert("Event updated successfully ✅");
        } catch (error) {
            console.error("Update error:", error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="min-h-screen px-60 py-20 bg-gradient-to-b from-blue-100 to-white">
            <Card className="border-none bg-transparent shadow-none">
                <CardHeader>
                    <CardTitle className="text-2xl">Edit Event</CardTitle>
                    <CardDescription>
                        Poster editing is disabled for organizers.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-6">

                            <div className="grid gap-2">
                                <Label>Event Title</Label>
                                <Input name="title" value={formData.title} onChange={handleChange} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Category</Label>
                                <Input name="category" value={formData.category} onChange={handleChange} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Description</Label>
                                <Input name="description" value={formData.description} onChange={handleChange} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Date</Label>
                                <Input type="date" name="date" value={formData.date} onChange={handleChange} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Start Time</Label>
                                <Input type="time" name="startTime" value={formData.startTime} onChange={handleChange} />
                            </div>

                            <div className="grid gap-2">
                                <Label>End Time</Label>
                                <Input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Venue</Label>
                                <Input name="venue" value={formData.venue} onChange={handleChange} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Location</Label>
                                <Input name="location" value={formData.location} onChange={handleChange} />
                            </div>

                            <Select
                                value={formData.city}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({ ...prev, city: value }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select City" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="delhi">Delhi</SelectItem>
                                    <SelectItem value="mumbai">Mumbai</SelectItem>
                                    <SelectItem value="kolkata">Kolkata</SelectItem>
                                    <SelectItem value="bangalore">Bangalore</SelectItem>
                                </SelectContent>
                            </Select>


                            <div className="col-span-2 grid grid-cols-2 gap-6 mt-8">
                                <div>
                                    <Label>Landscape Poster</Label>
                                    <img
                                        src={posters.landscape}
                                        className="mt-2 h-48 w-full object-contain border rounded"
                                    />
                                </div>

                                <div>
                                    <Label>Portrait Poster</Label>
                                    <img
                                        src={posters.portrait}
                                        className="mt-2 h-48 w-full object-contain border rounded"
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="flex justify-end mt-10">
                            <Button disabled={isPending} className="px-10 py-5">
                                {isPending ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" /> Updating
                                    </>
                                ) : (
                                    "Update Event"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditEvent;
