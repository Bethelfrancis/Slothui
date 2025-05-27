'use client'

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        bio: '',
        image: null as File | null,
        background: null as File | null,
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [bgPreview, setBgPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, background: file });
            setBgPreview(URL.createObjectURL(file));
        }
    };

    const uploadImage = async (file: File) => {
        const body = new FormData();
        body.append('image', file);
        const res = await fetch('/api/upload', {
            method: 'POST',
            body
        });
        const data = await res.json();
        return data.imageUrl;
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const userCred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCred.user;
    
          const imageUrl = formData.image ? await uploadImage(formData.image) : '/avatar.png';
          const bgUrl = formData.background ? await uploadImage(formData.background) : '/login.jpg';
  
          await setDoc(doc(db, 'users', user.uid), {
              id: user.uid,
              name: formData.fullName,
              username: formData.username,
              email: formData.email,
                bio: formData.bio,
                image: imageUrl,
                background: bgUrl,
                createdAt: new Date(),
                followers: [],
                following: [],
                savedPosts: [],
            });
    
            alert('Account created successfully!');
            router.push('/dashboard');
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-midnight max-w-[500px] w-full px-4 py-5 text-white shadow-2xl rounded-2xl">
            {step === 1 && (
                <>
                    <div className="w-full mb-4">
                        <h4 className="text-white text-med text-left">Full Name:</h4>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="John Doe"
                            onChange={handleChange}
                            className="w-full text-white border border-white px-2 py-1 rounded-lg placeholder:text-white placeholder:opacity-80 outline-0"
                            required
                        />
                    </div>

                    <div className="w-full mb-4">
                        <h4 className="text-white text-med text-left">Username:</h4>
                        <input
                            type="text"
                            name="username"
                            placeholder="@johndoe"
                            onChange={handleChange}
                            className="w-full text-white border border-white px-2 py-1 rounded-lg placeholder:text-white placeholder:opacity-80 outline-0"
                            required
                        />
                    </div>
                </>
            )}

            {step === 2 && (
                <>
                    <div className="w-full mb-4">
                        <h4 className="text-white text-med text-left">Email:</h4>
                        <input
                            type="email"
                            name="email"
                            placeholder="johndoe@example.com"
                            onChange={handleChange}
                            className="w-full text-white border border-white px-2 py-1 rounded-lg placeholder:text-white placeholder:opacity-80 outline-0"
                            required
                        />
                    </div>

                    <div className="w-full mb-4">
                        <h4 className="text-white text-med text-left">Password:</h4>
                        <input
                            type="password"
                            name="password"
                            placeholder="******"
                            onChange={handleChange}
                            className="w-full text-white border border-white px-2 py-1 rounded-lg placeholder:text-white placeholder:opacity-80 outline-0"
                            required
                        />
                    </div>

                    <div className="w-full mb-4">
                        <h4 className="text-white text-med text-left">Bio:</h4>
                        <input
                            type="text"
                            name="bio"
                            placeholder="Tell us about yourself..."
                            onChange={handleChange}
                            className="w-full text-white border border-white px-2 py-1 rounded-lg placeholder:text-white placeholder:opacity-80 outline-0"
                            required
                        />
                    </div>
                </>
            )}

            {step === 3 && (
                <div className="w-full mb-5">
                    <label className="block text-white text-med mb-2">Upload Background Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-3 py-2 bg-transparent border border-white rounded-lg text-white file:mr-3 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-midnight hover:file:bg-gray-200 cursor-pointer"
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Profile preview"
                            className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg object-cover mt-3"
                        />
                    )}
                </div>
            )}

            {step === 4 && (
                    <div className="w-full mb-5">
                        <label className="block text-white text-med mb-2">Upload Background Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleBgUpload}
                            className="w-full px-3 py-2 bg-transparent border border-white rounded-lg text-white file:mr-3 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-midnight hover:file:bg-gray-200 cursor-pointer"
                        />
                        {bgPreview && (
                            <img
                                src={bgPreview}
                                alt="background preview"
                                className="w-full relative block h-40 object-cover mx-auto mt-2 rounded-lg"
                            />
                        )}
                    </div>

            )}

            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

            <div className="mt-5 flex  justify-between">
                {step > 1 && <button className="bg-white mt-3 w-[30%] py-2 text-midnight text-lg rounded-xl cursor-pointer hover:bg-gray-300 transition-all duration-400 ease-out" onClick={() => setStep(step - 1)}>Back</button>}
                {step < 4 && <button className="bg-white mt-3 w-[30%] py-2 text-midnight text-lg rounded-xl cursor-pointer hover:bg-gray-300 transition-all duration-400 ease-out" onClick={() => setStep(step + 1)}>Next</button>}
                {step === 4 && <button className="bg-white mt-3 w-[30%] py-2 text-midnight text-lg rounded-xl cursor-pointer hover:bg-gray-300 transition-all duration-400 ease-out" onClick={handleSubmit} disabled={loading}>{loading ? 'Creating...' : 'Finish'}</button>}
            </div>
        </div>
    );
};

export default SignUpForm;
