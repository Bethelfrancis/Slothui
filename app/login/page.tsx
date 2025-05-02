import LogIn from "@/components/SignIn";
import Link from "next/link";

const Login = () => {
    return (
        <div className='bg-[url(/sign.jpg)] bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center h-screen w-full p-6'>

            <h1 className="text-3xl text-center text-white">
                Welcome back to<br/>{''}
                <span className="text-midnight">Slothui</span>
            </h1>

            <LogIn />

            <p className="text-white text-med text-center">
                Don't have an accoount {''}
                <Link href='/'>
                    <span className="text-midnight underline">Create One</span>
                </Link>
            </p>

        </div>
    );
}

export default Login