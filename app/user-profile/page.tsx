"use client";
import LeftSide from "@/components/LeftSidebar";
import Navbar from "@/components/Navbar";
import RightSide from "@/components/RightSidebar";
import Search from "@/components/Search";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useFirebaseUser } from "@/hooks/useFirebaseUser";

interface ProfileInfo {
    id: string, 
    postImage: string, 
    desc: string, 
    likes: string
}

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("posts");

    const { data: userData, isLoading, isError, error } = useFirebaseUser();

    return (

        <div className='bg-white'>

            <LeftSide />

            <div className="w-[56%] mx-[20%] max-[850px]:mx-0 max-[850px]:w-full">
                
                <Navbar />
                <Search />

                <div className="w-full p-6 max-[850px]:p-3 bg-gray-100 overflow-auto space-y-7 mt-16 max-[850px]:mt-36">
                    
                    <div className="relative w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                        
                        <div className={`w-full h-60 bg-[url(${userData?.background})] bg-cover bg-center`}
                        ></div>

                        <div className="flex flex-col items-center -mt-16">

                            <motion.img
                                src={userData?.image}
                                alt={userData?.name}
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            />

                            <h2 className="mt-2 text-mid font-semibold">
                                {userData?.name}
                            </h2>
                            <p className="opacity-60">
                                @{userData?.username}
                            </p>
                            <p className="mt-2 text-center text-sml opacity-80">
                                {userData?.bio}
                            </p>

                            <div className="flex justify-between mt-4 space-x-16">
                                
                                <div className="text-center">
                                    
                                    <p className="text-lg font-semibold">
                                        {userData?.followers.length}
                                    </p>
                                    <p className="opacity-65 text-sml">
                                        Followers
                                    </p>

                                </div>

                                <div className="text-center">

                                    <p className="text-lg font-semibold">
                                        {userData?.following.length}
                                    </p>
                                    <p className="opacity-65 text-sm">
                                        Following
                                    </p>

                                </div>

                            </div>

                            <Link href='/setting'>
                                <button
                                    className="mt-4 bg-blues text-white px-5 py-2 rounded-3xl hover:bg-midnight duration-500 transition cursor-pointer"
                                >
                                    Edit Profile
                                </button>
                            </Link>
                            
                        </div>

                        <div className="mt-6 flex w-full border-b border-gray-300">

                            <button
                                className={`flex-1 cursor-pointer text-center ${activeTab === "posts" ? "border-b-4 border-blues font-semibold" : "opacity-70"}`}
                                onClick={() => setActiveTab("posts")}
                            >
                                Posts
                            </button>

                            <button
                                className={`flex-1 cursor-pointer text-center ${activeTab === "saved" ? "border-b-4 border-blues font-semibold" : "opacity-70"}`}
                                onClick={() => setActiveTab("saved")}
                            >
                                Saved Posts
                            </button>
                        </div>

                        <div className="w-full flex items-center bg-gray-100 px-4 py-4 space-x-3">

                            {
                                activeTab === "posts" && (
                                    userData?.userPosts.length ? (
                                        userData?.userPosts.map((post: ProfileInfo) => (
                                            <Link key={post.id} href={`post/${post.id}`} className="mb-4 w-1/2 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition duration-500">
                                                {
                                                    post.postImage ? (
                                                    <img
                                                            src={post.postImage} 
                                                            alt="Liked Post" 
                                                            className="w-full h-44 rounded-md object-cover" 
                                                        /> 
                                                    ) : (
                                                        <img
                                                            src='placeholder.jfif'
                                                            alt="Liked Post" 
                                                            className="w-full h-44 rounded-md object-cover" 
                                                        />
                                                    )
                                                }
                                                
                                                <div className="p-3">
                                                    <p className="mt-2 text-sm">{post.desc}</p>
                                                    <p className="text-xs opacity-70 mt-1">{post.likes.length} Likes</p>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="w-full h-44 flex items-center justify-center">
                                            <p>You haven't saved any posts yet.</p>
                                        </div>
                                    )
                                )
                            }

                            {
                                activeTab === "saved" && (
                                    userData?.userPosts.length ? (
                                        userData?.savedPostsData.map((post: ProfileInfo) => (
                                            <Link key={post.id} href={`post/${post.id}`} className="mb-4 w-1/2 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition duration-500">
                                                {
                                                    post.postImage ? (
                                                    <img
                                                            src={post.postImage} 
                                                            alt="Liked Post" 
                                                            className="w-full h-44 rounded-md object-cover" 
                                                        /> 
                                                    ) : (
                                                        <img
                                                            src='placeholder.jfif'
                                                            alt="Liked Post" 
                                                            className="w-full h-44 rounded-md object-cover" 
                                                        />
                                                    )
                                                }
                                                
                                                <div className="p-3">
                                                    <p className="mt-2 text-sm">{post.desc}</p>
                                                    <p className="text-xs opacity-70 mt-1">{post.likes.length} Likes</p>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="w-full h-44 flex items-center justify-center">
                                            <p>You haven't posted anything yet.</p>
                                        </div>
                                    )
                                )
                            }

                        </div>

                    </div>

                </div>

            </div>

            <RightSide />

        </div>
    );
};

export default ProfilePage;
