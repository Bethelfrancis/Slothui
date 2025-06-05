'use client'
import { PostType, usePosts } from "@/hooks/useFirebasePost";
import Link from "next/link";
import { useToggleLike } from "@/hooks/useFirebaseLike";
import { useState } from 'react'
import { getAuth } from "firebase/auth";
import { useDeletePost } from "@/hooks/useFirebaseDeletePost";
import { useMutation } from "@tanstack/react-query";
import { savePost } from "@/hooks/useFirebaseSavePost";
import Image from "next/image";



const Post = () => {    
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const [clicked, setClicked] = useState(false);
    const { data: usersPosts, isLoading, isError, error } = usePosts();

    const toggleLike = useToggleLike();
    const handleLike = async (postId: string, likes: string[]) => {
        await toggleLike(postId, likes);
    };

    const { mutate: handleDeletePost } = useDeletePost()
    
    const savePostMutation = useMutation({
        mutationFn: savePost,
    });

    const handleSaveClick = async (postId: string) => {
        if (!currentUser?.uid) return;

        try {
            await savePostMutation.mutateAsync({
                userId: currentUser.uid,
                postId,
            });

            setClicked(true);
        } catch (error) {
            console.error("Error saving post:", error);
        }
    }

    return ( 
        <div className="space-y-7 max-[850px]:mb-14">

            {
                usersPosts && usersPosts.length > 0
                    ? usersPosts?.map((post: PostType) => (
                        <div key={post.id} className="w-full py-5 bg-white shadow-md border border-gray-300 rounded-2xl">

                            <div className="relative flex items-center justify-between w-full px-4 pb-5 border-b border-gray-300">
                                
                                <Link href={`profile/${post.uid}`}>
                                    <div className="flex items-center">
                                        <Image 
                                            src={post.image} 
                                            alt="User Image" 
                                            className="w-10 h-10 rounded-full object-cover mr-2"
                                            width={100} 
                                            height={100}
                                        />

                                        <div>
                                            <p className="text-sml font-semibold">
                                                {post.name}
                                            </p>
                                            <p className="text-sm opacity-60">
                                                {post.bio}
                                            </p>
                                        </div>
                                    </div>
                                </Link>

                                <div>  

                                    {
                                        currentUser?.uid === post.uid && (
                                            <Image 
                                                src="/delete-48.png" 
                                                alt="Options Icon" 
                                                className="w-5 h-5 cursor-pointer opacity-65"
                                                onClick={() => {
                                                    console.log("Trying to delete:", post.id);
                                                    handleDeletePost(post.id)
                                                }}
                                                width={100} 
                                                height={100}
                                            />
                                        )
                                    }

                                </div>

                            </div>

                            <div className="px-4 py-3">

                                <p className="text-sm opacity-80 mb-4">
                                    {post.desc}
                                </p>
                                
                                <Link href={`post/${post.id}`}>
                                    {
                                        post.postImage && (
                                            <Image 
                                                src={post.postImage} 
                                                alt="Post Image" 
                                                className="rounded-2xl mx-auto max-w-full w-fit max-h-[360px] h-full object-cover"
                                                width={100} 
                                                height={100}    
                                            />
                                        )
                                    }
                                </Link>

                                <div className="flex items-center justify-between w-full mt-5 max-[455px]:hidden">

                                    <div className="flex space-x-10">

                                        <div className="flex items-center space-x-2">
                                            <Image 
                                                src="/like.png" 
                                                alt="ThumbUp Icon"
                                                className="cursor-pointer w-6" 
                                                onClick={() => handleLike(post.id, post.likes)}
                                                width={100} 
                                                height={100}
                                            />
                                            <p className="opacity-70 text-sml">{post.likes.length} Likes</p>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Image 
                                                src="/comment.png" 
                                                alt="Comment Icon"
                                                className="cursor-pointer w-6"
                                                width={100} 
                                                height={100} 
                                            />
                                            <p className="opacity-70 text-sml">{post.comment.length} Comments</p>
                                        </div>

                                    </div>

                                    <div
                                        onClick={() => {
                                            setClicked(!clicked)
                                            handleSaveClick(post.id)
                                        }}
                                        className={`p-0.5 cursor-pointer ${clicked ? 'bg-blues' : 'bg-transparent'}`}
                                    >
                                        <Image 
                                            src="/save.png" 
                                            alt="Save Icon"
                                            className="w-3 h-4 mx-auto my-auto"
                                            width={100} 
                                            height={100}
                                        />
                                    </div>

                                </div>

                                <div className="hidden max-[455px]:flex items-center justify-between w-full mt-5 space-x-10">

                                    <div className="flex items-center space-x-2">
                                        <Image 
                                            src="/like.png" 
                                            alt="ThumbUp Icon"
                                            className="cursor-pointer w-6" 
                                            onClick={() => handleLike(post.id, post.likes)}
                                            width={100} 
                                            height={100}
                                        />
                                        <p className="opacity-70 text-sml">{post.likes.length}</p>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Image 
                                            src="/comment.png" 
                                            alt="Comment Icon"
                                            className="cursor-pointer w-6" 
                                            width={100} 
                                            height={100}
                                        />
                                        <p className="opacity-70 text-sml">{post.comment.length}</p>
                                    </div>

                                    <div
                                        onClick={() => {
                                            setClicked(!clicked)
                                            handleSaveClick(post.id)
                                        }}
                                        className={`p-0.5 cursor-pointer ${clicked ? 'bg-blues' : 'bg-transparent'}`}
                                    >
                                        <Image 
                                            src="/save.png" 
                                            alt="Save Icon"
                                            className="w-3 h-4 mx-auto my-auto"
                                            width={100} 
                                            height={100}
                                        />
                                    </div>
                                    
                                </div>

                            </div>

                        </div>
                    )) : isLoading
                        ? ''
                        : (
                        <p className='text-center h-screen'>No post yet be the first to post</p>
                    )
            }

            {
                isError && <h2 className="text-red-900 text-lg text-center">{error.message}</h2>
            }

            {
                isLoading && (
                    <div className="w-full py-5 bg-white shadow-md border border-gray-300 rounded-2xl animate-pulse">
                        
                        <div className="relative flex items-center justify-between w-full px-4 pb-5 border-b border-gray-300">
                            
                            <div className="flex items-center">
                                <div className="bg-gray-300 w-10 h-10 rounded-full mr-2"></div>

                                <div className="space-y-2">
                                    <p className="w-32 h-2 bg-gray-300 rounded-lg"></p>
                                    <p className="w-40 h-2 bg-gray-300 rounded-lg"></p>
                                </div>
                            </div>

                            <div>  
                                <Image 
                                    src="/threedot.png" 
                                    alt="Options Icon" 
                                    className="cursor-pointer opacity-40 w-[5px]"
                                    width={100} 
                                    height={100}
                                />
                            </div>

                        </div>

                        <div className="px-4 py-3">

                            <p className="w-full h-2 bg-gray-300 rounded-lg mb-1"></p>
                            <p className="w-full h-2 bg-gray-300 rounded-lg mb-1"></p>
                            
                            <div className="bg-gray-300 rounded-2xl w-full h-[200px] mt-3">
                            </div>

                            <div className="flex items-center justify-between w-full mt-5">

                                <div className="flex space-x-10">

                                    <div className="flex items-center space-x-2">
                                        <Image 
                                            src="/like.png" 
                                            alt="ThumbUp Icon"
                                            className="cursor-pointer w-6"
                                            width={100} 
                                            height={100}
                                        />
                                        <p className="opacity-70 text-sml"> Likes</p>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Image 
                                            src="/comment.png" 
                                            alt="Comment Icon"
                                            className="cursor-pointer w-6" 
                                            width={100} 
                                            height={100}                   
                                        />
                                        <p className="opacity-70 text-sml"> Comments</p>
                                    </div>

                                </div>

                                <div
                                    className='p-0.5 cursor-pointer bg-transparent'
                                >
                                    <Image 
                                        src="/save.png" 
                                        alt="Save Icon"
                                        className="w-3 h-4 mx-auto my-auto"
                                        width={100} 
                                        height={100}
                                    />
                                </div>

                            </div>

                        </div>
                        
                    </div>
                )
            }

        </div>
    );
}
 
export default Post;