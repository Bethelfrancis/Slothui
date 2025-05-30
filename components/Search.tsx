const Search = () => {
    return (
        <div className="fixed top-0 left-[20%] max-[850px]:hidden bg-white w-[56%] py-[17px] px-6 max-lg:px-3 border-b border-gray-300 z-30">
            
            <div className="w-full flex items-center justify-start">
                <input 
                    type="text" 
                    placeholder="Search for friends"
                    className="border border-r-0 border-gray-300 px-3 py-1 rounded-l-3xl placeholder:font-medium w-full outline-0"
                />
                <img 
                    src="/search.png" 
                    alt="search icon" 
                    className="border border-l-0 border-gray-300 px-2 py-1.5 rounded-r-3xl cursor-pointer hover:shadow-2xl"
                />
            </div>

        </div>
    );
}
 
export default Search;