'use client'
import LeftSide from "@/components/LeftSidebar";
import Navbar from "@/components/Navbar";
import RightSide from "@/components/RightSidebar";
import DynPost from "@/components/DynamicPost";
import { useGetPostById } from "@/hooks/useFirebasePostId";
import { useParams } from "next/navigation";
import DynNav from "@/components/DynamicNav";


const DynamicPost = () => {
    const { id } = useParams()
    const { data: post, isLoading, isError, error } = useGetPostById(id as string);

    return (
        <div className='bg-white'>

            <LeftSide />

            <div className="w-[56%] mx-[20%] max-[850px]:mx-0 max-[850px]:w-full">

                <DynNav post={post} />

                <div className="w-full p-3 bg-gray-100 overflow-auto space-y-7 mt-16 max-[850px]:mt-16 max-[850px]:p-0">
                    
                    <DynPost post={post} isLoading={isLoading} isError={isError} error={error} />
                    
                </div>

            </div>

            <RightSide />

        </div>
    );
}
 
export default DynamicPost;