import React from "react";
import { Box, Container, CssBaseline, Paper } from "@mui/material";
import Navbar from "./navigation/Navbar";

export default () => (
  <>
    <Navbar />
    <Paper elevation={3}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ height: '50vh' }}>
          <h2>Dashboard</h2>
          <div>This is your dashboard.</div>
        </Box>
      </Container>
    </Paper>
  </>
);