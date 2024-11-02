import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_REACT_APP_API_LOCAL;

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API}/user/home`, {
          method: 'GET',
          credentials: 'include', // Sends the HTTP-only cookie with the request
        });

        if (!response.ok) {
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
		<h1 className='text-2xl text-white'>Home</h1>
  );
}

export default Home;
