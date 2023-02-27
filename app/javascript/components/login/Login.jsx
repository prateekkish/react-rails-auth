import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { useSnackbar } from "notistack";

import { Box, Button, Link, TextField, Typography } from '@mui/material';

import { loginUser } from "../../authentication/authActions";
import { boxStyle, buttonStyle, inputStyle } from "../../styles/formStyles";

function Login() {
  const { mutate: loginCommit } = loginUser();
  const { register, handleSubmit, setFocus, formState: { errors } } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const validationOptions = {
    email: { required: "Email is required" },
    password: { required: "Password is required" },
  };

  const handleLogin = (data) => {
    loginCommit({ email, password } = data, {
      onSuccess: () => {
        enqueueSnackbar("Login successful", { variant: "success" });
      },
      onError: ({ response: { data: { error }}}) => {
        enqueueSnackbar(error, { variant: "error" });
      }
    });
  };

  const handleFailedValidation = (errors) => {
    enqueueSnackbar("Please check your input and try again!", { variant: "error" });
  };

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return (
    <Box sx={boxStyle}>
      <Typography variant="h4">Login to your account</Typography>
      <form style={{ width: '100%' }} onSubmit={handleSubmit(handleLogin, handleFailedValidation)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            style={inputStyle}
            label="Email"
            type="email"
            required
            error={errors?.email ? true : false}
            helperText={errors?.email?.message}
            {...register('email', validationOptions.email)} />
          <TextField
            style={inputStyle}
            label="Password"
            type="password"
            required
            error={errors?.password ? true : false}
            helperText={errors?.password?.message}
            {...register('password', validationOptions.password)} />
          <Button style={buttonStyle} variant="contained" color="primary" type="submit">
            Login
          </Button>
          <Link component={RouterLink} to="/register" underline="hover">
            Don't have an account yet? Register here
          </Link>
        </div>
      </form>
    </Box>
  );
}

export default Login;
