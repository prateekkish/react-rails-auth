import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { 
  Box, 
  Button, 
  IconButton, 
  Modal, 
  TextField, 
  Typography } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

import { buttonStyle, inputStyle } from "../../styles/formStyles";
import { createReferral } from "./referralActions";

function CreateReferral() {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { mutate: createReferralCommit } = createReferral();
  const { enqueueSnackbar } = useSnackbar();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const validationOptions = {
    email: { required: "Email is required" },
    password: { required: "Password is required" },
  };

  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  }

  const handleFailedValidation = () => {
    enqueueSnackbar("Please check your input and try again!", { variant: "error" })
  };

  const handleRefer = (data) => {
    createReferralCommit(data, {
      onSuccess: () => {
        enqueueSnackbar("Referral created successfully!", { variant: "success" });
        closeModal();
      },
      onError: ({ response: { data: { error }}}) => {
        enqueueSnackbar(error, { variant: "error" });
      }
    });
  };

  const renderModal = () => {
    return (
      <Modal
        aria-describedby="Referral create modal"
        aria-labelledby="Create a new referral"
        open={isModalOpen}
        onClose={() => { setIsModalOpen(false) }}
      >
        <Box sx={boxStyle}>
          <Typography variant="h6">Create a new referral</Typography>
          <form style={{ width: '100%' }} onSubmit={handleSubmit(handleRefer, handleFailedValidation)}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <TextField 
                style={inputStyle} 
                label="Email" 
                type="email" 
                required 
                error={errors?.email ? true : false}
                helperText={errors?.email?.message}
                {...register('email', validationOptions.email)} />
              <Button style={buttonStyle} variant="contained" color="primary" type="submit">
                Refer
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    );
  }

  return (
    <div className="mx-2" style={{ display: "inline" }}>
      <IconButton 
        id="open_referral_modal"
        color="inherit" 
        onClick={() => setIsModalOpen(true)}>
        <AddCircleOutline />
      </IconButton>
      { renderModal() }
    </div>
  );
}

export default CreateReferral;