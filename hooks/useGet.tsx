// 'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";


interface Hero {
    id: number,
    uid: string,
    name: string,
    bio: string,
    image: string,
    desc: string,
    postImage: string,
    likes: number,
    comment: any[],
    share: number
}

const fetchHeros = async (url: string): Promise<Hero[]> => {
    const { data } = await axios.get(url)
    return data;
}

export const useGet = (url: string) => {
    return useQuery({
        queryKey: ['post', url],
        queryFn: () => fetchHeros(url),
        enabled: !!url
    });
}

const fetchHerosId = async (url: string) => {
    const { data } = await axios.get(url)
    return data;
}

export const useGetId = (url: string) => {
    return useQuery({
        queryKey: ['user', url],
        queryFn: () => fetchHerosId(url),
        enabled: !!url
    });
}

export interface Post {
    id: number,
    uid: string | undefined,
    name: string,
    bio: string,
    image: string,
    desc: string, 
    postImage: string | null,
    likes: number,
    comment: any[],
    share: number
}

const addPost = async (post: Post) => {
    const { id, ...rest } = post;
    const docRef = await addDoc(collection(db, "posts"), {
      ...rest,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...rest };
};

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};


// export interface Post {
//     id: number,
//     uid: string,
//     name: string,
//     bio: string,
//     image: string,
//     desc: string, 
//     postImage: string | null,
//     likes: number,
//     comment: any[],
//     share: number
// }

// const addPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
//     return await axios.post('http://localhost:4000/post', post)
// }

// export const useAddPost = () => {
//     const queryClient = useQueryClient();

//     return useMutation<Post, Error, Omit<Post, 'id'>>({
//         mutationFn: addPost,
//         onSuccess: newPost => {
//             queryClient.setQueryData<Post[]>(['post'], (oldPost = []) => [newPost, ...oldPost])
//         }
//     })
// }


// enabled: !!url,