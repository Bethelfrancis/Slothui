'use client';
import { useParams } from "next/navigation";
import { auth } from "@/firebase/config";
import { useChatId } from "@/hooks/useFirebaseChatId";

export default function ChatPage() {
    const params = useParams();
    const chatId = params.chatId as string;
    const currentUser = auth.currentUser;

    const { messages, text, setText, sendMessage, sending } = useChatId(chatId);

    return (
        <div className="max-w-2xl mx-auto h-screen flex flex-col bg-white">
            <div className="p-4 border-b font-semibold text-lg sticky top-0 bg-white z-10">
                Chat ID: {chatId}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`max-w-[70%] p-2 rounded-lg ${
                            msg.senderId === currentUser?.uid
                                ? "bg-blue-500 text-white ml-auto"
                                : "bg-gray-200 text-black"
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 border-t p-4">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message"
                    className="flex-1 border px-4 py-2 rounded-full outline-none"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") sendMessage();
                    }}
                />
                <button
                    onClick={() => sendMessage()}
                    disabled={sending}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
                >
                    {sending ? "Sending..." : "Send"}
                </button>
            </div>
        </div>
    );
}
