'use client'
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";

const LogIn = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            router.push("/dashboard");
        } catch (error: any) {
            setError("Invalid email or password");
            console.error("Login Error:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin} className="bg-midnight max-w-[500px] w-full my-12 px-4 py-5 text-black shadow-2xl rounded-2xl">
            {error && <p className="text-red-500">{error}</p>}

            <div className="w-full mb-4">
                <h4 className="text-white text-med text-left">Email:</h4>  
                <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Johndoe@example.com" 
                    className="w-full text-white border border-white px-2 py-1 rounded-lg placeholder:text-white placeholder:opacity-80 outline-0"
                    required
                /> 
            </div>

            <div className="w-full mb-4">
                <h4 className="text-white text-med text-left">Password:</h4>  
                <input 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="******"
                    className="w-full text-white border border-white px-2 py-1 rounded-lg placeholder:text-white placeholder:opacity-80 outline-0"
                    required
                /> 
            </div>

            <button 
                type="submit"
                className="bg-white mt-7 w-full py-2 text-midnight text-lg rounded-xl cursor-pointer hover:bg-gray-300 transition-all duration-400 ease-out"
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
};
 
export default LogIn;

