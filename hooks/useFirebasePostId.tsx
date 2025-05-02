import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export interface Post {
    id: string,
    uid: string,
    name: string,
    bio: string,
    image: string,
    desc: string, 
    postImage: string | null,
    likes: string[],
    comment: any[],
    share: number
}

const fetchPostById = async (id: string): Promise<Post> => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        throw new Error("Post not found");
    }

    return { id: docSnap.id, ...docSnap.data() } as Post
};

export const useGetPostById = (id: string) => {
    return useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPostById(id),
        enabled: !!id,
    });
};
