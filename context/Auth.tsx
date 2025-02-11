import { useState, useContext, createContext } from 'react';
import { auth } from '@/firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import useUpdateUserName from '@/hooks/useUpdateUserName';

type SignUpProps = {
  name: string,
  email: string,
  password: string,
};

type LoginProps = {
  email: string,
  password: string,
};

interface IAuthContext {
  isAuthenticated: boolean;
  user: UserCredential['user'] | null;
  signUp: (params:SignUpProps) => Promise<boolean>;
  login: (params:LoginProps) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }:{ children: React.ReactNode }):JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserCredential['user'] | null>(null);

  const { updateName } = useUpdateUserName();

  const signUp = async ({ name, email, password }:SignUpProps) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth, email, password,
      );

      updateName(name);
      setUser(credentials.user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      return false;
    };
  };

  const login = async ({ email, password }:LoginProps) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth, email, password,
      );

      setUser(credentials.user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      return false;
    };
  };

  const logout = () => {
    auth.signOut();
    setUser(null);
    setIsAuthenticated(true);
  };

  const value = {
    isAuthenticated,
    user,
    signUp,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
      throw new Error('Contexto não encontado, useAuthContext() deve estar dentro de AuthProvider!')
  }

  return context
};
