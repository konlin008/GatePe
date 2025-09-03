import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const OrgLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState()
    const navigate = useNavigate()
    const handelOnChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData, [name]: value
        })
    }
    const handelLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post('http://localhost:8080/api/v1/org/login', formData, { withCredentials: true })
            if (res.data.success) {
                setLoading(false)
                navigate(`/organize-events/${res.data.org._id}`)
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 via-white to-blue-100'>
            <Card className={'min-w-120 min-h-50'}>
                <CardHeader>
                    <CardTitle>Login As Organizer</CardTitle>
                    <CardDescription>
                        Welcome back to GatePe — your hub for managing events, selling tickets, and connecting with your audience. Log in to continue organizing and growing your events seamlessly.
                    </CardDescription>
                </CardHeader>
                <form>
                    <CardContent className={'flex flex-col space-y-3'}>
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
                    </CardContent>
                    <CardFooter className={"mt-10 flex justify-end"}>

                        <Button
                            className={"bg-blue-700 hover:bg-blue-800 py-5 px-10 text-md"}
                            type={"submit"}
                            onClick={handelLogin}
                            disabled={loading}
                        >{
                                loading ?
                                    <>
                                        <Loader2 className="animate-spin" />please wait
                                    </>
                                    : 'Submit'
                            }
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default OrgLogin