import React from 'react';
import { Alert } from '@mui/material';

const WrongPasswordMessage = ({ message }) => {
    return (
        <Alert  sx={{my:'10px'}} severity="error">{message}</Alert>
    );
}

export default WrongPasswordMessage;
