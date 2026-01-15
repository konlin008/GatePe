import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import React, { useState } from 'react'
import { toast } from 'sonner'

const LoginPage = () => {
    const [role, setRole] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const handelLogin = async () => {
        if (!role, !userName, !password) {
            toast.error('All Fields Are Required')
        }
        else {
            const data = { role, userName, password }
            console.log(data);
        }
    }

    const handelRegister = async () => {
        if (!name, !userName, !password) {
            toast.error('All Fields Are Required')
        }
        else {
            const data = { name, userName, password }
            console.log(data);
        }
    }

    return (
        <div className='px-60 py-20 min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-100 flex justify-center '>
            <div className="flex w-full max-w-sm flex-col gap-6 ">
                <Tabs defaultValue="account" >
                    <TabsList>
                        <TabsTrigger value="account">Register</TabsTrigger>
                        <TabsTrigger value="password">Login</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Card>
                            <CardHeader>
                                <CardTitle>Register</CardTitle>
                                <CardDescription>
                                    Create an account and get started.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-userName">UserName</Label>
                                    <Input id="tabs-userName" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-password">password</Label>
                                    <Input id="tabs-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-name">Name</Label>
                                    <Input id="tabs-name" placeholder="john" type={'text'} value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handelRegister}>Save changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                        <Card>
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>
                                    Sign in to continue to your account.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-userName">UserName</Label>
                                    <Input id="tabs-userName" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-password">password</Label>
                                    <Input id="tabs-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div>
                                    <Select onValueChange={value => setRole(value)} >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Account Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="user">User</SelectItem>
                                            <SelectItem value="organizer">Organizer</SelectItem>
                                            <SelectItem value="gateMate">GateMate</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                            <CardFooter >
                                <Button onClick={handelLogin}>Login</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default LoginPage