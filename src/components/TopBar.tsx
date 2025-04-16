import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const pathToTitle: Record<string, string> = {
  '/dashboard': 'דשבורד',
  '/weeks': 'שבועות',
  '/instructors': 'מאתרים',
  '/applicants': 'חניכים',
  '/reviews': 'חוות דעת',
  '/reports': 'דוחות',
};

const TopBar = () => {
  const location = useLocation();
  const title = pathToTitle[location.pathname] || '';

  return (
    <Box
      sx={{
        width: '100%',
        flexShrink: 0,
        height: 64,
        backgroundColor: '#eef4ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        fontFamily: '"M PLUS Rounded 1c", sans-serif',
      }}
    >
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: '1.25rem',
          textAlign: 'right',
          width: '100%',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default TopBar;