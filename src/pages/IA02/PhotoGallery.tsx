import { useState, useEffect } from 'react';
import axios from 'axios';

interface Photo {
	id: string;
	alt_description: string | undefined;
	urls: {
		small: string;
	};
}

const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos', {
          params: {
            per_page: 30,
          },
          headers: {
            Authorization: `Client-ID 4bF5uhcKZZfwiRZ5JAjddaclORcoFOSwCPiKcngiK_k`,
          },
        });
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos from Unsplash:', error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={photo.urls.small}
              alt={photo.alt_description}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;