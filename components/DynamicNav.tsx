import { useRouter } from "next/navigation";
import { FC } from "react";

interface DynName {
    post?: {
        name: string,
    }
}

const DynNav: FC<DynName> = ({ post }) => {
    const router = useRouter()

    const previousPage = () => {
        router.back()
    }
    return (
        <div className="fixed top-0 left-[20%] max-[850px]:left-0 bg-white w-[56%] max-[850px]:w-full flex items-center justify-center py-[21px] px-6  max-lg:px-3 border-b border-gray-300 z-30 max-[850px]:z-10">

            <img 
                src="/upright.png" 
                alt="Left Arrow" 
                className="absolute left-6 rotate-[225deg] w-6 cursor-pointer"
                onClick={previousPage}
            />
            
            <h3 className="text-med text-center font-semibold pl-3 max-lg:pl-1.5">{post?.name + ' ' + 'Post'}</h3>
            
        </div>
    );
}
 
export default DynNav;