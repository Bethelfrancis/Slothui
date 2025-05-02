import { useQuery } from "@tanstack/react-query";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/firebase/config";

export interface Post {
    id: string;
    postImage: string;
    desc: string;
    likes: string;
    uid: string;
    [key: string]: any; 
}

export interface FirebaseUser {
    uid: string;
    name: string;
    username: string;
    bio?: string;
    image: string;
    background?: string;
    followers: string[];
    following: string[];
    savedPosts: string[];
    userPosts: Post[];
    savedPostsData: Post[];
}


const fetchFirebaseUser = async (): Promise<FirebaseUser> => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error("User not found");

    const userData = docSnap.data() as Omit<FirebaseUser, "userPosts" | "savedPostsData">;

    const postsRef = collection(db, "posts");
    const postsQuery = query(postsRef, where("uid", "==", user.uid));
    const postsSnap = await getDocs(postsQuery);
    const userPosts: Post[] = postsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
    
    let savedPostsData: Post[] = [];
    if (userData.savedPosts?.length > 0) {
        const batch = userData.savedPosts.slice(0, 10); // Firestore limit
        const savedQuery = query(postsRef, where("__name__", "in", batch));
        const savedSnap = await getDocs(savedQuery);
        savedPostsData = savedSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
    }

    return {
        ...userData,
        userPosts,
        savedPostsData,
        uid: user.uid,
    };
};

export const useFirebaseUser = () => {
    return useQuery<FirebaseUser>({
        queryKey: ["firebaseUser"],
        queryFn: fetchFirebaseUser,
        staleTime: 1000 * 60 * 5,
    });
};
