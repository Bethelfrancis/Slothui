const Friends = () => {
    const users = [
        { id: 1, name: "Bethel", username: "@bethel_dev", avatar: "/user-img.png" },
        { id: 2, name: "Alex Smith", username: "@alex_smith", avatar: "/user-img.png" },
        { id: 3, name: "Sophia James", username: "@sophia_j", avatar: "/user-img.png" },
        { id: 4, name: "Bethel", username: "@bethel_dev", avatar: "/user-img.png" },
        { id: 5, name: "Alex Smith", username: "@alex_smith", avatar: "/user-img.png" },
        { id: 6, name: "Sophia James", username: "@sophia_j", avatar: "/user-img.png" },
        { id: 7, name: "Bethel", username: "@bethel_dev", avatar: "/user-img.png" },
        { id: 8, name: "Alex Smith", username: "@alex_smith", avatar: "/user-img.png" },
        { id: 9, name: "Sophia James", username: "@sophia_j", avatar: "/user-img.png" },
        { id: 10, name: "Bethel", username: "@bethel_dev", avatar: "/user-img.png" },
        { id: 11, name: "Alex Smith", username: "@alex_smith", avatar: "/user-img.png" },
        { id: 12, name: "Sophia James", username: "@sophia_j", avatar: "/user-img.png" },
    ];

    return (
        <div className="w-full mx-auto p-6 max-[850px]:p-3 bg-gray-100">

            <div className="space-y-4">

                {users.map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                    >
                        <div className="flex items-center space-x-3">
                            <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className="w-12 h-12 rounded-full object-cover" 
                            />

                            <div>
                                <h3 className="text-lg font-semibold">{user.name}</h3>
                                <p className="opacity-65 text-sm">{user.username}</p>
                            </div>

                        </div>
                        
                        <button className="flex items-center space-x-2 bg-blues text-white px-4 py-1.5 rounded-full hover:bg-midnight transition-all duration-500 cursor-pointer">
                            Follow
                            <img 
                                src="/plusw.png" 
                                alt="Plus" 
                                className="ml-2 -mt-0.5 w-4"
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default Friends;