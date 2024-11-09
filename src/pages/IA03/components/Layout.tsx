import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API = import.meta.env.DEV ? import.meta.env.VITE_REACT_APP_API_LOCAL : import.meta.env.VITE_REACT_APP_API;

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API}/user/home`, {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
          // credentials: 'include',
        });

        if (response.ok) {
          setLogin(true);
        }
      } catch (error) {
        console.error('Authentication check failed', error);
        navigate('./login');
      }
    };

    checkAuth();
  }, [navigate]);

  async function logout() {
    try {
      const response = await fetch(`${API}/user/logout`, {
        method: 'POST',
        // credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('access_token');
        navigate('./login');
      }
      else {
				console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred: ', error);
    }
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-zinc-900 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link to="./">21127561 - User Registration</Link>
          </h1>
          <nav>
            {!login
            ?
            <button className="text-lg hover:underline mr-5" onClick={() => navigate('./login')}>
              Login
            </button>
            :
            <>
              <button className="text-lg hover:underline mr-5" onClick={() => navigate('./profile')}>
                Profile
              </button>
              <button className="text-lg hover:underline mr-5" onClick={logout}>
                Logout
              </button>
            </>}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto p-4">{children}</main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">21127561 - Nguyen Quang Tuan</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;