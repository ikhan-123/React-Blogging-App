import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../Config/firebase/FirebaseMethod';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ components }) => {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(null); // Track user state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true); // Set user to true if authenticated
      } else {
        setIsUser(false); // Set user to false if not authenticated
        navigate('/login'); // Redirect to login if no user
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [navigate]);

  if (isUser === null) {
    // Show loading state while checking authentication
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {isUser ? components : null} {/* Render components if user is authenticated */}
    </div>
  );
};

export default ProtectedRoutes;
