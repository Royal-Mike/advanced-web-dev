import './app.css';
import PhotoGallery from './PhotoGallery';

export default function Gallery() {
  return (
    <div className="gallery">
      <h1 className="text-4xl font-bold text-center mt-4">Unsplash Photo Gallery</h1>
      <PhotoGallery />
    </div>
  );
}