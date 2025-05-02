import Link from "next/link";

const Navbar = () => {
    return (
        <div className="hidden fixed left-0 top-0 bg-white max-[850px]:flex items-center justify-between w-full px-3 py-2 border-b border-gray-500 z-20">
            
            <Link href='/dashboard'>
                <img 
                    src="/Logo.png" 
                    alt="Logo" 
                    className="-ml-2 cursor-pointer w-36"
                />
            </Link>
                    
            <div className="block bg-transparent rounded-xl p-2 space-y-[4.5px] -mt-2">

                <span className="block w-7 h-[3px] bg-black rounded-lg opacity-90"></span>
                <span className="block w-7 h-[3px] bg-black rounded-lg opacity-90"></span>
                <span className="block w-7 h-[3px] bg-black rounded-lg opacity-90"></span>

            </div>

        </div>
    );
}
 
export default Navbar;