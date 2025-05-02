'use client'
import { useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "@/firebase/config";

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  const toggleLike = async (postId: string, currentLikes: string[]) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const postRef = doc(db, "posts", postId);
    const liked = currentLikes.includes(userId);

    // Optimistic update: update both "posts" and "post" cache
    queryClient.setQueryData(["posts"], (oldData: any) => {
      return oldData?.map((post: any) =>
        post.id === postId
          ? {
              ...post,
              likes: liked
                ? post.likes.filter((id: string) => id !== userId)
                : [...post.likes, userId],
            }
          : post
      );
    });

    queryClient.setQueryData(["post", postId], (oldPost: any) => {
      if (!oldPost) return;
      return {
        ...oldPost,
        likes: liked
          ? oldPost.likes.filter((id: string) => id !== userId)
          : [...oldPost.likes, userId],
      };
    });

    // Update Firestore
    if (liked) {
      await updateDoc(postRef, {
        likes: arrayRemove(userId),
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(userId),
      });
    }

    // Revalidate both queries to sync
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    queryClient.invalidateQueries({ queryKey: ["post", postId] });
  };

  return toggleLike;
};
