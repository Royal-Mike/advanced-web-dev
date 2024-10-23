import React, { Suspense } from 'react';
import './app.css';
import { ClipLoader } from 'react-spinners';

const PhotoGallery = React.lazy(() => import('./PhotoGallery'));

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
        <PhotoGallery />
      </Suspense>
    </div>
  );
}