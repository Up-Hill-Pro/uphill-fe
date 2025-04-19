import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import SideNav from './shared/components/SideNav.tsx'
import TopBar from './shared/components/TopBar.tsx';
import ApplicantsPage from './features/applicants/pages/ApplicantsPage.tsx';
import InstructorsPage from "./features/instructors/pages/InstructorsPage.tsx";
import ReviewsPage from "./features/reviews/pages/ReviewsPage.tsx";
import WeeksPage from "./features/weeks/pages/WeeksPage.tsx";

function App() {
  return (
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <SideNav />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <TopBar />
          <Routes>
            <Route path="/applicants" element={<ApplicantsPage />} />
            <Route path="/instructors" element={<InstructorsPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/weeks" element={<WeeksPage />} />
          </Routes>
        </Box>
      </Box>
  );
}

export default App