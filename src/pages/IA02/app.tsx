import React, { Suspense } from 'react';
import './app.css';
import { ClipLoader } from 'react-spinners';
import { Outlet, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

const PhotoGallery = React.lazy(() => import('./components/PhotoGallery'));
const PhotoDetail = React.lazy(() => import('./components/PhotoDetail'));

export default function Gallery() {
  return (
    <Layout>
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
    </Layout>
  );
}