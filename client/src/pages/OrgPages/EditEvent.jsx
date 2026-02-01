import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetEventDetails, useUpdateEventDetails } from "@/queries/organizer.queries";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const EditEvent = () => {
    const { eventId } = useParams();
    const { isSuccess: isGetSuccess, data: getData, error: getError, } = useGetEventDetails(eventId)
    const { mutate: updateEvent, isPending: isUpdating, isSuccess: isUpdated, data: updatedData, error: updateError } = useUpdateEventDetails()
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
    const convertTo24Hour = (time) => {
        if (!time) return "";

        const [timePart, modifier] = time.split(" ");
        let [hours, minutes] = timePart.split(":");

        hours = parseInt(hours);

        if (modifier === "PM" && hours !== 12) {
            hours += 12;
        }

        if (modifier === "AM" && hours === 12) {
            hours = 0;
        }

        return `${hours.toString().padStart(2, "0")}:${minutes}`;
    };
    useEffect(() => {
        if (isGetSuccess) {
            console.log(getData);
            const event = getData?.eventDetails;
            setFormData({
                title: event.title || "",
                category: event.category || "",
                description: event.description || "",
                date: event.date?.split("T")[0] || "",
                startTime: convertTo24Hour(event.startTime) || "",
                endTime: convertTo24Hour(event.endTime) || "",
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
        }
        if (getError) toast.error('Faild To Fetch Event Details');
    }, [isGetSuccess, getData, getError])
    useEffect(() => {
        if (isUpdated) {
            toast.success(updatedData?.message || 'Event Updated Successfully')
        }
        if (updateError) {
            console.log(updateError);
        }
    }, [isUpdated, updatedData, updateError])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        updateEvent({
            id: eventId,
            data: formData,
        })
    };

    return (
        <div className="min-h-screen px-60 py-20 bg-gradient-to-b from-blue-100 to-white">
            <Card className="border-none bg-transparent shadow-none">
                <CardHeader>
                    <CardTitle className="text-2xl">Edit Event</CardTitle>
                    <CardDescription>
                        Please make sure all details are accurate before saving changes.
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
                                <Label>Deadline Date</Label>
                                <Input type="date" name="deadlineDate" value={formData.deadline} onChange={handleChange} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Venue</Label>
                                <Input name="venue" value={formData.venue} onChange={handleChange} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Location</Label>
                                <Input name="location" value={formData.location} onChange={handleChange} />
                            </div>
                            <div className="col-span-2 grid grid-cols-2 gap-6 mt-8">

                                <div>
                                    <Label>Landscape Poster</Label>
                                    {posters.landscape ? (
                                        <img
                                            src={posters.landscape}
                                            className="mt-2 h-48 w-full object-contain border rounded"
                                        />
                                    ) : (
                                        <p className="text-sm text-gray-400 mt-2">No poster available</p>
                                    )}
                                </div>

                                <div>
                                    <Label>Portrait Poster</Label>
                                    {posters.portrait ? (
                                        <img
                                            src={posters.portrait}
                                            className="mt-2 h-48 w-full object-contain border rounded"
                                        />
                                    ) : (
                                        <p className="text-sm text-gray-400 mt-2">No poster available</p>
                                    )}
                                </div>

                            </div>


                        </div>

                        <div className="flex justify-end mt-10">
                            <Button disabled={isUpdating} className="px-10 py-5">
                                {isUpdating ? (
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
