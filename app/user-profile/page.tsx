"use client";
import { useRef } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import LeftSide from "@/components/LeftSidebar";
import Navbar from "@/components/Navbar";
import RightSide from "@/components/RightSidebar";
import Search from "@/components/Search";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useFirebaseUser } from "@/hooks/useFirebaseUser";
import BottomNav from '@/components/BottomNav';
import Image from 'next/image';

interface ProfileInfo {
    id: string, 
    postImage: string, 
    desc: string, 
    likes: string
}

const ProfilePage = () => {
    const MotionImage = motion(Image);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [background, setBackground] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("posts");
    const { data: userData, isLoading, isError } = useFirebaseUser();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const bgInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !auth.currentUser) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok || !data.imageUrl) {
                console.error("Upload failed:", data);
                return;
            }

            const imageUrl = data.imageUrl;

            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                image: imageUrl,
            });

            setAvatar(imageUrl)
        } catch (error) {
            console.error("Error uploading avatar:", error);
        }
    };

    const handleBackgroundUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !auth.currentUser) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok || !data.imageUrl) {
                console.error("Upload failed:", data);
                return;
            }

            const bgUrl = data.imageUrl;

            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                background: bgUrl,
            });

            setBackground(bgUrl)
        } catch (error) {
            console.error("Error uploading bg:", error);
        }
    };

    return (

        <div className='bg-white'>

            <LeftSide />

            <div className="w-[56%] mx-[20%] max-[850px]:mx-0 max-[850px]:w-full">
                
                <Navbar />
                <Search />

                {
                    isError && (
                        <div className='bg-red-100 text-red-700 text-center border border-red-300 p-3 rounded mb-4 text-sm'>
                            {'Something went wrong.'}
                        </div>
                    )
                }

                {
                    isLoading ? (
                        <div className="w-full p-6 max-[850px]:p-3 bg-gray-100 overflow-auto space-y-7 mt-16 max-[850px]:mt-36 animate-pulse max-[850px]:mb-14">

                            <div className="relative w-full bg-white rounded-2xl shadow-lg overflow-hidden">

                                <div className="relative w-full h-60 overflow-hidden bg-gray-200" />

                                <div className="flex flex-col items-center -mt-16">
                                    <div className="z-10 w-32 h-32 rounded-full bg-gray-300 border-4 border-white shadow-lg" />

                                    <div className="mt-2 h-7 w-32 bg-gray-300 rounded" />
                                    <div className="mt-1 h-3 w-16 bg-gray-200 rounded" />
                                    <div className="mt-3 h-4 w-60 bg-gray-200 rounded" />

                                    <div className="flex items-center justify-between mt-4 space-x-16">
                                        <div className="flex items-center flex-col space-y-2">
                                            <div className="h-6 w-5 bg-gray-300 rounded" />
                                            <div className="h-5 w-28 bg-gray-200 rounded" />
                                        </div>
                                        <div className="flex items-center flex-col space-y-2">
                                            <div className="h-6 w-5 bg-gray-300 rounded" />
                                            <div className="h-5 w-28 bg-gray-200 rounded" />
                                        </div>
                                    </div>

                                    <div className="mt-4 h-9 w-32 bg-gray-300 rounded-3xl" />
                                </div>

                                <div className="mt-6 flex w-full border-b border-gray-300">
                                    <div className="flex-1 text-center font-semibold opacity-70">Post</div>
                                    <div className="flex-1 text-center font-semibold opacity-70">Saved Post</div>
                                </div>

                                <div className="w-full flex max-[550px]:flex-col gap-4 px-4 py-4">
                                    {Array(2).fill(0).map((_, i) => (
                                    <div key={i} className="w-1/2 max-[550px]:w-full h-64 bg-gray-200 rounded-lg" />
                                    ))}
                                </div>

                            </div>

                        </div>
                    ) : (
                        <div className="w-full p-6 max-[850px]:p-3 bg-gray-100 overflow-auto space-y-7 mt-16 max-[850px]:mt-[70px] max-[850px]:mb-14">
                            
                            <div className="relative w-full bg-white rounded-2xl shadow-lg overflow-hidden">

                                <div className="relative w-full h-60 overflow-hidden">

                                    <div
                                        className="absolute inset-0 bg-cover bg-center filter blur-md scale-110"
                                        style={{
                                            backgroundImage: `url(${background || userData?.background || '/sign.jpg'})`,
                                        }}
                                    />
                                    
                                    <Image
                                        src={background || userData?.background || '/sign.jpg'} 
                                        alt={userData?.name || 'user'}
                                        className="relative block w-fit h-60 object-cover mx-auto"
                                        width={800}
                                        height={240}
                                    />

                                    <Image
                                        src="/edit.svg"
                                        alt="Edit"
                                        className="absolute bottom-1 right-1 w-7 h-7 bg-white p-1 rounded-full shadow-md cursor-pointer hover:scale-105 transition z-10"
                                        onClick={() => bgInputRef.current?.click()}
                                        width={100} 
                                        height={100}
                                    />

                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={bgInputRef}
                                        onChange={handleBackgroundUpload}
                                        className="hidden"
                                    />

                                </div>

                                <div className="flex flex-col items-center -mt-16">

                                    <div className="relative w-32 h-32 bg-white rounded-full">
                                        <MotionImage
                                            src={avatar || userData?.image}
                                            alt={userData?.name}
                                            className="w-full h-full rounded-full border-4 border-white shadow-lg object-cover"
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            width={100}
                                            height={100}
                                        />

                                        <Image
                                            src="/edit.svg"
                                            alt="Edit"
                                            className="absolute bottom-1 right-1 w-7 h-7 bg-white p-1 rounded-full shadow-md cursor-pointer hover:scale-105 transition"
                                            onClick={() => fileInputRef.current?.click()}
                                            width={100} 
                                            height={100}
                                        />

                                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleAvatarUpload} className="hidden" />
                                    </div>

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

                                <div className="w-full flex max-[550px]:flex-col items-center bg-gray-100 px-4 py-4 space-x-3">

                                    {
                                        activeTab === "posts" && (
                                            userData?.userPosts.length ? (
                                                userData?.userPosts.map((post: ProfileInfo) => (
                                                    <Link key={post.id} href={`post/${post.id}`} className="mb-4 w-1/2 max-[550px]:w-full bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition duration-500">
                                                        {
                                                            post.postImage ? (
                                                                <Image
                                                                    src={post.postImage} 
                                                                    alt="Liked Post" 
                                                                    className="w-full h-44 rounded-md object-cover"
                                                                    width={100} 
                                                                    height={100} 
                                                                /> 
                                                            ) : (
                                                                <Image
                                                                    src='placeholder.jfif'
                                                                    alt="Liked Post" 
                                                                    className="w-full h-44 rounded-md object-cover"
                                                                    width={100} 
                                                                    height={100} 
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
                                                    <p>You haven&#39;t posted anything yet.</p>
                                                </div>
                                            )
                                        )
                                    }

                                    {
                                        activeTab === "saved" && (
                                            userData && userData?.userPosts.length > 0 ? (
                                                userData?.savedPostsData.map((post: ProfileInfo) => (
                                                    <Link key={post.id} href={`post/${post.id}`} className="mb-4 w-1/2 max-[550px]:w-full bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition duration-500">
                                                        {
                                                            post.postImage ? (
                                                                <Image
                                                                    src={post.postImage} 
                                                                    alt="Liked Post" 
                                                                    className="w-full h-44 rounded-md object-cover"
                                                                    width={100} 
                                                                    height={100} 
                                                                />
                                                            ) : (
                                                                <Image
                                                                    src='placeholder.jfif'
                                                                    alt="Liked Post" 
                                                                    className="w-full h-44 rounded-md object-cover" 
                                                                    width={100} 
                                                                    height={100}
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
                                                    <p>You haven&#39;t saved any posts yet.</p>
                                                </div>
                                            )
                                        )
                                    }

                                </div>

                            </div>

                        </div>
                    )
                }
                
                <BottomNav />

            </div>

            <RightSide />

        </div>
    );
};

export default ProfilePage;
