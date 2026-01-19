import React, { createContext, useContext, useState, useEffect } from 'react';
import { MagentoService, type UserInfo, type UserType } from '../services/magento';
import { loadDataForUserType } from '../services/data-loader';

interface AuthContextType {
  userInfo: UserInfo | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  data: Awaited<ReturnType<typeof loadDataForUserType>> | null;
  switchUserType: (userType: UserType) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Awaited<ReturnType<typeof loadDataForUserType>> | null>(null);

  const loadUserData = async (userType: UserType, currentUserInfo?: UserInfo): Promise<void> => {
    const userData = await loadDataForUserType(userType);
    setData(userData);

    // Update userInfo with contractType from loaded data
    if (currentUserInfo && userData.userInfo) {
      setUserInfo({
        ...currentUserInfo,
        contractType: userData.userInfo.contractType,
      });
    }
  };

  useEffect(() => {
    // Authenticate user before app mounts
    const authenticateUser = async (): Promise<void> => {
      try {
        // For now, using hardcoded credentials
        // In production, this would come from a login form or stored session
        const authResponse = await MagentoService.authenticate({
          username: 'leila@example.com',
          // eslint-disable-next-line sonarjs/no-hardcoded-passwords
          password: 'password123', // Demo credentials for development
        });

        setToken(authResponse.token);

        // Load data for authenticated user type
        await loadUserData(authResponse.userInfo.userType, authResponse.userInfo);
      } catch (error) {
        console.error('Authentication failed:', error);
        setUserInfo(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    authenticateUser();
  }, []);

  const switchUserType = async (userType: UserType): Promise<void> => {
    setIsLoading(true);
    try {
      // Load new data first
      const updatedUserInfo = userInfo ? { ...userInfo, userType } : null;
      if (updatedUserInfo) {
        await loadUserData(userType, updatedUserInfo);
      }
    } catch (error) {
      console.error('Failed to switch user type:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUserInfo(null);
    setToken(null);
    // Clear any stored credentials
    // In production, you might also want to call a logout API endpoint
  };

  const value: AuthContextType = {
    userInfo,
    token,
    isLoading,
    isAuthenticated: !!token && !!userInfo,
    data,
    switchUserType,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
