import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.DEV ? import.meta.env.VITE_REACT_APP_API_LOCAL : import.meta.env.VITE_REACT_APP_API;

function Profile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(`${API}/user/profile`, {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
          // credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
          setEmail(data.email);
        }
        else {
          navigate('/user-registration/login'); // Redirect to login if not authenticated
        }
      } catch (error) {
        console.error('Authentication check failed', error);
        navigate('/user-registration/login');
      }
    };

    getProfile();
  }, [navigate]);

  return (
    <>
      <h1 className='text-2xl text-white'>Username: {username}</h1>
      <h1 className='text-2xl text-white'>Email: {email}</h1>
    </>
  );
}

export default Profile;
