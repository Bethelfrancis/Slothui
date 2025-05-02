"use client";

import { useState } from "react";
import LeftSide from "@/components/LeftSidebar";
import RightSide from "@/components/RightSidebar";
import Friends from "@/components/Friends";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";

const FindFriends = () => {
    const users = [
        { id: 1, name: "Bethel", username: "@bethel_dev", avatar: "/user-img.png" },
        { id: 2, name: "Alex Smith", username: "@alex_smith", avatar: "/user-img.png" },
        { id: 3, name: "Sophia James", username: "@sophia_j", avatar: "/user-img.png" },
    ];

    return (
        <div className='bg-white'>

            <LeftSide />

            <div className="w-[56%] mx-[20%] max-[850px]:mx-0 max-[850px]:w-full">
                
                <Navbar />
                <Search />

                <div className="w-full max-[850px]:py-5 mt-16 max-[850px]:mt-32">
                    
                    <Friends />

                </div>

            </div>

            <RightSide />

        </div>
    );
};

export default FindFriends;
