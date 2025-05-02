'use client';
import { useQueryClient } from '@tanstack/react-query';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';

export const useToggleFollow = () => {
    const queryClient = useQueryClient();

    const toggleFollow = async (targetUserId: string, currentFollowers: string[]) => {
        const currentUserId = auth.currentUser?.uid;
        if (!currentUserId || currentUserId === targetUserId) return;

        const targetUserRef = doc(db, 'users', targetUserId);
        const currentUserRef = doc(db, 'users', currentUserId);

        const isFollowing = currentFollowers.includes(currentUserId);

        try {
            if (isFollowing) {
                await updateDoc(targetUserRef, {
                    followers: arrayRemove(currentUserId),
                });

                await updateDoc(currentUserRef, {
                    following: arrayRemove(targetUserId),
                });
            } else {
                await updateDoc(targetUserRef, {
                    followers: arrayUnion(currentUserId),
                });

                await updateDoc(currentUserRef, {
                    following: arrayUnion(targetUserId),
                });
            }

            queryClient.invalidateQueries({ queryKey: ['users'] });
        } catch (error) {
            console.error('Error toggling follow status:', error);
        }
    };

    return toggleFollow;
};
