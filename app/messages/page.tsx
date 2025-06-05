'use client'
import { useCreateChat } from "@/hooks/useFirebaseCreateChat";
import { useChatUsers } from "@/hooks/useFirebaseChat";
import { useRouter } from "next/navigation";
import LeftSide from "@/components/LeftSidebar";
import Navbar from "@/components/Navbar";
import RightSide from "@/components/RightSidebar";
import BottomNav from "@/components/BottomNav";
import Search from "@/components/Search";
import Image from "next/image";

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
                <Search />

                <div className="w-full h-screen p-6 max-[850px]:p-3 bg-gray-100 overflow-auto space-y-7 max-[850px]:mt-[70px]">
                    
                    <div className="mt-14 max-[850px]:mt-0">
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
                                                <Image 
                                                    src={user.image} 
                                                    alt="avatar" 
                                                    className="w-12 h-12 rounded-full object-cover"
                                                    width={100} 
                                                    height={100}
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
                                    Array(5).fill(0).map((_, index) => (
                                        <div key={index} className="flex gap-3 items-center mb-4 animate-pulse">
                                            <div className="w-12 h-12 rounded-full object-cover bg-white">
                                            </div>
                                            <div className="space-y-2">
                                                <p className="w-40 h-2.5 bg-white rounded-lg"></p>
                                                <p className="w-20 h-2.5 bg-white rounded-lg"></p>
                                            </div>
                                        </div>
                                    ))
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