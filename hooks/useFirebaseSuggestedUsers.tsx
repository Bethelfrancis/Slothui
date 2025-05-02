'use client'
import { useQuery } from '@tanstack/react-query';
import { auth, db } from '@/firebase/config';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

interface UsersInfo {
    id: string;
    name: string;
    username: string;
    image: string;
    bio: string;
    followers: string[];
    following: string[];
}

export const useFetchSuggestedUsers = () => {
    return useQuery({
        queryKey: ['suggestedUsers'],
        queryFn: async () => {
            const user = auth.currentUser;
            if (!user) throw new Error('User not logged in');

            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (!userDoc.exists()) throw new Error('User not found');
            const currentUser = userDoc.data() as UsersInfo;

            const allUsersSnap = await getDocs(collection(db, 'users'));

            let suggestions = allUsersSnap.docs
                .map((doc) => {
                    const data = doc.data() as Omit<UsersInfo, 'id'>;
                    return { id: doc.id, ...data };
                })
                .filter(
                    (u) =>
                        u.id !== user.uid &&
                        !currentUser.following.includes(u.id) &&
                        !u.following.includes(user.uid)
                );

            for (let i = suggestions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [suggestions[i], suggestions[j]] = [suggestions[j], suggestions[i]];
            }

            return suggestions;
        },
    });
};