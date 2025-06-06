import { useMutation } from "@tanstack/react-query";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase/config";

const createChat = async (otherUid: string): Promise<string> => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("Not authenticated");
    console.log('Current user:', auth.currentUser);
    const currentUserUid = currentUser.uid;
    console.log('Authenticated user UID:', currentUserUid);

    const chatId = [currentUserUid, otherUid].sort().join("_");
    const chatRef = doc(db, "chats", chatId);

    const chatSnap = await getDoc(chatRef);
    
    if (!chatSnap.exists()) {
        console.log("Chat does not exist, creating new...");

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
    } else {
        console.log("Chat already exists, using existing:", chatId);
    }

    return chatId;
};

export const useCreateChat = () => {
    return useMutation({
        mutationFn: createChat,
    });
};
