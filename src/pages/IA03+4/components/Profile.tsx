import { useContext } from 'react';
import { AuthContext } from './AuthContext';

function Profile() {
  const { username, email } = useContext(AuthContext);

  return (
    <>
      <h1 className='text-2xl text-white'>Username: {username}</h1>
      <h1 className='text-2xl text-white'>Email: {email}</h1>
    </>
  );
}

export default Profile;
