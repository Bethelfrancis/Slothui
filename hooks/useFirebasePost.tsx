// hooks/usePosts.ts
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config";

export interface PostType {
    id: string;
    uid: string;
    name: string;
    bio: string;
    image: string;
    postImage?: string;
    desc: string;
    likes: string[];
    comment: { id: string; text: string; userId: string }[];
}

const fetchPosts = async (): Promise<PostType[]> => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const posts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as PostType[];

    console.log("Query snapshot size:", querySnapshot.size);

    return posts;
};

export const usePosts = () => {
    return useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
        staleTime: 1000 * 60 * 2,
    });
};
