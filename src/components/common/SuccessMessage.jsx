// components/common/SuccessMessage.js
import React from 'react';
import { Alert } from '@mui/material';

const SuccessMessage = ({ message }) => {
    return (
        <Alert  sx={{my:'10px'}} severity="success">{message}</Alert>
    );
}

export default SuccessMessage;
