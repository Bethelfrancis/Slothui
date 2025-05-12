import BottomNav from "@/components/BottomNav";
import LeftSide from "@/components/LeftSidebar";
import Navbar from "@/components/Navbar";
import Post from "@/components/Posts";
import RightSide from "@/components/RightSidebar";
import TopNav from "@/components/TopNav";

const UsersDash = () => {
    return (
        <div className='bg-white'>

            <LeftSide />

            <div className="w-[56%] mx-[20%] max-[850px]:mx-0 max-[850px]:w-full">

                <Navbar />
                <TopNav />

                <div className="w-full p-6 max-[850px]:p-3 bg-gray-100 overflow-auto space-y-7 mt-16 max-[850px]:mt-36 max-[450px]:mt-[200px]">
                    
                    <Post />
                    <BottomNav />
                    
                </div>

            </div>
            
            <RightSide />

        </div>
    );
}

export default UsersDash