'use client';
import { useAddComment } from '@/hooks/useFirebaseComment';
import { useFirebaseUser } from '@/hooks/useFirebaseUser';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface DynCommentProps {
    postId: string;
}

const DynComment = ({ postId }: DynCommentProps) => {
    const [comment, setComment] = useState('');
    const { mutate, isPending } = useAddComment();
    const { data: userData } = useFirebaseUser();
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    useEffect(() => {
        if (statusMessage) {
            const timeout = setTimeout(() => {
            setStatusMessage('');
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [statusMessage]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim() || !userData) {
            console.warn('Invalid comment or user not found');
            return;
        }

        const payload = {
            postId,
            commentText: comment,
            userData: {
                name: userData.name,
                image: userData.image || '',
            },
        };

        setStatusMessage('Submitting comment payload');

        mutate(payload, {
            onError: () => {
                setStatusMessage('Comment mutation failed:');
            },
            onSuccess: () => {
                setStatusMessage('Comment successfully added!');
            }
        });

        setComment('');
        setStatusMessage('')
    };

    if (!userData) {
        console.warn('User data not loaded yet.');
        return null;
    }

    return (
        <div className='bg-blue-700 '>
            
            {statusMessage && (
                <div className="fixed bottom-16 left-1/2 -translate-x-1/2 bg-white text-sm text-gray-600 px-4 py-2 rounded-md shadow-md z-50 text-center">
                    {statusMessage}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="fixed left-[20%] max-[850px]:left-0 bottom-0 w-[56%] max-[850px]:w-full flex items-center border border-gray-300 px-4 py-1 bg-white shadow-sm"
            >
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 outline-none text-sm placeholder-gray-500 bg-transparent"
                    disabled={isPending}
                />
                <button type="submit" className="ml-2">
                    <Image
                        src="/Send.png"
                        alt="Comment Icon"
                        className="cursor-pointer w-9"
                        width={100} 
                        height={100}
                    />
                </button>
            </form>

        </div>
    );
};

export default DynComment;
