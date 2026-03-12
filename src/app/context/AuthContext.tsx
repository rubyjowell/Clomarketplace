import React, { createContext, useContext, useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface User {
  id: string;
  email: string;
  fullName?: string;
  college?: string;
}

interface Profile {
  id: string;
  email: string;
  fullName: string;
  college: string;
  tagsAvailable: number;
  tagsUsed: number;
  instagramHandle?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  accessToken: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, college: string) => Promise<void>;
  signOut: () => void;
  refreshProfile: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f30820f`;

  // Check for existing session on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('clo_access_token');
    const storedUser = localStorage.getItem('clo_user');

    if (storedToken && storedUser) {
      setAccessToken(storedToken);
      setUser(JSON.parse(storedUser));
      fetchProfile(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.profile);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (accessToken) {
      await fetchProfile(accessToken);
    }
  };

  const signIn = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to sign in');
    }

    const token = data.session.access_token;
    const userData = {
      id: data.user.id,
      email: data.user.email,
      ...data.user.user_metadata,
    };

    setAccessToken(token);
    setUser(userData);
    localStorage.setItem('clo_access_token', token);
    localStorage.setItem('clo_user', JSON.stringify(userData));

    await fetchProfile(token);
  };

  const signUp = async (email: string, password: string, fullName: string, college: string) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ email, password, fullName, college }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to sign up');
    }

    // After signup, sign them in automatically
    await signIn(email, password);
  };

  const signOut = () => {
    setUser(null);
    setProfile(null);
    setAccessToken(null);
    localStorage.removeItem('clo_access_token');
    localStorage.removeItem('clo_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        accessToken,
        signIn,
        signUp,
        signOut,
        refreshProfile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
