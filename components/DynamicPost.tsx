'use client'
import Link from "next/link";
import { useToggleLike } from "@/hooks/useFirebaseLike";
import { FC } from "react";
import DynComment from "./DynamicComment";
import Image from "next/image";

interface Comment {
    userId: string;
    name: string;
    image: string;
    text: string;
}

interface Post {
    id: string;
    uid: string;
    name: string;
    image: string;
    bio: string;
    desc: string;
    postImage?: string;
    likes: string[];
    comment: Comment[];
}

interface DynPostProps {
    post: Post | null;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}

const DynPost: FC<DynPostProps> = ({ post, isLoading, isError, error }) => {
    const toggleLike = useToggleLike();

    const handleLike = async (postId: string, likes: string[]) => {
        await toggleLike(postId, likes);
    };

    return (
        <div>

            {
                post && (
                    <div key={post.id} className="w-full rounded-tl-2xl rounded-tr-2xl max-[850px]:rounded-none py-5 bg-white shadow-md max-[850px]:shadow-none border border-gray-300">

                            <div className="flex items-center justify-between w-full px-4 pb-5 border-b border-gray-300">
                                
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
                                
                            </div>

                            <div className="px-4 py-3">

                                <p className="text-sm opacity-80 mb-4">
                                    {post.desc}
                                </p>
                                
                                {
                                    post.postImage && (
                                        <Image
                                            src={post.postImage} 
                                            alt="Post Image" 
                                            className="rounded-2xl max-[455px]:rounded-lg mx-auto max-w-full w-fit max-h-[360px] h-full object-cover"
                                            width={100} 
                                            height={100}
                                        />
                                    )
                                }

                                <div className="flex items-center justify-between w-full mt-5">

                                    <p className="text-sm text-harsh">
                                        Like by {' '}
                                        <span className="text-black"> {post.likes.length} </span>
                                        people
                                    </p>

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

                                    </div>
                                    
                                </div>

                            </div>

                    </div>
                )
            }
        
            {
                isError && <h2 className="text-red-900 text-lg text-center">{error?.message}</h2>
            }


            {
                isLoading && (
                    <div className="w-full rounded-tl-2xl rounded-tr-2xl max-[850px]:rounded-none py-5 bg-white shadow-md max-[850px]:shadow-none border border-gray-300 animate-pulse">

                        <div className="flex items-center justify-between w-full px-4 pb-5 border-b border-gray-300">
                            <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                            <div>
                                <div className="h-4 w-24 bg-gray-300 rounded mb-1"></div>
                                <div className="h-3 w-40 bg-gray-300 rounded opacity-60"></div>
                            </div>
                            </div>
                        </div>

                        <div className="px-4 py-3">
                            <div className="h-4 w-full bg-gray-300 rounded mb-4 opacity-70"></div>
                            <div className="h-48 max-[455px]:h-32 bg-gray-300 rounded-2xl max-[455px]:rounded-lg mx-auto max-w-full w-fit"></div>

                            <div className="flex items-center justify-between w-full mt-5">
                            <div className="h-4 w-32 bg-gray-300 rounded opacity-70"></div>

                            <div className="flex space-x-10">
                                <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                                <div className="h-3 w-6 bg-gray-300 rounded opacity-70"></div>
                                </div>

                                <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                                <div className="h-3 w-6 bg-gray-300 rounded opacity-70"></div>
                                </div>
                            </div>
                            </div>
                        </div>

                    </div>
                )
            }

            <div>
                {
                    post && post.comment && post.comment.length > 0 ? (
                        <div className="space-y-5 mt-5 mb-20 px-4">
                            {
                                post?.comment.map((com: Comment, index: number) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <Image 
                                            src={com.image} 
                                            alt={com.name + 'image'}
                                            className="w-11 h-11 rounded-full object-cover"
                                            width={100}
                                            height={100}
                                        />
                                        <div className="mt-2">
                                            <h3 className="text-xl font-medium">{com.name}</h3>
                                            <p className="text-sm opacity-65">
                                                {com.text}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <div className="bg-white h-48 flex items-center justify-center border border-gray-300">No comment yet</div>
                    )
                }
            </div>


            {post && <DynComment postId={post && post.id} />}
        
        </div>
    );
}
 
export default DynPost;