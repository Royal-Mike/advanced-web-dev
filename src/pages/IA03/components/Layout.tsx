import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-zinc-900 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link to="./">21127561 - User Registration</Link>
          </h1>
          <nav>
            <Link to="./register" className="text-lg hover:underline mr-5">
              Register
            </Link>
            <Link to="./login" className="text-lg hover:underline">
              Login
            </Link>
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