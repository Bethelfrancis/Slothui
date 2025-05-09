'use client'
import { useCreateChat } from "@/hooks/useFirebaseCreateChat";
import { useChatUsers } from "@/hooks/useFirebaseChat";
import { useRouter } from "next/navigation";
import LeftSide from "@/components/LeftSidebar";
import Navbar from "@/components/Navbar";
import RightSide from "@/components/RightSidebar";

const Messages = () => {
    const { data: chatUsers, isLoading } = useChatUsers()
    const router = useRouter();
    const { mutate: createChat } = useCreateChat();

    const handleClick = (uid: string) => {
        createChat(uid, {
            onSuccess: (chatId) => {
                router.push(`/messages/${chatId}`);
            },
            onError: (err) => {
                console.error("Failed to create chat:", err);
            },
        });
    };

    return (
        <div className='bg-white'>
        
            <LeftSide />

            <div className="w-[56%] mx-[20%] max-[850px]:mx-0 max-[850px]:w-full">

                <Navbar />
                <div className="relative border-b border-gray-300 px-4 py-[15px]">
                    <input
                        type="text"
                        placeholder="Search chat here….."
                        className="w-full border border-midnight rounded-2xl py-2 px-4 pl-10 text-sm outline-none"
                    />
                    <svg
                        className="w-4 h-4 absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <div className="w-full p-6 max-[850px]:p-3 bg-gray-100 overflow-auto space-y-7 max-[850px]:mt-36 max-[450px]:mt-[200px]">
                    
                    {/* <div className="relative">
                        <input
                            type="text"
                            placeholder="Search chat here….."
                            className="w-full border border-midnight rounded-2xl py-2 px-4 pl-10 text-sm outline-none"
                        />
                        <svg
                            className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div> */}

                    <div>
                        <h2 className="text-lg font-semibold mb-2">Frequently chatted</h2>
                        <div className="flex space-x-3 overflow-x-auto">
                            {
                                [1, 2, 3, 4, 5].map((_, index) => (
                                    <div key={index} className="relative w-12 h-12 rounded-full overflow-hidden">
                                        <img 
                                            src="/user-img.png" 
                                            alt="avatar" 
                                            className="w-full h-full object-cover rounded-full" 
                                        />
                                        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border border-white ${index === 4 ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-7">All Messages</h2>
                        <div className="space-y-7">
                            {chatUsers?.map((user) => (
                                <div 
                                    key={user.uid} 
                                    className="flex justify-between items-center cursor-pointer" 
                                    onClick={() => handleClick(user.uid)}
                                >

                                    <div className="flex gap-3 items-start">
                                        <img 
                                            src={user.image} 
                                            alt="avatar" 
                                            className="w-12 h-12 rounded-full object-cover" 
                                        />
                                        <div className="text-med">
                                            <p className="font-semibold">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.username}</p>
                                        </div>
                                    </div>

                                    {/* <div className="flex flex-col items-end">

                                        <p className="text-xs text-gray-500">{user.time}</p>

                                        {
                                            user.count && (
                                                <span className="bg-midnight text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center mt-1">
                                                    {user.count}
                                                </span>
                                            )
                                        }

                                        {
                                            user.check && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-4 h-4 text-gray-400 mt-1"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )
                                        }
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

            <RightSide />
        
        </div>
    );
}
 
export default Messages;