import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import SideNav from './components/SideNav'
import TopBar from './components/TopBar';
import ApplicantsTable from './components/ApplicantsTable';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <SideNav />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar />
        <Routes>
          <Route path="/applicants" element={<ApplicantsTable />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App