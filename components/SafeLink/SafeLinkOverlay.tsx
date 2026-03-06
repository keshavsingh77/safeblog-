import { useState, useEffect } from 'react';

interface SafeLinkOverlayProps {
  token: string;
  onClose: () => void;
}

export default function SafeLinkOverlay({ token, onClose }: SafeLinkOverlayProps) {
  const [timer, setTimer] = useState(10);
  const [robotVerified, setRobotVerified] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVerification = async () => {
    if (timer > 0 || !robotVerified) return;

    try {
      setRedirecting(true);

      // Decode the token from Base64
      const decodedLink = atob(token);
      console.log('🔓 Decoded link:', decodedLink);

      // Redirect to Telegram
      console.log('🚀 Redirecting to:', decodedLink);
      window.location.href = decodedLink;
    } catch (error) {
      console.error('Error during verification:', error);
      alert('An error occurred. Please try again.');
      setRedirecting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        textAlign: 'center',
        maxWidth: '400px',
        width: '90%',
      }}>
        <h2>🔒 Verification Required</h2>

        <div style={{ margin: '20px 0' }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: timer > 0 ? '#e74c3c' : '#27ae60',
            marginBottom: '10px'
          }}>
            ⏱️ {timer > 0 ? `${timer}s` : 'Ready!'}
          </div>

          <div style={{ margin: '20px 0' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <input
                type="checkbox"
                checked={robotVerified}
                onChange={(e) => setRobotVerified(e.target.checked)}
                style={{ marginRight: '10px', cursor: 'pointer' }}
              />
              🤖 I'm not a robot
            </label>
          </div>

          <button
            onClick={handleVerification}
            disabled={timer > 0 || !robotVerified || redirecting}
            style={{
              padding: '12px 24px',
              backgroundColor: (timer > 0 || !robotVerified) ? '#bdc3c7' : '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: (timer > 0 || !robotVerified) ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s',
            }}
          >
            {redirecting ? '🚀 Redirecting...' : 'Continue to Download'}
          </button>
        </div>

        <div style={{ fontSize: '12px', color: '#7f8c8d', marginTop: '15px' }}>
          This verification helps prevent automated access.
        </div>
      </div>
    </div>
  );
}