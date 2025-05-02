'use client'
import Link from "next/link";
import { useToggleLike } from "@/hooks/useFirebaseLike";
import { FC } from "react";
import DynComment from "./DynamicComment";

interface DynPost {
    post: any,
    isLoading: boolean,
    isError: boolean,
    error: Error | null
}

interface Comment {
    userId: string
    name: string
    image: string
    text: string
}

const DynPost: FC<DynPost> = ({ post, isLoading, isError, error }) => {
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
                                        <img 
                                            src={post.image} 
                                            alt="User Image" 
                                            className="w-10 h-10 rounded-full object-cover mr-2"
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
                                        <img 
                                            src={post.postImage} 
                                            alt="Post Image" 
                                            className="rounded-2xl max-[455px]:rounded-lg mx-auto max-w-full w-fit max-h-[360px] h-full object-cover"
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
                                            <img 
                                                src="/like.png" 
                                                alt="ThumbUp Icon"
                                                className="cursor-pointer" 
                                                onClick={() => handleLike(post.id, post.likes)}
                                            />
                                            <p className="opacity-70 text-sml">{post.likes.length}</p>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <img 
                                                src="/comment.png" 
                                                alt="Comment Icon"
                                                className="cursor-pointer" 
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
                isLoading && <h2 className="text-green-800 text-lg text-center">Loading...</h2>
            }

            <div>
                {
                    post && post.comment && post.comment.length > 0 ? (
                        <div className="space-y-5 mt-5 mb-20 px-4">
                            {
                                post?.comment.map((com: Comment, index: number) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <img 
                                            src={com.image} 
                                            alt={com.name + 'image'}
                                            className="w-11 h-11 rounded-full object-cover"
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


            <DynComment postId={post && post.id} />
        
        </div>
    );
}
 
export default DynPost;