import { useFetchSuggestedUsers } from "@/hooks/useFirebaseSuggestedUsers";
import Link from "next/link";

const Suggested = () => {
    const { data: users, isLoading } = useFetchSuggestedUsers();

    return (
        <div className="px-3 max-lg:px-2">

            {
                users && users.length ? (
                    users?.map(user => (
                        <Link key={user.id} href={`/profile/${user.id}`}>
                            <div  className="flex items-center justify-between w-full py-3 border-b border-gray-300">
                                            
                                <div className="flex items-center">
                                    <img 
                                        src={user.image} 
                                        alt={user.name} 
                                        className="w-10 h-10 rounded-full object-cover mr-2"
                                    />

                                    <div>
                                        <p className="text-sml font-semibold">
                                            {user.name}
                                        </p>
                                        <p className="text-xs opacity-60">
                                            @{user.username}
                                        </p>
                                    </div>
                                </div>

                                <img 
                                    src="/pluss.png" 
                                    alt="Plus Icon" 
                                    className=" cursor-pointer"
                                />
                                
                            </div>
                        </Link>
                    ))
                ) : isLoading
                  ? ''
                  : (
                    <div className="w-full text-black text-center py-6 opacity-65">
                        <p>No friend suggestions at the moment.</p>
                    </div>
                )
            }

            {
                isLoading && (
                    Array(5).fill(0).map((_, index) => (
                        <div key={index} className="flex items-center justify-between w-full py-3 border-b border-gray-300 animate-pulse">
                            <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-300 mr-2" />
                            <div className="space-y-1">
                                <div className="w-24 h-3 bg-gray-300 rounded" />
                                <div className="w-16 h-2 bg-gray-300 rounded" />
                            </div>
                            </div>
                            <div className="w-5 h-5 bg-gray-300 rounded" />
                        </div>
                    ))
                )
            }

        </div>
    );
}
 
export default Suggested;