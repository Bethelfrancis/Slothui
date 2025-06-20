"use client";
import Link from "next/link";
import Suggested from "./Sugguested";
import { useFirebaseUser } from "@/hooks/useFirebaseUser";
import Image from "next/image";

const RightSide = () => {
    const { data: userData, isLoading } = useFirebaseUser();

    return (
        <div className="h-screen w-[24%] fixed max-[850px]:absolute right-0 top-0 border-l border-gray-300 py-4 max-[850px]:-left-full">
            
            <div className="w-full flex items-center justify-between border-b border-gray-300 px-3 pb-4 max-lg:px-1.5">

                <div className="relative">
                    {
                        isLoading ? (
                            <div className="w-9 h-9 rounded-full bg-gray-300 animate-pulse"></div>
                        ) : (
                            <Link href='/profile'>
                                <Image
                                    src={userData?.image || '/avatar.png'} 
                                    alt={userData?.name || 'user'} 
                                    className="w-9 h-9 rounded-full object-cover shadow-lg"
                                    width={100}
                                    height={100}
                                />
                            </Link>
                        )
                    }
                    
                    <div className="absolute -right-1 bottom-0.5 w-3 h-3 bg-green-700 rounded-full border border-white"></div>
                
                </div>

                <div className="relative flex space-x-1 z-20">

                    <Link href={'/messages'}>
                        <Image 
                            src="/mesages.png" 
                            alt="Mesage Icon" 
                            className="w-9"
                            width={100}
                            height={100}
                        />
                    </Link>
                    
                    <Link href='/setting'>
                        <Image 
                            src="/setings.png" 
                            alt="Settings Icon" 
                            className="w-9"
                            width={100}
                            height={100}
                        />  
                    </Link>

                </div>

            </div>

            <div className="flex justify-between py-4 max-lg:py-3 border-b border-gray-300">
                
                <h3 className="text-med font-semibold pl-3 max-lg:pl-1.5">Friend Suggestions</h3>

                <Link href={'/friends'}>
                    <div className="max-xl:hidden flex items-center space-x-0.5 pr-3 cursor-pointer">
                        <p className="text-blues font-semibold">See All</p>
                        <Image 
                            src="/upright.png" 
                            alt="Upright Icon" 
                            className="w-[17px]"
                            width={100}
                            height={100}
                        />
                    </div>
                </Link>
                    

            </div>

            <Suggested />

        </div>
    );
}
 
export default RightSide;