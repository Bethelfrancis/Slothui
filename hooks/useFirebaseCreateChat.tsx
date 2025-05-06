import { useMutation } from "@tanstack/react-query";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase/config";

const createChat = async (otherUid: string): Promise<string> => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("Not authenticated");

    const chatId = [currentUser.uid, otherUid].sort().join("_");
    const chatRef = doc(db, "chats", chatId);

    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) {
        await setDoc(chatRef, {
            members: [currentUser.uid, otherUid],
            createdAt: serverTimestamp(),
            lastMessage: null,
        });

        const currentUserRef = doc(db, "users", currentUser.uid);
        const otherUserRef = doc(db, "users", otherUid);

        await Promise.all([
            updateDoc(currentUserRef, {
                chats: arrayUnion(chatId),
            }),
            updateDoc(otherUserRef, {
                chats: arrayUnion(chatId),
            }),
        ]);
    }

    return chatId;
};

export const useCreateChat = () => {
    return useMutation({
        mutationFn: createChat,
    });
};
