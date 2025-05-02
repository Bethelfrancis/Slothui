'use client'
import { usePosts } from "@/hooks/useFirebasePost";
import Link from "next/link";
import { useToggleLike } from "@/hooks/useFirebaseLike";
import { useState, useEffect, useRef } from 'react'
import { getAuth } from "firebase/auth";
import { useDeletePost } from "@/hooks/useFirebaseDeletePost";
import { useMutation } from "@tanstack/react-query";
import { savePost } from "@/hooks/useFirebaseSavePost";

const Post = () => {    
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const [clicked, setClicked] = useState(false);
    const [ isOpen, setIsOpen ] = useState<string | null>(null)
    const { data: usersPosts, isLoading, isError, error } = usePosts();

    const toggleLike = useToggleLike();
    const handleLike = async (postId: string, likes: string[]) => {
        await toggleLike(postId, likes);
    };

    const { mutate: handleDeletePost } = useDeletePost()

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const savePostMutation = useMutation({
        mutationFn: savePost, // The function that will be called when mutateAsync is called
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
                usersPosts?.map((post: any) => (
                    <div key={post.id} className="w-full py-5 bg-white shadow-md border border-gray-300 rounded-2xl">

                        <div className="relative flex items-center justify-between w-full px-4 pb-5 border-b border-gray-300">
                            
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

                            <div ref={dropdownRef}>  

                                {currentUser?.uid === post.uid && (
                                    <div className="relative">
                                        <img 
                                            src="/threedot.png" 
                                            alt="Options Icon" 
                                            className="cursor-pointer opacity-40"
                                            onClick={() => setIsOpen(isOpen === post.id ? null : post.id)}
                                        />

                                        {isOpen === post.id && (
                                            <div className="absolute top-5 right-0 bg-white border border-gray-300 rounded-md shadow-md z-20">
                                                <ul className="text-sm w-32">
                                                    <li 
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black opacity-65"
                                                        onClick={e => {
                                                            e.stopPropagation()
                                                            console.log("Edit", post.id)
                                                        }}
                                                    >
                                                        Edit Post
                                                    </li>
                                                    <li 
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                                                        onClick={e => {
                                                            e.stopPropagation()
                                                            console.log("Trying to delete:", post.id);
                                                            handleDeletePost(post.id)
                                                        }}
                                                    >
                                                        Delete Posts
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}

                            </div>

                        </div>

                        <div className="px-4 py-3">

                            <p className="text-sm opacity-80 mb-4">
                                {post.desc}
                            </p>
                            
                            <Link href={`post/${post.id}`}>
                                {
                                    post.postImage && (
                                        <img 
                                            src={post.postImage} 
                                            alt="Post Image" 
                                            className="rounded-2xl mx-auto max-w-full w-fit max-h-[360px] h-full object-cover"
                                        />
                                    )
                                }
                            </Link>

                            <div className="flex items-center justify-between w-full mt-5 max-[455px]:hidden">

                                <div className="flex space-x-10">

                                    <div className="flex items-center space-x-2">
                                        <img 
                                            src="/like.png" 
                                            alt="ThumbUp Icon"
                                            className="cursor-pointer" 
                                            onClick={() => handleLike(post.id, post.likes)}
                                        />
                                        <p className="opacity-70 text-sml">{post.likes.length} Likes</p>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <img 
                                            src="/comment.png" 
                                            alt="Comment Icon"
                                            className="cursor-pointer" 
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
                                    <img 
                                        src="/save.png" 
                                        alt="Save Icon"
                                        className="w-3 h-4 mx-auto my-auto"
                                    />
                                </div>

                            </div>

                            <div className="hidden max-[455px]:flex items-center justify-between w-full mt-5 space-x-10">

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

                                <div
                                    onClick={() => setClicked(!clicked)}
                                    className={`p-2 rounded-full inline-flex items-center border justify-center cursor-pointer ${clicked ? 'bg-blue-800' : 'bg-red-800'}`}
                                >
                                    <img 
                                        src="/save.png" 
                                        alt="Save Icon"
                                        className="w-6 h-6"
                                    />
                                </div>
                                
                            </div>

                        </div>

                    </div>
                ))
            }

            {/* {
                data?.map((post: any) => (
                    <div key={post.id} className="w-full py-5 bg-white shadow-md border border-gray-300 rounded-2xl">

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
                                    
                                <img 
                                    src="/threedot.png" 
                                    alt="Logout Icon" 
                                    className="cursor-pointer opacity-40"
                                />
                                
                            </div>

                            <div className="px-4 py-3">

                                <Link href={`post/${post.id}`}>
                                    <p className="text-sm opacity-80 mb-4">
                                        {post.desc}
                                    </p>  
                                </Link>
                                

                                {
                                    post.postImage && (
                                        <img 
                                            src={post.postImage} 
                                            alt="Post Image" 
                                            className="rounded-2xl mx-auto max-w-full w-fit max-h-[360px] h-full object-cover"
                                        />
                                    )
                                }

                                <div className="flex items-center justify-between w-full mt-5 max-[455px]:hidden">

                                    <div className="flex space-x-10">

                                        <div className="flex items-center space-x-2">
                                            <img 
                                                src="/like.png" 
                                                alt="ThumbUp Icon"
                                                className="cursor-pointer" 
                                                onClick={() => handleLike(post.id, post.likes)}
                                            />
                                            <p className="opacity-70 text-sml">{post.likes.length} Likes</p>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <img 
                                                src="/comment.png" 
                                                alt="Comment Icon"
                                                className="cursor-pointer" 
                                            />
                                            <p className="opacity-70 text-sml">{post.comment.length} Comments</p>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <img 
                                                src="/share.png" 
                                                alt="Share Icon"
                                                className="cursor-pointer" 
                                            />
                                            <p className="opacity-70 text-sml">{post.share} Share</p>
                                        </div>

                                    </div>

                                    <img 
                                        src="/save.png" 
                                        alt="Save Icon" 
                                    />
                                    
                                </div>

                                <div className="hidden max-[455px]:flex items-center justify-between w-full mt-5 space-x-10">

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

                                    <div className="flex items-center space-x-2">
                                        <img 
                                            src="/share.png" 
                                            alt="Share Icon"
                                            className="cursor-pointer" 
                                        />
                                        <p className="opacity-70 text-sml">{post.share}</p>
                                    </div>

                                    <img 
                                        src="/save.png" 
                                        alt="Save Icon" 
                                    />
                                    
                                </div>

                            </div>

                    </div>
                ))
            } */}

            {
                isError && <h2 className="text-red-900 text-lg text-center">{error.message}</h2>
            }

            {
                isLoading && <h2 className="text-green-800 text-lg text-center">Loading...</h2>
            }

        </div>
    );
}
 
export default Post;