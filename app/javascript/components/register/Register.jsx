import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Button, Link, TextField, Typography } from '@mui/material';

import { registerUser } from "../../authentication/authActions";
import { boxStyle, buttonStyle, inputStyle } from "../../styles/formStyles";

function Register() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const referralEmail = queryParams.get("email") || "";
  const { mutate: registerCommit } = registerUser();
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors } } = useForm({ defaultValues: { email: referralEmail }});
  const { enqueueSnackbar } = useSnackbar();

  const validationOptions = {
    email: { required: "Email is required" },
    password: { required: "Password is required" },
    passwordConfirm: { validate: (value) => value === watch("password") || "The passwords do not match" },
  };

  const handleRegistration = (data) => {
    registerCommit({ email, password } = data);
  };

  const handleFailedValidation = () => {
    enqueueSnackbar("Please check your input and try again!", { variant: "error" });
  };

  useEffect(() => {
    focusField = referralEmail ? "password" : "email";
    setFocus(focusField);
  }, [referralEmail, setFocus]);

  return (
    <Box sx={boxStyle}>
      <Typography variant="h4">Create an account</Typography>
      <form style={{ width: '100%' }} onSubmit={handleSubmit(handleRegistration, handleFailedValidation)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            style={inputStyle}
            label="Email"
            type="email"
            disabled={referralEmail ? true : false}
            required
            error={errors?.email ? true : false}
            helperText={errors?.email?.message}
            {...register('email', validationOptions.email)} />
          <TextField
            id="password_field"
            style={inputStyle}
            label="Password"
            type="password"
            required
            error={errors?.password ? true : false}
            helperText={errors?.password?.message}
            {...register('password', validationOptions.password)} />
          <TextField
            id="password_confirm_field"
            style={inputStyle}
            label="Confirm Password"
            type="password"
            required
            error={errors?.passwordConfirm ? true : false}
            helperText={errors?.passwordConfirm?.message}
            {...register('passwordConfirm', validationOptions.passwordConfirm)} />
          <Button style={buttonStyle} variant="contained" color="primary" type="submit">
            Register
          </Button>
          <Link component={RouterLink} to="/login" underline="hover">
            Already have an account with us? Login here
          </Link>
        </div>
      </form>
    </Box>
  );
}

export default Register;
