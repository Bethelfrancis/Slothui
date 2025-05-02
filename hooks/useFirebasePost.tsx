// hooks/usePosts.ts
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config";

const fetchPosts = async () => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const posts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));

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
