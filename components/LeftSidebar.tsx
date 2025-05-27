"use client";
import Link from "next/link";
import { useFirebaseUser } from "@/hooks/useFirebaseUser";

const LeftSide = () => {
    const { data: userData, isLoading, isError, error } = useFirebaseUser();

    return (
        <div 
            className="w-[20%] h-screen fixed max-[850px]:absolute max-[850px]:-left-full left-0 top-0 border-r border-gray-300 p-4 max-lg:p-2 flex flex-col justify-between"
        >
            
            <div className="w-full space-y-9">
                <div className="w-full">
                    <Link href='/dashboard'>
                        <img src="/Logo.png" alt="Logo" className="-ml-2 cursor-pointer"/>
                    </Link>
                    
                    <div className="flex items-center justify-start mt-4">
                        <img src="/search.png" alt="search icon" className="border border-r-0 border-gray-300 px-2 py-1.5 rounded-l-3xl cursor-pointer hover:shadow-2xl"/>
                        <input type="text" placeholder="Search..." className="border border-l-0 border-gray-300 px-2 py-1 rounded-r-3xl placeholder:font-medium w-full outline-0"/>
                    </div>
                </div>

                <div className="w-full space-y-6">
                    <Link className="w-full flex items-center py-1 px-3 hover:bg-blues rounded-lg cursor-pointer" href='/dashboard'>
                        <img src="/feeds.png" alt="Home" className="mr-3 w-5"/>
                        <p className="text-sml">Home</p>
                    </Link>

                    <Link className="w-full flex items-center py-1 px-3 hover:bg-blues rounded-lg cursor-pointer" href='/friends'>
                        <img src="/friends.png" alt="Friends" className="mr-3 w-5"/>
                        <p className="text-sml">Friends</p>
                    </Link>

                    <Link className="w-full flex items-center py-1 px-3 hover:bg-blues rounded-lg cursor-pointer" href='/messages'>
                        <img src="/chat-mesage.png" alt="Messages" className="mr-3 w-4 opacity-50"/>
                        <p className="text-sml">Messages</p>
                    </Link>
                    
                    <Link className="w-full flex items-center py-1 px-3 hover:bg-blues rounded-lg cursor-pointer" href='/user-profile'>
                        <img src="/user.png" alt="Profile" className="mr-3 w-4 opacity-50"/>
                        <p className="text-sml">Profile</p>
                    </Link>

                    <Link className="w-full flex items-center py-1 px-3 hover:bg-blues rounded-lg cursor-pointer" href='/setting'>
                        <img src="/seting.png" alt="Settings" className="mr-3 w-5"/>
                        <p className="text-sml">Settings</p>
                    </Link>
                </div>
            </div>

            <div className="flex items-center justify-between w-full">
                {userData && (
                    <>
                        <div className="flex items-center">
                            <img 
                                src={userData?.image} 
                                alt="User Image" 
                                className="w-10 h-10 rounded-full object-cover mr-2 max-lg:hidden"
                            />

                            <div className="hidden max-lg:block">
                                <p className="text-sml font-semibold">Logout</p>
                            </div>

                            <div className="max-lg:hidden block">
                                <p className="text-sml font-semibold">
                                    {userData?.name}
                                </p>
                                <p className="text-xs opacity-60">
                                    {'Basic Member'}
                                </p>
                            </div>
                        </div>

                        <Link href='/login'>
                            <img src="/exit.png" alt="Logout Icon" className="hover:border-2 border-2 border-transparent hover:border-red-600 p-1 cursor-pointer rounded-lg transition-all duration-500"/>
                        </Link>
                    </>
                )}

                {
                    isError && <h2 className="text-red-700 text-lg text-center">{error.message}</h2>
                }

                {
                    isLoading && (
                        <div className="flex items-center justify-between w-full py-3 animate-pulse">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-300 mr-2" />
                                <div className="space-y-1">
                                    <div className="w-24 h-3 bg-gray-300 rounded" />
                                    <div className="w-16 h-2 bg-gray-300 rounded" />
                                </div>
                            </div>
                            <div className="w-5 h-5 bg-gray-300 rounded" />
                        </div>
                    )
                }
            </div>

        </div>
    );
}
 
export default LeftSide;
