"use client";
import BottomNav from "@/components/BottomNav";
import LeftSide from "@/components/LeftSidebar";
import Navbar from "@/components/Navbar";
import RightSide from "@/components/RightSidebar";
import Search from "@/components/Search";
import { useToggleFollow } from "@/hooks/useFirebaseFollow";
import { useUserProfileData, ProfileInfo } from "@/hooks/useFirebaseUserId";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const UsersProfile = () => {
    const MotionImage = motion(Image);
    const { userId } = useParams()
    const { user, posts, isLoadingUser, userError } = useUserProfileData(userId as string);

    const toggleFollow = useToggleFollow()

    return (

        <div className='bg-white'>

            <LeftSide />

            <div className="w-[56%] mx-[20%] max-[850px]:mx-0 max-[850px]:w-full">
                
                <Navbar />
                <Search />

                {
                    userError && (
                        <div className='bg-red-100 text-red-700 text-center border border-red-300 p-3 rounded mb-4 text-sm'>
                            {'Something went wrong.'}
                        </div>
                    )
                }

                {
                    isLoadingUser ? (
                        <div className="w-full p-6 max-[850px]:p-3 bg-gray-100 overflow-auto space-y-7 mt-16 max-[850px]:mt-[60px] animate-pulse max-[850px]:mb-14">

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

                                <div className="mt-6 w-full border-b border-gray-300">
                                    <div className="text-center font-semibold opacity-70">Post</div>
                                </div>

                                <div className="w-full flex max-[455px]:flex-col gap-4 px-4 py-4">
                                    {Array(2).fill(0).map((_, i) => (
                                    <div key={i} className="w-1/2 max-[455px]:w-full h-64 bg-gray-200 rounded-lg" />
                                    ))}
                                </div>

                            </div>

                        </div>
                    ) : (
                        <div className="w-full p-6 max-[850px]:p-3 bg-gray-100 overflow-auto space-y-7 mt-16 max-[850px]:mt-[60px] max-[850px]:mb-14">
                            
                            <div className="relative w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                                
                                <div className="relative w-full h-60 overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center filter blur-md scale-110"
                                        style={{
                                            backgroundImage: `url(${user?.background || '/sign.jpg'})`,
                                        }}
                                    />

                                    <Image 
                                        src={user?.background || '/sign.jpg'} 
                                        alt={user?.name || 'user'}
                                        className="relative block w-fit h-60 object-cover mx-auto"
                                        width={800}
                                        height={240}
                                    />
                                </div>

                                <div className="flex flex-col items-center -mt-16">

                                    <MotionImage
                                        src={user?.image}
                                        alt={user?.name}
                                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover z-10"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        width={100}
                                        height={100}
                                    />

                                    <h2 className="mt-2 text-mid font-semibold">
                                        {user?.name}
                                    </h2>
                                    <p className="opacity-60">
                                        @{user?.username}
                                    </p>
                                    <p className="mt-2 text-center text-sml opacity-80">
                                        {user?.bio}
                                    </p>

                                    <div className="flex justify-between mt-4 space-x-16">
                                        
                                        <div className="text-center">
                                            
                                            <p className="text-lg font-semibold">
                                                {user?.followers.length}
                                            </p>
                                            <p className="opacity-65 text-sml">
                                                Followers
                                            </p>

                                        </div>

                                        <div className="text-center">

                                            <p className="text-lg font-semibold">
                                                {user?.following.length}
                                            </p>
                                            <p className="opacity-65 text-sm">
                                                Following
                                            </p>

                                        </div>

                                    </div>

                                    <button
                                        className='mt-4 px-5 py-2 rounded-3xl duration-500 transition cursor-pointer bg-blues text-white hover:bg-midnight'
                                        onClick={() => toggleFollow(user?.id, user?.followers || [])}
                                    >
                                        {user?.followers?.includes(user?.uid) ? 'Following' : 'Follow'}
                                    </button>

                                    
                                </div>

                                <div className="mt-6 flex w-full border-b border-gray-300">

                                    <button
                                        className="flex-1 cursor-pointer text-center border-b-4 border-blues font-semibold"
                                    >
                                        Posts
                                    </button>
                                </div>

                                <div className="w-full flex max-[455px]:flex-col items-center bg-gray-100 px-4 py-4 space-x-3">

                                    {
                                        posts?.map((post: ProfileInfo) => (
                                            <Link 
                                                key={post.id}
                                                href={`post/${post.id}`}
                                                className="mb-4 w-1/2 max-[455px]:w-full bg-white rounded-lg shadow-xl cursor-pointer hover:shadow-lg transition duration-500"
                                            >

                                                {
                                                    post.postImage ? (
                                                        <Image
                                                            src={post.postImage} 
                                                            alt="Liked Post" 
                                                            className="w-full h-44 rounded-md object-cover border border-gray-300" 
                                                            width={100} 
                                                            height={100}
                                                        />
                                                        
                                                    ) : (
                                                        <Image
                                                            src='placeholder.jfif'
                                                            alt="Liked Post" 
                                                            className=" rounded-md object-cover" 
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

export default UsersProfile;
