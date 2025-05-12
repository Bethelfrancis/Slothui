import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface Post {
    uid: string | undefined
    name: string | undefined
    bio: string | undefined
    image: string | undefined
    desc: string
    postImage: string | null
    likes: string[]
    comment: any[]
}

export const useAddPosts = () => {
    const queryClient = useQueryClient();

    const addPost = async (post: Post) => {
        const docRef = await addDoc(collection(db, "posts"), {
        ...post,
        createdAt: serverTimestamp(),
        });
        return docRef;
    };

    return useMutation({
        mutationFn: addPost,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
};
