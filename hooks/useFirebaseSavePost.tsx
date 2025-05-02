import { db } from "@/firebase/config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export const savePost = async ({ userId, postId }: { userId: string, postId: string }) => {
  const userRef = doc(db, "users", userId);

  await updateDoc(userRef, {
    savedPosts: arrayUnion(postId),
  });
};
