import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '@/firebase/config';

export interface AddCommentPayload {
    postId: string;
    commentText: string;
    userData: {
        name: string;
        image?: string;
    };
}

export const useAddComment = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, AddCommentPayload>({
        mutationFn: async ({ postId, commentText, userData }) => {
            const user = auth.currentUser;
            if (!user) throw new Error('User not authenticated');

            const commentData = {
                userId: user.uid,
                name: userData.name,
                image: userData.image,
                text: commentText,
                createdAt: new Date(),
            };

            console.log('Adding comment:', commentData);

            const postRef = doc(db, 'posts', postId);
            await updateDoc(postRef, {
                comment: arrayUnion(commentData)
            });
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['post', variables.postId] });
        },
        onError: (error) => {
            console.error('Error adding comment:', error.message);
        }
    });
};
