import React, { Suspense } from 'react';
import './app.css';
import { ClipLoader } from 'react-spinners';
import { Outlet, Route, Routes } from 'react-router-dom';

const PhotoGallery = React.lazy(() => import('./components/PhotoGallery'));
const PhotoDetail = React.lazy(() => import('./components/PhotoDetail'));

export default function Gallery() {
  return (
    <div className="gallery">
      <h1 className="text-4xl font-bold text-center mt-4">Unsplash Photo Gallery</h1>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <ClipLoader size={50} color={"#123abc"} loading={true} />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<PhotoGallery />} />
          <Route path="/photos/:id" element={<PhotoDetail />} />
        </Routes>
        <Outlet />
      </Suspense>
    </div>
  );
}