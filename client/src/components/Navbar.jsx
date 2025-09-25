import React, { useEffect } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Check, ChevronDown, Import } from "lucide-react"


import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import NavbarFooter from './NavbarFooter'
import { useUserStore } from '@/app/userStore'
import { useLocationStore } from '@/app/locationStore'



const indianCities = [
    { value: "delhi", label: "Delhi" },
    { value: "mumbai", label: "Mumbai" },
    { value: "bangalore", label: "Bangalore" },
    { value: "hyderabad", label: "Hyderabad" },
    { value: "kolkata", label: "Kolkata" },
    { value: "chennai", label: "Chennai" },
    { value: "pune", label: "Pune" },
    { value: "ahmedabad", label: "Ahmedabad" },
    { value: "jaipur", label: "Jaipur" },
    { value: "lucknow", label: "Lucknow" },
    { value: "kanpur", label: "Kanpur" },
    { value: "nagpur", label: "Nagpur" },
    { value: "bhopal", label: "Bhopal" },
    { value: "indore", label: "Indore" },
    { value: "patna", label: "Patna" },
    { value: "chandigarh", label: "Chandigarh" },
    { value: "visakhapatnam", label: "Visakhapatnam" },
    { value: "coimbatore", label: "Coimbatore" },
    { value: "guwahati", label: "Guwahati" },
    { value: "bhubaneswar", label: "Bhubaneswar" },
]



const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();
    const { user, isAuthenticated, isLoading } = useAuth0();


    const logIn = useUserStore((state) => state.logIn);
    const userdetails = useUserStore((state) => state.user)
    const setLocation = useLocationStore((state) => state.setLocation)
   


    useEffect(() => {
        if (isAuthenticated && user) {
            registerUser()
        }
    }, [user, isAuthenticated])
    const registerUser = async () => {
        try {
            const result = await axios.post(`${import.meta.env.VITE_USER_API}check `, { email: user.email })
            if (!result?.data.exists) {
                const res = await axios.post(`${import.meta.env.VITE_USER_API}register`, {
                    email: user.email,
                    name: user.name,
                    picture: user.picture
                })
                const userInfo = res?.data.userData
                logIn(userInfo)
            }
            else {
                const userInfo = result?.data.userData
                logIn(userInfo)
            }
        } catch (error) {
            alert(error)
        }
    }
    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <nav className='sticky top-0 z-50 bg-white shadow-md'>
            <div className='h-18 w-full px-60   flex items-center justify-between sticky top-0'>
                <div className='flex items-center space-x-10'>
                    <h1 className='font-semibold text-2xl'>Gate<span className='text-blue-500'>Pe</span></h1>
                    <Input className={'focus-visible:ring-0 w-150 border-none bg-gray-200'} placeholder={'Search for Movies, Events, Sports'} />
                </div>
                <div className='flex space-x-2'>
                    <div>
                        <Popover open={open} onOpenChange={setOpen} >
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[150px] justify-between border-none hover:bg-white shadow-none cursor-pointer"
                                >
                                    {value
                                        ? indianCities.find((framework) => framework.value === value)?.label
                                        : "Location"}
                                    <ChevronDown />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search location..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>No cities found</CommandEmpty>
                                        <CommandGroup>
                                            {indianCities.map((framework) => (
                                                <CommandItem
                                                    key={framework.value}
                                                    value={framework.value}
                                                    onSelect={(currentValue) => {
                                                        const newValue = currentValue === value ? "" : currentValue;
                                                        setValue(newValue);
                                                        const selectedCity = indianCities.find(c => c.value === newValue)?.label || "";
                                                        setLocation(selectedCity);


                                                        setOpen(false);
                                                    }}
                                                >
                                                    {framework.label}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto",
                                                            value === framework.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>

                    </div>

                    {
                        isAuthenticated ? (
                            <>
                                <Avatar>
                                    <AvatarImage src={userdetails?.profilePicture || "https://github.com/shadcn.png"} />
                                    <AvatarFallback>
                                        {userdetails?.name?.[0] ?? "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    className={'bg-blue-600 hover:bg-blue-500'}
                                    onClick={() => loginWithRedirect()}
                                >
                                    Login</Button>
                            </>
                        )
                    }
                </div>
            </div>
            <NavbarFooter />
        </nav>

    )
}

export default Navbar