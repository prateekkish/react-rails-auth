import React from "react";
import { Box, Container, CssBaseline, Paper } from "@mui/material";
import Navbar from "./navigation/Navbar";
import { Referral } from "./referrals";

export default () => (
  <>
    <Navbar />
    <Paper elevation={3}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ height: '50vh' }}>
          <Referral />
        </Box>
      </Container>
    </Paper>
  </>
);