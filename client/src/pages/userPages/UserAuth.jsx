import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

const UserAuth = () => {
    const { loginWithRedirect } = useAuth0();

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
                                    <Label htmlFor="tabs-demo-name">Email</Label>
                                    <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-username">Password</Label>
                                    <Input id="tabs-demo-username" defaultValue="@peduarte" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-username">Name</Label>
                                    <Input id="tabs-demo-username" defaultValue="@peduarte" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save changes</Button>
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
                                    <Label htmlFor="tabs-demo-current">UserName</Label>
                                    <Input id="tabs-demo-current" type="text" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-new">password</Label>
                                    <Input id="tabs-demo-new" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter className={'flex flex-col gap-3'}>
                                <Button>Save password</Button>
                                <Button variant="outline" onClick={() => loginWithRedirect()} >
                                    Login with Google
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default UserAuth