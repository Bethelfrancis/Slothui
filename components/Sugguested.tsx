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
                ) : (
                    <div className="w-full text-black text-center py-6 opacity-65">
                        <p>No friend suggestions at the moment.</p>
                    </div>
                )
            }

            {
                isLoading && <h2 className="text-green-800 text-lg text-center">Loading...</h2>
            }

        </div>
    );
}
 
export default Suggested;