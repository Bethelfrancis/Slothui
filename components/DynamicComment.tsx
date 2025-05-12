'use client';
import { useAddComment } from '@/hooks/useFirebaseComment';
import { useFirebaseUser } from '@/hooks/useFirebaseUser';
import { useState } from 'react';

interface DynCommentProps {
    postId: string;
}

const DynComment = ({ postId }: DynCommentProps) => {
    const [comment, setComment] = useState('');
    const { mutate, isPending } = useAddComment();
    const { data: userData } = useFirebaseUser();

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

        console.log('Submitting comment payload:', payload);

        mutate(payload, {
            onError: (err) => {
                console.error('Comment mutation failed:', err.message);
            },
            onSuccess: () => {
                console.log('Comment successfully added!');
            }
        });

        setComment('');
    };

    if (!userData) {
        console.warn('User data not loaded yet.');
        return null;
    }

  return (
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
            <img
                src="/Send.png"
                alt="Comment Icon"
                className="cursor-pointer"
            />
        </button>
    </form>
  );
};

export default DynComment;
