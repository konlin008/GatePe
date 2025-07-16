import React, { useEffect } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Check, ChevronDown } from "lucide-react"


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
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { logout } = useAuth0();

    useEffect(() => {
        if (isAuthenticated && user) {
            console.log(user);
        }
    }, [user])

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div className='h-18 w-full px-60 border-b-2  flex items-center justify-between'>
            <div className='flex items-center space-x-10'>
                <h1 className='font-semibold text-2xl'>Gate<span className='text-blue-500'>Pe</span></h1>
                <Input className={'focus-visible:ring-0 w-150 border-none bg-gray-200'} placeholder={'Search for Movies, Events, Sports'} />
            </div>
            <div className='flex space-x-2'>
                <div>
                    <Popover open={open} onOpenChange={setOpen} >
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
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
                                    <CommandEmpty>No framework found.</CommandEmpty>
                                    <CommandGroup>
                                        {indianCities.map((framework) => (
                                            <CommandItem
                                                key={framework.value}
                                                value={framework.value}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue === value ? "" : currentValue)
                                                    setOpen(false)
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
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
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

    )
}

export default Navbar