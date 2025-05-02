import { useQueries } from "@tanstack/react-query";
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

export interface ProfileInfo {
  id: string;
  postImage: string;
  desc: string;
  likes: string[];
}

export const useUserProfileData = (userId: string) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["user", userId],
        queryFn: async () => {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) throw new Error("User not found");
          return docSnap.data();
        },
        enabled: !!userId,
      },
      {
        queryKey: ["userPosts", userId],
        queryFn: async () => {
          const q = query(collection(db, "posts"), where("uid", "==", userId));
          const snapshot = await getDocs(q);
          return snapshot.docs.map(
            doc => ({
              id: doc.id,
              ...(doc.data() as Omit<ProfileInfo, "id">),
            })
          );
        },
        enabled: !!userId,
      },
    ],
  });

  const [userQuery, postsQuery] = results;

  return {
    user: userQuery.data,
    isLoadingUser: userQuery.isLoading,
    isErrorUser: userQuery.isError,
    userError: userQuery.error,

    posts: postsQuery.data,
    isLoadingPosts: postsQuery.isLoading,
    isErrorPosts: postsQuery.isError,
    postsError: postsQuery.error,
  };
};
