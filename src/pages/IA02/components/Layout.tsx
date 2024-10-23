import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link to="./">21127561 - Unsplash Photo Gallery</Link>
          </h1>
          <nav>
            <Link to="./" className="text-lg hover:underline">
              Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto p-4">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Unsplash Photo Gallery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;