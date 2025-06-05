'use client';
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/firebase/config";
import { useParams, useRouter } from "next/navigation";
import { useChatId } from "@/hooks/useFirebaseChatId";
import LeftSide from "@/components/LeftSidebar";
import RightSide from "@/components/RightSidebar";
import Image from "next/image";

const ChatPage = () => {
    const params = useParams();
    const chatId = params.chatId as string;
    const currentUser = auth.currentUser;
    const router = useRouter()
    const [otherUser, setOtherUser] = useState<{ name: string; uid: string } | null>(null);

    useEffect(() => {
        const fetchOtherUser = async () => {
            const currentUid = auth.currentUser?.uid;
            if (!currentUid || !chatId) return;

            const chatDoc = await getDoc(doc(db, "chats", chatId));
            if (!chatDoc.exists()) return;

            const members = chatDoc.data().members;
            const otherUid = members.find((id: string) => id !== currentUid);
            if (!otherUid) return;

            const userDoc = await getDoc(doc(db, "users", otherUid));
            if (userDoc.exists()) {
                setOtherUser({ uid: otherUid, name: userDoc.data().name });
            }
        };

        fetchOtherUser();
    }, [chatId]);


    const { messages, text, setText, sendMessage, sending } = useChatId(chatId);

    const groupMessagesByDate = () => {
        const groups: { [date: string]: typeof messages } = {};
        messages.forEach((msg) => {
            const date = new Date(msg.timestamp?.seconds * 1000).toDateString();
            if (!groups[date]) groups[date] = [];
            groups[date].push(msg);
        });
        return groups;
    };

    const groupedMessages = groupMessagesByDate();

    const previousPage = () => {
        router.back()
    }

    return (
        <div className="bg-white">

            <LeftSide />

            <div className="w-[56%] mx-[20%] max-[850px]:mx-0 max-[850px]:w-full h-screen flex flex-col">

                <div className="p-5 border-b border-gray-300 bg-white sticky top-0 z-10">

                    <p className="font-semibold text-xl text-center">
                        {otherUser ? otherUser.name : "Loading..."}
                    </p>

                    <div className="w-6">
                        <Image 
                            src="/upright.png" 
                            alt="Left Arrow" 
                            className="absolute left-4 top-6 rotate-[225deg] w-6 cursor-pointer"
                            onClick={previousPage}
                            width={100} 
                            height={100}
                        />
                    </div>
                    
                    
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">

                    {
                        Object.entries(groupedMessages).map(([date, msgs]) => (

                            <div key={date}>

                                <p className="text-center text-sm text-gray-500 my-3">{date}</p>

                                {   
                                    msgs.map(msg => {
                                        const isSender = msg.senderId === currentUser?.uid;

                                        return (
                                            <div 
                                                key={msg.id} 
                                                className={`flex mb-2 ${
                                                    isSender ? 'justify-end' : 'justify-start'
                                                }`}
                                            >

                                                <div
                                                    className={`max-w-[45%] rounded-xl px-2 py-1.5 ${
                                                        isSender 
                                                            ? "bg-midnight text-white ml-auto" 
                                                            : "bg-gray-200 text-black"
                                                    }`}
                                                >   
                                                
                                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                                    <p className="text-xs text-right mt-1 opacity-70">
                                                        {
                                                            msg.timestamp?.seconds &&
                                                            new Date(msg.timestamp.seconds * 1000).toLocaleTimeString("en-NG", {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                                hour12: true,
                                                                timeZone: "Africa/Lagos",
                                                            })
                                                        }
                                                    </p>

                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>

                        ))
                    }

                </div>

                {
                    sending && (
                        <div className="relative bottom-5 mx-auto bg-midnight shadow-lg py-2 px-6 rounded-xl">
                            <p className="text-lg text-white text-center italic">Sending...</p>
                        </div>
                    )
                }

                <div className="flex items-center gap-2 border-t-[3px] border-gray-300 py-2 px-7 rounded-tl-xl rounded-tr-xl">

                    <button className="mr-5">
                        <Image
                            src="/Plus.png"
                            alt="Plus Icon"
                            className="cursor-pointer w-8"
                            width={100} 
                            height={100}
                        />
                    </button>

                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type a comment"
                        className="flex-1 outline-none placeholder-midnight bg-transparent"
                        onKeyDown={e => {
                            if (e.key === "Enter") sendMessage();
                        }}
                    />
                    <button 
                        onClick={() => sendMessage()}
                        disabled={sending}
                        className="ml-2"
                    >
                        <Image
                            src="/Send.png"
                            alt="Comment Icon"
                            className="cursor-pointer w-8"
                            width={100} 
                            height={100}
                        />
                    </button>

                </div>
            </div>

            <RightSide />

        </div>
    );
};

export default ChatPage;
