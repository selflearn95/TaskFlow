import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const Index = () => {
  const navigate = useNavigate();

  // TODO: Check authentication status
  const isAuthenticated = false; // This should come from your auth context/store

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <div>Redirecting...</div>;
  }

  return <Dashboard />;
};

export default Index;
