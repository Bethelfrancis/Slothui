import { Post } from "@/hooks/useFirebasePostId";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface DynName {
    post: Post | undefined
}

const DynNav: FC<DynName> = ({ post }) => {
    const router = useRouter()

    const previousPage = () => {
        router.back()
    }
    return (
        <div className="fixed top-0 left-[20%] max-[850px]:left-0 bg-white w-[56%] max-[850px]:w-full flex items-center justify-center py-[21px] px-6  max-lg:px-3 border-b border-gray-300 z-30 max-[850px]:z-10">

            <Image
                src="/upright.png" 
                alt="Left Arrow" 
                className="absolute left-6 rotate-[225deg] w-6 cursor-pointer"
                onClick={previousPage}
                width={100} 
                height={100}
            />
            
            <h3 className="text-med text-center font-semibold pl-3 max-lg:pl-1.5">
                {post ? `${post.name} Post` : "Loading..."}
            </h3>
            
        </div>
    );
}
 
export default DynNav;