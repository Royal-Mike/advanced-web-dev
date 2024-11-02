import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_REACT_APP_API_LOCAL;

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  async function logout() {
    try {
      const response = await fetch(`${API}/user/logout`, {
        method: 'POST',
        credentials: 'include', // Allows cookies to be sent with the request
      });

      if (response.ok) {
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
            <button className="text-lg hover:underline mr-5" onClick={logout}>
              Logout
            </button>
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