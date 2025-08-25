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
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const handelRegister = (e) => {
    e.preventDefault();

}

const OrgRegistration = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen px-60 py-20 bg-gradient-to-b from-purple-400  to-blue-200">
            <div
                className="border rounded-full w-fit p-2 border-black mb-10"
                onClick={() => navigate("/org")}
            >
                <ArrowLeft className="" />
            </div>
            <Card className={"rounded-sm bg-gradient-to-r from-purple-200 to-white"}>
                <CardHeader>
                    <CardTitle className={"text-xl"}>Register as Organization</CardTitle>
                    <CardDescription className={"text-md text-black"}>
                        Fill in the details below to begin your journey as an event
                        organizer with GatePe — manage events, sell tickets, and engage your
                        audience all in one place.
                    </CardDescription>
                </CardHeader>
                <form>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className={"text-lg"}>
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    className={"max-w-[30%] border-gray-400"}
                                    placeholder={"xyz@email.com"}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className={"text-lg"}>
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className={"max-w-[30%] border-gray-400"}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className={"text-lg"}>
                                    Confirm Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className={"max-w-[30%] border-gray-400"}
                                />
                            </div>
                            <div className="grid gap-2 ">
                                <Label htmlFor="orgName" className={"text-lg"}>
                                    Organization Name
                                </Label>
                                <Input
                                    id="orgName"
                                    type="text"
                                    placeholder="xyz org"
                                    required
                                    className={"max-w-[30%] border-gray-400"}
                                />
                            </div>
                            <div className="grid gap-2 ">
                                <Label htmlFor="contact" className={"text-lg"}>
                                    Contact Number
                                </Label>
                                <Input
                                    id="contact"
                                    type="text"
                                    placeholder="0000011111"
                                    required
                                    className={"max-w-[30%] border-gray-400"}
                                />
                            </div>
                            <div className="grid gap-2 ">
                                <Label htmlFor="orgType" className={"text-lg"}>
                                    Organization Type
                                </Label>
                                <Input
                                    id="orgType"
                                    type="text"
                                    placeholder="Event Agency"
                                    required
                                    className={"max-w-[30%] border-gray-400"}
                                />
                            </div>
                            <div className="grid gap-2 ">
                                <Label htmlFor="city" className={"text-lg"}>
                                    City
                                </Label>
                                <Input
                                    id="city"
                                    type="text"
                                    placeholder="Event Agency"
                                    required
                                    className={"max-w-[30%] border-gray-400"}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className={"mt-10 flex justify-end"}>
                        <Button
                            className={"bg-blue-700 py-5 px-10 text-md"}
                            type={"submit"}
                            onClick={handelRegister}
                        >
                            Submit
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default OrgRegistration;
