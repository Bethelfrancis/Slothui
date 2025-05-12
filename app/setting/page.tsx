"use client";
import { useUpdateUserInfo } from "@/hooks/useFirebaseUserPayload";
import { useState } from "react";
import { motion } from "framer-motion";
import LeftSide from "@/components/LeftSidebar";
import RightSide from "@/components/RightSidebar";
import Search from "@/components/Search";
import Navbar from "@/components/Navbar";

const Settings = () => {
    const updateUser = useUpdateUserInfo();

    // const [darkMode, setDarkMode] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div className='bg-white'>

            <LeftSide />

            <div className="w-[56%] mx-[20%] max-[850px]:mx-0 max-[850px]:w-full">
                
                <Navbar />
                <Search />

                <form className="w-full p-6 py-14 max-[850px]:p-3 max-[850px]:py-10 bg-gray-100 overflow-auto space-y-7 mt-16 max-[850px]:mt-36">

                    <h2 className="text-2xl font-semibold">
                        Settings
                    </h2>

                    <div className="bg-white p-5 rounded-lg shadow-md">
                        
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

                    </div>

                    {updateUser.isError && <p className="text-red-500 text-center">Update failed.</p>}
                    {updateUser.isSuccess && <p className="text-green-600 text-center">Profile updated!</p>}

                    <motion.button
                        whileTap={{ scale: 0.2 }}
                        className="bg-blues text-white px-5 py-2 rounded-full hover:bg-midnight duration-500 transition w-full cursor-pointer"
                        onClick={e => {
                            e.preventDefault()
                            updateUser.mutate({ name, username, bio });
                        }}
                    >
                        <span>{updateUser.isPending ? 'Saving...' : 'Save Changes'}</span>
                    </motion.button>

                </form>

            </div>

            <RightSide />

        </div>
    );
  };

export default Settings;
