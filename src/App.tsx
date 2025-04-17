import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import SideNav from './components/SideNav'
import TopBar from './components/TopBar';
import ApplicantsTable from './components/ApplicantsTable';
import InstructorsTable from "./components/InstructorsTable.tsx";
import ReviewsTable from "./components/ReviewsTable.tsx";
import WeeksTable from "./components/WeeksTable.tsx";
//import { LocalizationProvider } from '@mui/x-date-pickers';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <SideNav />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <TopBar />
          <Routes>
            <Route path="/applicants" element={<ApplicantsTable />} />
            <Route path="/instructors" element={<InstructorsTable />} />
            <Route path="/reviews" element={<ReviewsTable />} />
            <Route path="/weeks" element={<WeeksTable />} />
          </Routes>
        </Box>
      </Box>
  );
}

export default App