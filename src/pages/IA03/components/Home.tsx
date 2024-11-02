import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_REACT_APP_API;

function Home() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API}/user/home`, {
          method: 'GET',
          credentials: 'include', // Sends the HTTP-only cookie with the request
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
        }
        else {
          navigate('./login'); // Redirect to login if not authenticated
        }
      } catch (error) {
        console.error('Authentication check failed', error);
        navigate('./login');
      }
    };

    checkAuth();
  }, [navigate]);

  return (
		<h1 className='text-2xl text-white'>{username}</h1>
  );
}

export default Home;
