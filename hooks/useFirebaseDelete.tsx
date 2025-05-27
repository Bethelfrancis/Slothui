import {
  getAuth,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import {
  deleteDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

export const useDeleteAccount = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (password: string) => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user || !user.email) {
        throw new Error('User not authenticated');
      }

      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      const uid = user.uid;

      const postsQuery = query(collection(db, 'posts'), where('uid', '==', uid));
      const postsSnapshot = await getDocs(postsQuery);
      for (const postDoc of postsSnapshot.docs) {
        await deleteDoc(postDoc.ref);
      }

      await deleteDoc(doc(db, 'users', uid));
      
      await deleteUser(user);
    },
    onSuccess: () => {
      router.push('/');
    },
    onError: (error: any) => {
      console.error('Error deleting account:', error.message);
    },
  });
};
