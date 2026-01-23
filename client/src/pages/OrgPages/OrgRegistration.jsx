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
import { useReqAsOrganizer } from "@/queries/user.queries";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const OrgRegistration = () => {
    const navigate = useNavigate();
    const { mutate, isPending, isSuccess, data, error } = useReqAsOrganizer()
    const [formData, setFormData] = useState({
        fullName: '',
        organizerType: '',
        city: '',
        contactNo: '',
        state: '',
    })
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.data?.message);
        }
        if (error) {
            if (error?.response.status === 400) {
                toast.error(error?.response?.data?.errors[0]?.message || 'Invalid Input');
            }
            else { toast.error(error?.response?.data?.message); }
        }
    }, [isSuccess, data, error])

    const handelRegister = async (e) => {
        e.preventDefault();
        mutate(formData);
    };
    const handelOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })
    }
    return (
        <div className="min-h-screen px-60 py-20 bg-gradient-to-b from-blue-100 via-white to-blue-100">
            <div
                className="border rounded-full w-fit p-2 border-black mb-10"
                onClick={() => navigate("/")}
            >
                <ArrowLeft className="" />
            </div>
            <Card
                className={
                    "rounded-sm bg-white"
                }
            >
                <CardHeader>
                    <CardTitle className={"text-xl"}>Become a Organizar</CardTitle>
                    <CardDescription className={"text-md text-black"}>
                        Fill in the details below to begin your journey as an event
                        organizer with GatePe — manage events, sell tickets, and engage your
                        audience all in one place.
                    </CardDescription>
                </CardHeader>
                <form>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-6">

                            <div className="grid gap-2">
                                <Label className="text-lg">Full Name of Organizer</Label>
                                <Input
                                    type="text"
                                    name="fullName"
                                    placeholder="xyz organizer"
                                    required
                                    className="w-full border-gray-400"
                                    value={formData.fullName}
                                    onChange={handelOnChange}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label className="text-lg">Type</Label>
                                <Input
                                    type="text"
                                    name="organizerType"
                                    placeholder="College"
                                    required
                                    className="w-full border-gray-400"
                                    value={formData.organizerType}
                                    onChange={handelOnChange}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label className="text-lg">City</Label>
                                <Input
                                    type="text"
                                    name="city"
                                    placeholder="Kolkata"
                                    required
                                    className="w-full border-gray-400"
                                    value={formData.city}
                                    onChange={handelOnChange}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label className="text-lg">Contact Number</Label>
                                <Input
                                    type="tel"
                                    name="contactNo"
                                    placeholder="9999988888"
                                    required
                                    className="w-full border-gray-400"
                                    value={formData.contactNo}
                                    onChange={handelOnChange}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label className="text-lg">State</Label>
                                <Input
                                    type="text"
                                    name="state"
                                    placeholder="West Bengal"
                                    required
                                    className="w-full border-gray-400"
                                    value={formData.state}
                                    onChange={handelOnChange}
                                />
                            </div>

                        </div>
                    </CardContent>
                    <CardFooter className={"mt-10 flex justify-end"}>

                        <Button
                            className={"bg-blue-700 hover:bg-blue-800 py-5 px-10 text-md"}
                            type={"submit"}
                            onClick={handelRegister}
                            disabled={isPending}
                        >{
                                isPending ? <><Loader2 className="animate-spin" /> please wait</> : 'Submit'
                            }
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default OrgRegistration;
