import { useQuery } from "@tanstack/react-query";
import { collection, getDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "@/firebase/config";

interface ChatUser {
    uid: string;
    name: string;
    image: string;
    username: string;
}

const fetchChatUsers = async (): Promise<ChatUser[]> => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("Not authenticated");

    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
    const userData = userDoc.data();
    if (!userData) throw new Error("User not found");

    const uids = Array.from(
        new Set([...(userData.following || []), ...(userData.followers || [])])
    );

    const usersCollection = collection(db, "users");
    const allUsersSnap = await getDocs(usersCollection);

    const chatUsers = allUsersSnap.docs
        .filter((doc) => uids.includes(doc.id))
        .map((doc) => {
        const data = doc.data();
        return {
            uid: doc.id,
            name: data.name,
            image: data.image,
            username: data.username,
        };
    });

    return chatUsers;
};

export const useChatUsers = () => {
    return useQuery<ChatUser[]>({
        queryKey: ["chatUsers"],
        queryFn: fetchChatUsers,
        staleTime: 5 * 60 * 1000,
    });
};
