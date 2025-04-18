import React, { useState, useEffect } from 'react';
import type { Week } from '../types.ts'
import { fetchWeeks } from '../api.ts'
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface NewWeekFormProps {
  onSubmit: (data: {
    weekId: number;
    weekNumber: number;
    unit: string;
    team: string;
    evaluatorCount: number;
    cycle: string;
    startDate: string;
    status: string;
    applicantCount: number;
    passed: number;
  }) => void;
}

const NewWeekForm: React.FC<NewWeekFormProps> = ({ onSubmit }) => {
  const [weekNumber, setWeekNumber] = useState('');
  const [unit, setUnit] = useState('');
  const [team, setTeam] = useState('');
  const [evaluatorCount, setEvaluatorCount] = useState('');
  const [cycle, setCycle] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [weeks, setWeeks] = useState<Week[]>([]);

  useEffect(() => {
    const loadWeeks = async () => {
      const data = await fetchWeeks();
      setWeeks(data);
    };
    loadWeeks();
  }, []);

  const handleSubmit = () => {
    if (startDate) {
      const maxId = Math.max(...weeks.map(w => w.weekId));
      const newWeek = {
        weekId: maxId + 1,
        weekNumber: parseInt(weekNumber, 10),
        unit,
        team,
        evaluatorCount: parseInt(evaluatorCount, 10),
        cycle,
        startDate: startDate.toISOString(),
        status: 'עתיד להתקיים',
        applicantCount: 0,
        passed: 0
      };
      setWeeks([...weeks, newWeek]);
      console.log('שבוע חדש נשלח:', newWeek);
      onSubmit(newWeek);
      setWeekNumber('');
      setUnit('');
      setTeam('');
      setEvaluatorCount('');
      setCycle('');
      setStartDate(new Date());
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} maxWidth={400} mx="auto" mt={4}>
      <Typography variant="h6">הוספת שבוע חדש</Typography>
        <TextField
            label="שם הצוות"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            fullWidth
        />
      <Box sx={{ position: 'relative', zIndex: 1300 }}>
        <TextField
          select
          label="יחידה"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          fullWidth
          SelectProps={{
            MenuProps: {
              disablePortal: true,
            },
          }}
        >
          <MenuItem value="אגוז">אגוז</MenuItem>
          <MenuItem value="מגלן">מגלן</MenuItem>
          <MenuItem value="דובדבן">דובדבן</MenuItem>
          <MenuItem value="סיירת צנחנים">סיירת צנחנים</MenuItem>
        </TextField>
      </Box>
        <TextField
            label="שבוע חיה״א"
            value={weekNumber}
            onChange={(e) => setWeekNumber(e.target.value)}
            type="number"
            fullWidth
        />
      <TextField
        label="מספר מאתרים"
        value={evaluatorCount}
        onChange={(e) => setEvaluatorCount(e.target.value)}
        type="number"
        fullWidth
      />
      <TextField
        label="מחזור"
        value={cycle}
        onChange={(e) => setCycle(e.target.value)}
        fullWidth
      />
      <DatePicker
        label="תאריך התחלה"
        value={startDate}
        onChange={(newDate) => setStartDate(newDate)}
        slotProps={{
          textField: {
            InputProps: {
              sx: {
                flexDirection: 'row-reverse',
              },
            },
          },
          popper: {
            modifiers: [
              {
                name: 'zIndex',
                enabled: true,
                phase: 'beforeWrite',
                fn: ({ state }) => {
                  state.styles.popper.zIndex = '13000';
                },
              },
            ],
          },
        }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        הוסף שבוע
      </Button>

    </Box>
  );
};

export default NewWeekForm;