
import { auth } from '@/firebase/config';
import { updateProfile } from 'firebase/auth';

const useUpdateUserName = () => {
  const updateName = async (name:string) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return false;

      await updateProfile(currentUser, { displayName: name });
      return true;
    } catch (error) {
      return false;      
    }
  };

  return { updateName };
};

export default useUpdateUserName;
