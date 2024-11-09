import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.DEV ? import.meta.env.VITE_REACT_APP_API_LOCAL : import.meta.env.VITE_REACT_APP_API;

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext({ isAuthenticated: false, username: '', email: '' });

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // Check authentication status when the app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API}/user/profile`, {
          method: 'GET',
					headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
          // credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setUsername(data.username);
          setEmail(data.email);
        } else {
          setIsAuthenticated(false);
          navigate('/user-registration/login');
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
        navigate('/user-registration/login');
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, email }}>
      {children}
    </AuthContext.Provider>
  );
};
