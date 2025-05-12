'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase/config';

interface UpdateUserPayload {
    name: string;
    username: string;
    bio: string;
}

export const useUpdateUserInfo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateUserPayload) => {
        const user = auth.currentUser;
        if (!user) throw new Error('Not authenticated');

        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
            name: data.name,
            username: data.username,
            bio: data.bio,
        });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        },
    });
};
