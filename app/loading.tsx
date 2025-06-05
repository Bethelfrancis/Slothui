import Image from "next/image";

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Image src="/loading.svg" alt="Loading..." className="w-20 h-20" width={100} height={100} />
        </div>
    );
};

export default Loading; 