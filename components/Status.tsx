const Status = () => {
    const status = [
        {
            image: '/user-img.png',
            username: '@azunyam'
        },
        {
            image: '/user-img.png',
            username: '@azunyam'
        },
        {
            image: '/user-img.png',
            username: '@azunyam'
        },
        {
            image: '/user-img.png',
            username: '@azunyam'
        },
        {
            image: '/user-img.png',
            username: '@azunyam'
        },
        {
            image: '/user-img.png',
            username: '@azunyam'
        },
        {
            image: '/user-img.png',
            username: '@azunyam'
        },
        // {
        //     image: '/user-img.png',
        //     username: '@azunyam'
        // },
        // {
        //     image: '/user-img.png',
        //     username: '@azunyam'
        // }
    ]

    return (
        <div className="w-full flex items-center space-x-7 p-3 bg-white shadow-md rounded-2xl overflow-auto">

            {
                status.map((stu, index) => (
                    <div key={index} className="w-full flex flex-col items-center space-y-0.5">
                        <div className="relative">
                            <img 
                                src={stu.image} 
                                alt="User Image" 
                                className="w-14 h-14 rounded-full object-cover border-2 border-red-700"
                            />

                            <div className="absolute right-1 bottom-0.5 w-3 h-3 bg-green-700 rounded-full border border-white">
                            </div>  
                        </div>     
                        <p className="text-sm opacity-80">
                            {stu.username}
                        </p> 
                    </div>
                ))
            }



        </div>
    );
}
 
export default Status;