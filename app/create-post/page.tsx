"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useFirebaseUser } from "@/hooks/useFirebaseUser";
import { useAddPosts, Post } from "@/hooks/useFirebaseAddPost";
import LeftSide from "@/components/LeftSidebar";
import RightSide from "@/components/RightSidebar";
import BottomNav from "@/components/BottomNav";
import Search from "@/components/Search";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const CreatePost = () => {
    const { data: userData } = useFirebaseUser();
    const [caption, setCaption] = useState("");
    const [images, setImage] = useState<string | null>(null);

    const router = useRouter()

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => setImage(null);

    const { mutate, isPending, isError, error } = useAddPosts()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = auth.currentUser;

        const post: Post = {
            uid: user?.uid,
            name: userData?.name,
            bio: userData?.bio,
            image: userData?.image,
            desc: caption,
            postImage: images || null,
            likes: [],
            comment: [],
        };

        mutate(post, {
            onSuccess: () => {
                setCaption('');
                setImage(null);
                router.push('/dashboard');
            },
            onError: error => {
                console.error("Failed to Post", error);
            }
        });
    };

    return (
        <div className='bg-white'>
        
            <LeftSide />

            <div className="w-[56%] mx-[20%] max-[850px]:mx-0 max-[850px]:w-full">
                
                <Navbar />
                <Search />

                <div className="w-full h-full p-6 max-[850px]:p-3 bg-gray-100 overflow-auto space-y-7 mt-16 max-[850px]:mt-[60px]">

                    <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-lg shadow-lg mb-16">

                        <h2 className="text-2xl font-semibold text-left">Create Post</h2>

                        <p className='text-black text-sm opacity-75 my-3'>
                            ⚠️ Note: Please upload an image that is less than 1.2MB. Large files may fail to upload.
                        </p>

                        <textarea
                            placeholder="What's on your mind?"
                            className="w-full p-3 mt-4 border border-gray-300 rounded-lg focus:outline-none"
                            rows={7}
                            maxLength={280}
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        ></textarea>

                        <p className="text-right text-sm opacity-70">{caption.length}/280</p>

                        <div className="mt-4 relative border-2 border-dashed border-gray-300 rounded-lg p-2 cursor-pointer">
                            {!images ? (
                                <>
                                    <p className="opacity-70 text-center mt-2">Drag & drop or click to upload</p>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleImageUpload}
                                    />
                                </>
                            ) : (

                                <div className="relative">
                                    <motion.img
                                        src={images}
                                        alt="Uploaded"
                                        className="rounded-lg w-fit max-h-[300px] h-full object-center object-contain mx-auto"
                                        initial={{ opacity: 0, scale: 0.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    
                                    <button
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 bg-red-500 p-1 rounded-full cursor-pointer"
                                    >
                                        <Image 
                                            src='/cancel.png'
                                            alt="Cancel"
                                            className="w-4 h-4"
                                            width={100} 
                                            height={100}
                                        />
                                    </button>
                                </div>
                            )}
                        </div>

                        {
                            isError && <p className="">{error.message}</p>
                        }

                        <motion.button
                            disabled={isPending}
                            whileTap={{ scale: 0.20 }}
                            className={`w-full mt-4 py-3 text-white font-semibold rounded-lg transition duration-500 ${
                            caption || images ? "bg-blues hover:bg-midnight cursor-pointer" : "bg-gray-300 cursor-not-allowed"
                            }`}
                            
                        >
                            {isPending ? "Posting..." : "Post"}
                        </motion.button>

                    </form>

                </div>

                <BottomNav />

            </div>

            <RightSide />

        </div>
    );
}
 
export default CreatePost;