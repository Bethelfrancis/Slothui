"use client";
import { useUpdateUserInfo } from "@/hooks/useFirebaseUserPayload";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LeftSide from "@/components/LeftSidebar";
import RightSide from "@/components/RightSidebar";
import Search from "@/components/Search";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useDeleteAccount } from "@/hooks/useFirebaseDelete";

const Settings = () => {
    const updateUser = useUpdateUserInfo();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const [password, setPassword] = useState('');
    const [showForm, setShowForm] = useState(false);
    const { mutate: deleteAccount, isPending } = useDeleteAccount();

    const handleDelete = () => {
        if (!password) return alert('Enter your password');
        deleteAccount(password);
    };

    useEffect(() => {
        if (updateUser.isSuccess) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [updateUser.isSuccess]);

    useEffect(() => {
        if (updateUser.isError) {
            setShowError(true);
            const timer = setTimeout(() => setShowError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [updateUser.isError]);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        const auth = getAuth();

        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };


    return (
        <div className='bg-white'>

            <LeftSide />

            <div className="w-[56%] mx-[20%] max-[850px]:mx-0 max-[850px]:w-full">
                
                <Navbar />
                <Search />

                

                <div className="relative w-full p-6 py-14 max-[850px]:p-3 max-[850px]:py-10 bg-gray-100 overflow-auto space-y-7 mt-16 max-[850px]:mt-36">

                    <h2 className="text-2xl font-semibold">
                        Settings
                    </h2>

                    <form className="bg-white p-5 rounded-lg shadow-md">

                        <h3 className="text-lg font-medium">
                            Profile Settings
                        </h3>

                        <p className="opacity-75 text-sml">Edit your personal details.</p>

                        <div className="w-full flex max-[850px]:flex-col justify-between mt-4 space-x-5 max-[850px]:space-x-0 max-[850px]:space-y-2 ">
                            <div className="w-full max-[850px]:w-full">
                                <h4 className="text-black text-med text-left opacity-75 ">
                                    Full Name:
                                </h4>

                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    className="w-full text-black border border-gray-300 px-2 py-1 rounded-lg outline-0"
                                    required
                                /> 
                            </div>
                        </div>

                        <div className="w-full flex max-[850px]:flex-col justify-between mt-4 space-x-5 max-[850px]:space-x-0 max-[850px]:space-y-2 ">

                            <div className="w-full max-[850px]:w-full">
                                <h4 className="text-black text-med text-left opacity-75 ">
                                    Username:
                                </h4>

                                <input 
                                    type="text" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    className="w-full text-black border border-gray-300 px-2 py-1 rounded-lg outline-0"
                                    required
                                />
                            </div>
                            
                        </div>

                        <div className="w-full flex max-[850px]:flex-col justify-between mt-3 space-x-5 max-[850px]:space-y-2">

                            <div className="w-full max-[850px]:w-full">
                                <h4 className="text-black text-med text-left opacity-75 ">
                                    Bio:
                                </h4>

                                <input 
                                    type="text" 
                                    value={bio} 
                                    onChange={(e) => setBio(e.target.value)} 
                                    className="w-full text-black border border-gray-300 px-2 py-1 rounded-lg outline-0"
                                    required
                                />
                            </div>
                            
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.2 }}
                            className="bg-blues text-white px-5 py-2 rounded-lg hover:bg-midnight duration-500 transition w-full cursor-pointer mt-6"
                            onClick={e => {
                                e.preventDefault()
                                updateUser.mutate({ name, username, bio });
                            }}
                        >
                            <span>{updateUser.isPending ? 'Saving...' : 'Save Changes'}</span>
                        </motion.button>

                    </form>

                    {
                        showError && (
                            <div className='fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-lg py-2 rounded-xl z-50 w-48 max-w-full'>
                                <p className="text-red-600 text-center">Update Failed.</p>
                            </div>
                        )
                    }

                    {
                        showSuccess && (
                            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-lg py-2 rounded-xl z-50 w-48 max-w-full">
                                <p className="text-green-600 text-center">Profile updated!</p>
                            </div>
                        )
                    }
                    
                    <div className="hidden max-[850px]:block bg-white p-5 rounded-lg shadow-md space-y-2">

                        <h3 className="text-lg font-medium">
                            Logout 🚪
                        </h3>

                        <p className="text-sm opacity-75">You can log out of your account at any time.</p>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="bg-blues text-white px-5 py-2 rounded-lg hover:bg-midnight duration-500 transition w-full cursor-pointer mt-6"
                            onClick={e => {
                                e.preventDefault();
                                handleLogout()
                            }}
                        >
                        {isLoggingOut ? 'Logging Out...' : 'Logout'}
                        </motion.button>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-md space-y-2 mb-10">

                        <h3 className="text-lg font-medium text-red-600">
                            Delete Account 🗑️
                        </h3>

                        <p className="text-sml opacity-75">
                            Permanently delete your account and all associated data. This action cannot be undone.
                        </p>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 duration-500 transition w-full cursor-pointer mt-6"
                            onClick={e => {
                                e.preventDefault();
                                setShowForm(true)
                            }}
                        >
                            Delete Account
                        </motion.button>

                    </div>

                    {showForm && (
                        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-9 h-9 absolute right-2 top-2 text-white cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                onClick={() => setShowForm(!showForm)}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>

                            <div className="bg-white shadow-2xl px-6 py-4 rounded-xl z-50 w-[90%] max-w-sm">
                                <input 
                                    type="password" 
                                    placeholder="Confirm Password"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className="w-full text-black border border-gray-300 px-2 py-1 rounded-lg outline-0 mb-3"
                                    required
                                />
                                <button
                                    onClick={() => {
                                        handleDelete();
                                        setShowForm(!showForm);
                                    }}
                                    className="bg-red-700 text-white px-4 py-1.5 rounded-sm cursor-pointer w-full"
                                >
                                    {isPending ? 'Deleting Account' : 'Confirm Delete'} 
                                </button>
                            </div>
                        </div>
                    )}

                </div>

                <BottomNav />

            </div>

            <RightSide />

        </div>
    );
  };

export default Settings;
