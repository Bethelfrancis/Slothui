import Link from "next/link";

const BottomNav = () => {
    return (
        <div className="hidden fixed left-0 bottom-0 bg-white max-[850px]:flex items-center justify-between w-full h-14 py-1.5 border-t border-gray-300 z-20">
            
            {/* <div className="w-full space-y-6"> */}
                <Link className="w-full flex flex-col items-center justify-between max-[455px]:justify-center h-full hover:bg-blues rounded-lg cursor-pointer" href='/dashboard'>
                    <img src="/feeds.png" alt="Home" className="w-5 max-[455px]:w-6"/>
                    <p className="text-sml max-[455px]:hidden">Home</p>
                </Link>

                <Link className="w-full flex flex-col items-center justify-between max-[455px]:justify-center h-full hover:bg-blues rounded-lg cursor-pointer" href='/friends'>
                    <img src="/friends.png" alt="Friends" className="w-5 max-[455px]:w-6"/>
                    <p className="text-sml max-[455px]:hidden">Friends</p>
                </Link>

                <Link className="w-full flex flex-col items-center justify-between max-[455px]:justify-center h-full hover:bg-blues rounded-lg cursor-pointer" href='/messages'>
                    <img src="/chat-mesage.png" alt="Messages" className="w-4 max-[455px]:w-5 opacity-50"/>
                    <p className="text-sml max-[455px]:hidden">Messages</p>
                </Link>
                
                <Link className="w-full flex flex-col items-center justify-between max-[455px]:justify-center h-full hover:bg-blues rounded-lg cursor-pointer" href='/user-profile'>
                    <img src="/user.png" alt="Profile" className="w-4 max-[455px]:w-5 opacity-50"/>
                    <p className="text-sml max-[455px]:hidden">Profile</p>
                </Link>

                <Link className="w-full flex flex-col items-center justify-between max-[455px]:justify-center h-full hover:bg-blues rounded-lg cursor-pointer" href='/setting'>
                    <img src="/seting.png" alt="Settings" className="w-5 max-[455px]:w-6"/>
                    <p className="text-sml max-[455px]:hidden">Settings</p>
                </Link>
            {/* </div> */}

        </div>
    );
}
 
export default BottomNav;