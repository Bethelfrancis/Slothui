import Image from "next/image";
import Link from "next/link";
import React from "react";

interface User {
    id: string;
    username: string;
    image: string;
    name: string
}

interface FriendsProps {
    users?: User[];
    isLoading: boolean;
}


const Friends: React.FC<FriendsProps> = ({ users, isLoading }) => {

    return (
        <div className="w-full h-screen mx-auto p-6 max-[850px]:p-3 bg-gray-100">

            <div className="space-y-4">

                {  
                    isLoading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm animate-pulse"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 rounded-full bg-gray-300"></div>

                                    <div className="space-y-2">
                                        <div className="h-4 w-32 bg-gray-300 rounded"></div>
                                        <div className="h-3 w-24 bg-gray-300 rounded opacity-70"></div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 px-4 py-1.5 bg-gray-300 rounded-full w-24 h-9"></div>
                            </div>
                        ))
                    ) : users && users.length > 0 
                            ? users?.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                                >
                                    <div className="flex items-center space-x-3">
                                        <Image 
                                            src={user.image} 
                                            alt={user.name} 
                                            className="w-12 h-12 rounded-full object-cover" 
                                            width={100} 
                                            height={100}
                                        />

                                        <div>
                                            <h3 className="text-lg font-semibold">{user.name}</h3>
                                            <p className="opacity-65 text-sm">{user.username}</p>
                                        </div>

                                    </div>
                                    
                                    <Link href={`profile/${user.id}`}>
                                    <button className="flex items-center space-x-2 bg-blues text-white px-4 py-1.5 rounded-full hover:bg-midnight transition-all duration-500 cursor-pointer">
                                            Follow
                                            <Image
                                                src="/plusw.png" 
                                                alt="Plus" 
                                                className="ml-2 -mt-0.5 w-4"
                                                width={100} 
                                                height={100}
                                            />
                                        </button> 
                                    </Link>
                                    
                                </div>
                        )) : (
                            <p className='text-center text-black opacity-65 text-lg mt-10'>No friend suggestions at the moment.</p>
                        )
                }
            </div>
        </div>
    );
}
 
export default Friends;