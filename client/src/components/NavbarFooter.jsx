import useUserStore from "@/app/userStore";
import { useRole } from "@/queries/user.queries";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const NavbarFooter = () => {
    const [active, setActive] = useState("For You");
    const navigate = useNavigate()
    const { user } = useUserStore()
    const { isSuccess, data, } = useRole(user?.isLoggedIn)

    const organizerHandler = () => {
        if (!user.isLoggedIn) {
            navigate('/login')
        }
        if (isSuccess) {
            if (data?.role === 'user' && data.status === 'none') {
                navigate('become-organizer')
            }
            if (data?.role === 'user' && (data?.status === 'pending' || data?.status === 'rejected')) {
                navigate(`/status-page/${data?.status}`)
            }
            if (data?.role === 'organizer') {
                navigate('organizer-dashboard')
            }
        }
    }

    const onClickHandler = (tabName) => {
        if (!location) {
            alert("Select Location")
        } else {
            setActive(tabName);
            navigate(`/${tabName}`)
        }

    };
    const onClickForYou = () => {
        if (!location) {
            alert("Select Location")
        } else {
            setActive('For You');
            navigate(`/`)
        }
    }

    return (
        <div className="h-11 w-full px-60 flex items-center justify-between bg-gray-100">
            <div className="flex space-x-4">
                <h2
                    onClick={onClickForYou}
                    className={
                        active === "For You"
                            ? "text-gray-500 hover:text-gray-900 cursor-pointer border-b-2 border-gray-500"
                            : "text-gray-500 hover:text-gray-900 cursor-pointer"
                    }
                >
                    For You
                </h2>
                <h2
                    onClick={() => onClickHandler("Events")}
                    className={
                        active === "Events"
                            ? "text-gray-500 hover:text-gray-900 cursor-pointer border-b-2 border-gray-500"
                            : "text-gray-500 hover:text-gray-900 cursor-pointer"
                    }
                >
                    Events
                </h2>
                <h2
                    onClick={() => onClickHandler("Movies")}
                    className={
                        active === "Movies"
                            ? "text-gray-500 hover:text-gray-900 cursor-pointer border-b-2 border-gray-500"
                            : "text-gray-500 hover:text-gray-900 cursor-pointer"
                    }
                >
                    Movies
                </h2>
                <h2
                    onClick={() => onClickHandler("Sports")}
                    className={
                        active === "Sports"
                            ? "text-gray-500 hover:text-gray-900 cursor-pointer border-b-2 border-gray-500"
                            : "text-gray-500 hover:text-gray-900 cursor-pointer"
                    }
                >
                    Sports
                </h2>
            </div>
            <div className="flex space-x-4 items-center justify-between">
                <h2
                    onClick={organizerHandler}
                    className={
                        active === "Organizer"
                            ? "text-gray-500 hover:text-gray-900 cursor-pointer border-b-2 border-gray-500"
                            : "text-gray-500 hover:text-gray-900 cursor-pointer"
                    }
                >
                    Organizer
                </h2>
                <h2
                    onClick={() => onClickHandler("GateMate")}
                    className={
                        active === "GateMate"
                            ? "text-gray-500 hover:text-gray-900 cursor-pointer border-b-2 border-gray-500"
                            : "text-gray-500 hover:text-gray-900 cursor-pointer"
                    }
                >
                    GateMate
                </h2>
            </div>
        </div >
    );
};

export default NavbarFooter;
