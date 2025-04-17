import { Box, Typography } from '@mui/material';
import { useLocation, useSearchParams } from 'react-router-dom';
import { mockWeeks } from '../../public/mockWeeks';
import { mockApplicants } from '../../public/mockApplicants';

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
  const [searchParams] = useSearchParams();
  const weekIdParam = searchParams.get('weekId');
  const weekId = weekIdParam ? parseInt(weekIdParam) : null;
  const currentWeek = mockWeeks.find((w) => w.weekId === weekId);
  const applicantId = searchParams.get('id');
  const currentApplicant = mockApplicants.find((a) => a.id === applicantId);

  let title = pathToTitle[location.pathname] || '';
  if (location.pathname === '/applicants' && currentWeek) {
    title += ` - צוות ${currentWeek.team}`;
  }
  if (location.pathname === '/reviews' && currentWeek && currentApplicant) {
    title += ` - צוות ${currentWeek.team} - ${currentApplicant.name}`;
  }

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