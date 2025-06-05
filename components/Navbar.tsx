"use client"
import { useFirebaseUser } from "@/hooks/useFirebaseUser";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    const { data: userData } = useFirebaseUser()
    
    return (
        <div className="hidden fixed left-0 top-0 bg-white max-[850px]:flex items-center justify-between w-full px-3 py-2 border-b border-gray-500 z-20">
            
            <Link className="w-36" href='/dashboard'>
                <Image 
                    src="/Logo.png" 
                    alt="Logo" 
                    className="-ml-2 cursor-pointer w-36"
                    width={100} 
                    height={100}
                />
            </Link>
                    
            <div className="flex items-center gap-5 -mt-3">
                <div className="w-7 h-7">
                    <Image
                        src="/search.png"
                        alt="Search Icon"
                        className="rounded-full object-cover cursor-pointer"
                        width={100} 
                        height={100}
                    />
                </div>
                <Link href='/user-profile'>
                    <Image
                        src={userData?.image || '/avatar.png'}
                        alt={userData?.name || 'user'} 
                        className="w-10 h-10 rounded-full object-cover cursor-pointer shadow-lg"
                        width={100}
                        height={100}
                    />
                </Link>
            </div>

        </div>
    );
}
 
export default Navbar;