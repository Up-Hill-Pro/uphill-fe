import { Box, Typography } from '@mui/material';
import { useLocation, useSearchParams } from 'react-router-dom';
import { fetchWeeks } from '../../features/weeks/api';
import type { Week } from '../../features/weeks/types';
import { fetchApplicants } from "../../features/applicants/api.ts";
import {useEffect, useState} from "react";

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
    const applicantId = searchParams.get('id');
    const [applicantName, setApplicantName] = useState('');
    const [weeks, setWeeks] = useState<Week[]>([]);
    const currentWeek = weeks.find((w) => w.weekId === weekId);

    let title = pathToTitle[location.pathname] || '';

    if (location.pathname === '/applicants' && currentWeek) {
    title += ` - צוות ${currentWeek.team}`;
    }

    if (location.pathname === '/reviews' && currentWeek && applicantName) {
        title += ` - צוות ${currentWeek.team} - ${applicantName}`;
    }

    useEffect(() => {
        const load = async () => {
            if (!applicantId) return;
            const all = await fetchApplicants();
            const match = all.find((a) => a.id === applicantId);
            setApplicantName(match?.name || '');
        };
        load();
    }, [applicantId]);

    useEffect(() => {
        const loadWeeks = async () => {
            const data = await fetchWeeks();
            setWeeks(data);
        };
        loadWeeks();
    }, []);

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