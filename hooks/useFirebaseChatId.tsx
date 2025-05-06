import { useEffect, useState } from "react";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Message {
    id: string;
    text: string;
    senderId: string;
    timestamp?: any;
}

export const useChatId = (chatId: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState("");
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!chatId) return;

        const q = query(
            collection(db, "chats", chatId, "messages"),
            orderBy("timestamp", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Message[];

            setMessages(msgs);
            queryClient.setQueryData(["chat-messages", chatId], msgs);
        });

        return () => unsubscribe();
    }, [chatId, queryClient]);

    const sendMessageMutation = useMutation({
        mutationFn: async () => {
            const user = auth.currentUser;
            if (!user || !text.trim()) return;

            await addDoc(collection(db, "chats", chatId, "messages"), {
                senderId: user.uid,
                text: text.trim(),
                timestamp: serverTimestamp(),
            });

            setText("");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chat-messages", chatId] });
        },
    });

    return {
        messages,
        text,
        setText,
        sendMessage: sendMessageMutation.mutate,
        sending: sendMessageMutation.isPending,
    };
};
