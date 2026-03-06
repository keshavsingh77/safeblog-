import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SafeLinkOverlay from '../components/SafeLink/SafeLinkOverlay';

export default function VerifyPage() {
  const params = useParams();
  const token = params.token as string;
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (token) {
      console.log('🎯 Verification page loaded with token:', token);
      setShowOverlay(true);
    }
  }, [token]);

  return (
    <div>
      {/* Blog content or placeholder */}
      <div style={{ padding: '20px', textAlign: 'center', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <h1>📖 SafeBlog - Verification</h1>
          <p>Please complete the verification below to access your content.</p>
        </div>
      </div>

      {/* SafeLink Overlay */}
      {showOverlay && (
        <SafeLinkOverlay
          token={token}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </div>
  );
}