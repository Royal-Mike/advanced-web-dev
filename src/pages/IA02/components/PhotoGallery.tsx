import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import Photo from '../interface/Photo';

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1); // Track the current page for pagination
  const [hasMore, setHasMore] = useState<boolean>(true); // Track if more images are available
  const [error, setError] = useState<string | null>(null);
	const firstFetchDone = useRef(false);

  // Fetch photos from Unsplash API
  const fetchPhotos = async () => {
		if (firstFetchDone.current && page === 1) {
      return;
    }

    try {
      const response = await axios.get('https://api.unsplash.com/photos', {
        params: {
          page,
          per_page: 15, // Load 15 images per page
        },
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_REACT_APP_UNSPLASH_ACCESS_KEY}`,
        },
      });

      if (response.data.length > 0) {
        // Filter out duplicates
        const newPhotos = response.data.filter((newPhoto: Photo) => {
          return !photos.some((photo) => photo.id === newPhoto.id);
        });

        // Append new photos and update the page number
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false); // No more images to load
      }
    } catch (err) {
      setError('Error fetching photos from Unsplash');
      console.error('Error fetching photos from Unsplash:', err);
    } finally {
			firstFetchDone.current = true;
		}
  };

  // Fetch initial photos when the component mounts
  useEffect(() => {
    if (!firstFetchDone.current) fetchPhotos();
		return () => {
			firstFetchDone.current = true;
		}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Infinite scroll component */}
      <InfiniteScroll
        dataLength={photos.length} // Number of photos loaded so far
        next={fetchPhotos} // Fetch more photos when user scrolls down
        hasMore={hasMore} // Check if more photos are available
        loader={
          <div className="flex justify-center items-center h-screen">
            <ClipLoader size={50} color={"#123abc"} loading={true} />
          </div>
        }
        endMessage={
          <p className="text-center text-xl text-gray-500 mt-4">No more images to load</p>
        }
      >
        {/* Photo gallery */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((photo) => (
							<div key={photo.id} className="break-inside-avoid overflow-hidden rounded-lg shadow-lg">
								<Link key={photo.id} to={`./photos/${photo.id}`}>
									<img
										src={photo.urls.small}
										alt={photo.alt_description || 'Unsplash Image'}
										className="w-full h-auto object-cover"
									/>
                  <div className="p-2">
                    <p className="text-sm text-gray-700">{photo.user.name}</p>
                  </div>
								</Link>
							</div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PhotoGallery;