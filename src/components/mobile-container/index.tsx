import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Outlet } from "react-router-dom";

export default function MobileContainer() {
    
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex bg-white sticky top-0 flex-row items-center py-4 px-8 shadow-lg rounded-3xl">
                <GiHamburgerMenu size={32}/>
                <div className="flex-grow text-center">Title</div>
            </div>
            <div className="flex-grow overflow-auto">
                <Outlet />
            </div>
        </div>
    )
}