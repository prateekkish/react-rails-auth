import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useSnackbar } from "notistack";

import { logoutUser } from "../../authentication/authActions";

function Navbar() {
  const commitLogout = logoutUser();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = () => {
    commitLogout();
    enqueueSnackbar("You have been logged out!", { variant: "warning" });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Welcome
        </Typography>
        <IconButton 
          id="logout_button"
          color="inherit" 
          onClick={handleLogout}>
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;