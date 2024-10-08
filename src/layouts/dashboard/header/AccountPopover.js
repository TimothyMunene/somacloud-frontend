import { useState } from 'react';
import { capitalCase } from 'change-case';

import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Divider, IconButton, MenuItem, Popover, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AuthService from '../../../services/AuthService';
import account from '../../../_mock/account';
import { Navigate, Outlet } from 'react-router-dom';

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const user=JSON.parse(localStorage.getItem("user"));
  const isUser= user.username !== null && user.username !== undefined;
  if(!isUser){
    AuthService.logout();
    navigate('/login');
  }


  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {capitalCase(user?.username)}
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose} disabled>
              {option.label}
            </MenuItem>
          ))}
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
