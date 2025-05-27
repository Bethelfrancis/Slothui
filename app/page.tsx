import SignUp from "@/components/Signup";
import Link from "next/link";

const Welcome = () => {
    return (
        <div className='bg-[url(/login.jpg)] bg-center bg-no-repeat bg-cover flex flex-col items-center h-screen w-full p-6'>

            <h1 className="text-3xl text-center text-white mb-10">
                Create an acconunt<br/> on {''}
                <span className="text-midnight">Slothui</span>
            </h1>

            <SignUp />

            <p className="text-white text-med mt-14 text-center">
                Already have an accoount {''}
                <Link href='/login'>
                    <span className="text-midnight underline">Login</span>
                </Link>
            </p>

        </div>
    );
}

export default Welcome