import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, IconButton, Divider } from '@mui/material';
import { InsertChart, EventNote, Groups, School, Description, Dashboard, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'דשבורד', icon: <InsertChart />, path: '/dashboard' },
  { label: 'שבועות', icon: <EventNote />, path: '/weeks' },
  { label: 'מאתרים', icon: <Groups />, path: '/instructors' },
  { label: 'חניכים', icon: <School />, path: '/applicants' },
  { label: 'חוות דעת', icon: <Description />, path: '/reviews' },
  { label: 'דוחות', icon: <Dashboard />, path: '/reports' },
];

const activeLabel = 'דשבורד';

const SideNav = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: 280,
        flexShrink: 0,
        fontFamily: '"M PLUS Rounded 1c", sans-serif',
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          borderLeft: '1px solid #eee',
          fontFamily: '"M PLUS Rounded 1c", sans-serif',
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: 'right', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          מעלה הדרך
        </Typography>
      </Box>

      <List>
        {navItems.map((item, index) => {
          const isActive = item.label === activeLabel;
          return (
            <ListItem key={index} component="li" disablePadding>
              <Box
                onClick={() => navigate(item.path)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: 'calc(100% - 20px)',
                  marginX: '10px',
                  mb: 0.75,
                  px: 2,
                  py: 1,
                  cursor: 'pointer',
                  flexDirection: 'row-reverse',
                  transition: 'background-color 0.2s, border-radius 0.2s',
                  backgroundColor: isActive ? '#eef4ff' : 'transparent',
                  borderRadius: '36px',
                  '&:hover': {
                    backgroundColor: '#eef4ff',
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    textAlign: 'right',
                    flex: 1,
                    color: isActive ? 'primary.main' : 'inherit',
                    fontWeight: isActive ? 'bold' : 'normal',
                  }}
                />
                <ListItemIcon
                  sx={{
                    minWidth: 'unset',
                    color: isActive ? 'primary.main' : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              </Box>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton>
          <Settings />
        </IconButton>
        <Avatar alt="" />
        <Typography variant="body2">ברוך הבא</Typography>
      </Box>
    </Drawer>
  );
};

export default SideNav;