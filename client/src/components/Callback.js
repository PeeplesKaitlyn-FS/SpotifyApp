import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Callback() {
  const navigate = useNavigate();

  const handleCallback = async () => {
    try {
      const code = new URLSearchParams(window.location.search).get('code');
      if (code) {
        const response = await fetch('/api/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code })
        });
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleCallback();
  });

  return <div>Callback page</div>;
}

export default Callback;