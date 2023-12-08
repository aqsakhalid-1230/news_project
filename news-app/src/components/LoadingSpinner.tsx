import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner: React.FC = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" data-testid="spinner">
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
