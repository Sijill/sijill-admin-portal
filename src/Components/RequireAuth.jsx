import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/useAuth';
import { Box, CircularProgress } from '@mui/material';

export default function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: 'var(--backColor)',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}