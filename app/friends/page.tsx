"use client";
import { useFetchSuggestedUsers } from "@/hooks/useFirebaseSuggestedUsers";
import LeftSide from "@/components/LeftSidebar";
import RightSide from "@/components/RightSidebar";
import Friends from "@/components/Friends";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import BottomNav from "@/components/BottomNav";

const FindFriends = () => {
    const { data: users, isLoading } = useFetchSuggestedUsers();

    return (
        <div className='bg-white'>

            <LeftSide />

            <div className="w-[56%] mx-[20%] max-[850px]:mx-0 max-[850px]:w-full">
                
                <Navbar />
                <Search />

                <div className="w-full max-[850px]:py-5 mt-16 max-[850px]:mt-[50px]">
                    
                    <Friends users={users} isLoading={isLoading} />

                </div>

                <BottomNav />

            </div>

            <RightSide />

        </div>
    );
};

export default FindFriends;
