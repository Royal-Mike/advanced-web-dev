import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

interface PhotoDetailData {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string | null;
  user: {
    name: string;
  };
  description: string | null;
}

const PhotoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the photo ID from the URL
  const [photo, setPhoto] = useState<PhotoDetailData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_REACT_APP_UNSPLASH_ACCESS_KEY}`,
          },
        });
        setPhoto(response.data);
      } catch (err) {
        setError('Error fetching photo details.');
        console.error('Error fetching photos details:', err);
      }
    };

    if (id) {
      fetchPhotoDetails();
    }
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!photo) {
    return (
        <div className="flex justify-center items-center h-screen">
            <ClipLoader size={50} color={"#123abc"} loading={true} />
        </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        {/* Full-size image */}
        <img
          src={photo.urls.regular}
          alt={photo.alt_description || 'Unsplash Image'}
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
        <div className="mt-4">
          {/* Photo title or placeholder */}
          <h2 className="text-2xl font-semibold">
            {photo.alt_description ? photo.alt_description : 'Untitled Photo'}
          </h2>
          {/* Author's name */}
          <p className="text-lg text-gray-600 mt-2">By: {photo.user.name}</p>
          {/* Photo description or placeholder */}
          <p className="text-lg text-gray-700 mt-4">
            {photo.description ? photo.description : 'No description available for this photo.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;