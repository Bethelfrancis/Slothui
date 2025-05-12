'use client'
import { useCreateChat } from "@/hooks/useFirebaseCreateChat";
import { useChatUsers } from "@/hooks/useFirebaseChat";
import { useRouter } from "next/navigation";
import LeftSide from "@/components/LeftSidebar";
import Navbar from "@/components/Navbar";
import RightSide from "@/components/RightSidebar";
import BottomNav from "@/components/BottomNav";

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
                <div className="relative border-b border-gray-300 px-4 py-[15px] max-[850px]:mt-[72px]">
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

                <div className="w-full h-screen p-6 max-[850px]:p-3 bg-gray-100 overflow-auto space-y-7">
                    
                    <div>
                        <h2 className="text-xl font-semibold mb-7">All Messages</h2>
                        <div className="space-y-7">
                            {
                                chatUsers && chatUsers?.length > 0
                                    ? chatUsers?.map((user) => (
                                        <div 
                                            key={user.uid} 
                                            className="cursor-pointer" 
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

                                        </div>
                                    ))  : isLoading 
                                        ? ''
                                        : (
                                            <p className="text-med text-gray-600">
                                                You have no friend try follow one
                                            </p>
                                        )
                            }

                            {
                                isLoading && (
                                    <div className="cursor-pointer space-y-6">

                                        <div className="flex gap-3 items-center">
                                            <div className="w-12 h-12 rounded-full object-cover bg-white">
                                            </div>
                                            <div className="space-y-2">
                                                <p className="w-40 h-2.5 bg-white rounded-lg"></p>
                                                <p className="w-20 h-2.5 bg-white rounded-lg"></p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 items-center">
                                            <div className="w-12 h-12 rounded-full object-cover bg-white">
                                            </div>
                                            <div className="space-y-2">
                                                <p className="w-40 h-2.5 bg-white rounded-lg"></p>
                                                <p className="w-20 h-2.5 bg-white rounded-lg"></p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 items-center">
                                            <div className="w-12 h-12 rounded-full object-cover bg-white">
                                            </div>
                                            <div className="space-y-2">
                                                <p className="w-40 h-2.5 bg-white rounded-lg"></p>
                                                <p className="w-20 h-2.5 bg-white rounded-lg"></p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 items-center">
                                            <div className="w-12 h-12 rounded-full object-cover bg-white">
                                            </div>
                                            <div className="space-y-2">
                                                <p className="w-40 h-2.5 bg-white rounded-lg"></p>
                                                <p className="w-20 h-2.5 bg-white rounded-lg"></p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 items-center">
                                            <div className="w-12 h-12 rounded-full object-cover bg-white">
                                            </div>
                                            <div className="space-y-2">
                                                <p className="w-40 h-2.5 bg-white rounded-lg"></p>
                                                <p className="w-20 h-2.5 bg-white rounded-lg"></p>
                                            </div>
                                        </div>

                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <BottomNav />

                </div>

            </div>

            <RightSide />
        
        </div>
    );
}
 
export default Messages;