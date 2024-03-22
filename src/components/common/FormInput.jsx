// components/common/FormInput.js
import React from 'react';
import { TextField } from '@mui/material';

const FormInput = ({ label, name, type, value, onChange, error, helperText }) => {
    return (
        <TextField
            label={label}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            fullWidth
            margin="normal"
            error={!!error}
            helperText={<span className="error-text">{helperText}</span>}
        />
    );
}


export default FormInput;
