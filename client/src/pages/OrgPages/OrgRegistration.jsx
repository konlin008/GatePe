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
import axios from "axios";
import { ArrowLeft, Loader, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const OrgRegistration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        orgName: '',
        orgType: '',
        contactNo: '',
        city: ''
    })
    const [loading, setLoading] = useState()
    const handelRegister = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await axios.post('http://localhost:8080/api/v1/auth/org-register', formData)
            if (res?.data.success) {
                toast.success(res.data.message, " Please Login")
                navigate('/organize-events')
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
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
                onClick={() => navigate("/org")}
            >
                <ArrowLeft className="" />
            </div>
            <Card
                className={
                    "rounded-sm bg-white"
                }
            >
                <CardHeader>
                    <CardTitle className={"text-xl"}>Register as Organizar</CardTitle>
                    <CardDescription className={"text-md text-black"}>
                        Fill in the details below to begin your journey as an event
                        organizer with GatePe — manage events, sell tickets, and engage your
                        audience all in one place.
                    </CardDescription>
                </CardHeader>
                <form>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="grid gap-2 ">
                                <Label htmlFor="email" className={"text-lg"}>
                                    Email
                                </Label>
                                <Input
                                    type="email"
                                    required
                                    className={"w-full border-gray-400"}
                                    placeholder={"xyz@email.com"}
                                    name='email'
                                    value={formData.email}
                                    onChange={handelOnChange}

                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className={"text-lg"}>
                                    Password
                                </Label>
                                <Input
                                    type="password"
                                    required
                                    className={"w-full border-gray-400"}
                                    name='password'
                                    value={formData.password}
                                    onChange={handelOnChange}
                                />
                            </div>
                            <div className="grid gap-2 ">
                                <Label htmlFor="orgName" className={"text-lg"}>
                                    Organizar Name
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="TechFest Club"
                                    required
                                    className={"w-full border-gray-400"}
                                    name='orgName'
                                    value={formData.orgName}
                                    onChange={handelOnChange}
                                />
                            </div>
                            <div className="grid gap-2 ">
                                <Label htmlFor="contact" className={"text-lg"}>
                                    Contact Number
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="9999988888"
                                    required
                                    className={"w-full border-gray-400"}
                                    name='contactNo'
                                    value={formData.contactNo}
                                    onChange={handelOnChange}
                                />
                            </div>
                            <div className="grid gap-2 ">
                                <Label htmlFor="orgType" className={"text-lg"}>
                                    Type
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="College"
                                    required
                                    className={"w-full border-gray-400"}
                                    name='orgType'
                                    value={formData.orgType}
                                    onChange={handelOnChange}
                                />
                            </div>
                            <div className="grid gap-2 ">
                                <Label htmlFor="city" className={"text-lg"}>
                                    City
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="kolkata"
                                    required
                                    className={"w-full border-gray-400"}
                                    name='city'
                                    value={formData.city}
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
                            disabled={loading}
                        >{
                                loading ? <><Loader2 className="animate-spin" /> please wait</> : 'Submit'
                            }
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default OrgRegistration;
