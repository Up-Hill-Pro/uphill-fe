import { Box } from '@mui/material';
import SideNav from './components/SideNav'
import TopBar from './components/TopBar';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <SideNav />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar title="דשבורד" />
        {/* Page content will go here */}
      </Box>
    </Box>
  );
}

export default App