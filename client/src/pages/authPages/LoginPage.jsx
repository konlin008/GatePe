import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useLogin, useRegister } from '@/queries/auth.queries'
import { Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useUserStore from '@/app/userStore'

const LoginPage = () => {
    const { mutate: login, isSuccess: loginSuccess, data: loginData, isPending: loginPending, error: loginError } = useLogin()
    const { mutate: register, isSuccess: registerSuccess, data: registerData, isPending: registerPending, error: registerError } = useRegister()
    const { login: setLogin } = useUserStore()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        if (loginSuccess) {
            toast.success(loginData?.message || 'Login Successfull')
            setLogin(loginData?.user?.role)
            navigate('/')
        }
        if (loginError) {
            toast.error(loginError?.response?.data?.message)
        }
    }, [loginSuccess, loginData, loginError])
    useEffect(() => {
        if (registerSuccess) {
            toast.success(registerData?.message || 'User Registered Successfull', ' !please Login')
            setPassword('')
            setUserName('')
            setName('')
        }
        if (registerError) {
            toast.error(registerError?.response?.data?.message)
        }
    }, [registerSuccess, registerData, registerError])
    const handelLogin = () => {
        if (!userName || !password) {
            toast.error('All Fields Are Required')
            return
        }
        else {
            login({ email: userName, password })
        }
    }
    const handelRegister = async () => {
        if (!name, !userName, !password) {
            toast.error('All Fields Are Required')
        }
        else {
            register({ name, email: userName, password })
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-100 flex justify-center items-center '>
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
                                <Button disabled={registerPending} onClick={handelRegister}> {
                                    registerPending ? <><Loader className='animate-spin' />Please Wait</> : 'Register'
                                }</Button>
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
                            </CardContent>
                            <CardFooter >
                                <Button disabled={loginPending} onClick={handelLogin} className={'w-fit'}>
                                    {
                                        loginPending ? <><Loader className='animate-spin' />Please Wait</> : 'Login'
                                    }
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default LoginPage