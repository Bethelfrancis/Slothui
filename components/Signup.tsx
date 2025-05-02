'use client'
import { FC, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { useRouter } from "next/navigation";

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: FC<InputFieldProps> = ({ label, type, name, placeholder, onChange }) => {
    return (
        <div className="w-full mb-4">
            <h4 className="text-white text-med text-left">{label}:</h4>
            <input 
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full text-white border border-white px-2 py-1 rounded-lg placeholder:text-white placeholder:opacity-80 outline-0"
                required
            /> 
        </div>
    );
};

const SignUp: FC = () => {
    const [formData, setFormData] = useState({ fullName: "", username: "", email: "", password: "", bio: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                id: user.uid,
                name: formData.fullName,
                username: formData.username,
                email: formData.email,
                bio: formData.bio,
                image: "/avatar.png",
                background: "/login.jpg",
                createdAt: new Date(),
                followers: [],
                following: [],
                savedPosts: [],
            });

            alert("Account created successfully!");
            router.push('/dashboard')
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-midnight max-w-[500px] w-full px-4 py-5 text-black shadow-2xl rounded-2xl">
            <InputField label="Full Name" type="text" name="fullName" placeholder="John Doe" onChange={handleChange} />
            <InputField label="Username" type="text" name="username" placeholder="@johndoe" onChange={handleChange} />
            <InputField label="Email" type="email" name="email" placeholder="Johndoe@example.com" onChange={handleChange} />
            <InputField label="Password" type="password" name="password" placeholder="xxxxxx" onChange={handleChange} />
            <InputField label="Bio" type="text" name="bio" placeholder="Some" onChange={handleChange} />

            {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

            <button 
                type="submit"
                disabled={loading}
                className="bg-white mt-7 w-full py-2 text-midnight text-lg rounded-xl cursor-pointer hover:bg-gray-300 transition-all duration-400 ease-out"
            >
                {loading ? "Creating Account..." : "Create an Account"}
            </button>
        </form>
    );
};
 
export default SignUp;
