// SAFELINK ROUTING SETUP
// Add this to your App.tsx or create a new Router component

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerifyPage from './pages/VerifyPage';
import ShortLinkPage from './pages/ShortLinkPage';
import App from './App';

export function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* SafeLink dynamic route */}
        <Route path="/:code" element={<ShortLinkPage />} />
        
        {/* Verify page route */}
        <Route path="/verify/:token" element={<VerifyPage />} />
        
        {/* Main app */}
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;