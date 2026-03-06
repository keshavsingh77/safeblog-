import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ShortLinkPage() {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!code) {
      navigate('/');
      return;
    }

    console.log('🔍 Resolving SafeLink code:', code);

    // For now, decode directly
    // In a real app, you'd call an API to lookup the code in MongoDB
    
    // Option 1: Direct redirect (if bot sends encoded data in short code)
    try {
      // Try to decode if it's base64
      const decodedUrl = atob(code);
      console.log('✅ Decoded URL:', decodedUrl);
      
      // Check if it's a valid URL
      if (decodedUrl.includes('http') || decodedUrl.includes('t.me')) {
        const encodedToken = btoa(decodedUrl);
        navigate(`/verify/${encodedToken}`);
        return;
      }
    } catch (e) {
      console.log('Not base64, treating as short code');
    }

    // Option 2: Treat as short code and fetch from API
    fetch(`/api/resolve?code=${code}`)
      .then(response => response.json())
      .then(data => {
        if (data.success && data.verify_url) {
          console.log('✅ SafeLink found:', data);
          // Extract token from verify URL (/#/verify/TOKEN)
          const verifyMatch = data.verify_url.match(/verify\/(.+)/);
          if (verifyMatch) {
            navigate(`/verify/${verifyMatch[1]}`);
          } else {
            navigate('/' + data.verify_url);
          }
        } else {
          console.error('❌ SafeLink not found');
          navigate('/404');
        }
      })
      .catch(error => {
        console.error('❌ Error resolving SafeLink:', error);
        navigate('/404');
      });
  }, [code, navigate]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
    }}>
      <div style={{
        textAlign: 'center',
      }}>
        <h2>🔗 SafeLink Redirecting...</h2>
        <p>Please wait while we verify your request.</p>
        <div style={{
          marginTop: '20px',
          fontSize: '40px',
          animation: 'spin 1s linear infinite',
        }}>
          ⏳
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
}