// hooks/useDeletePost.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

const deletePost = async (postId: string) => {
    const postRef = doc(db, "posts", postId);
    await deleteDoc(postRef);
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            console.error("Error deleting post:", error);
        }
    });
};
