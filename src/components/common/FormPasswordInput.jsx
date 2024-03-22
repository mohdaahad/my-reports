// components/common/FormPasswordInput.js
import React from 'react';
import { IconButton, InputAdornment, OutlinedInput, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
const FormPasswordInput = ({ label, name, value, onChange, showPassword, handleShowPassword, error, helperText }) => {
    return (
        <FormControl fullWidth margin="normal" error={error ? 'true' : undefined}>
            <InputLabel htmlFor={`outlined-adornment-${name}`}>{label}</InputLabel>
            <OutlinedInput
                id={`outlined-adornment-${name}`}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                name={name}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowPassword}
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
            />
            {error && <FormHelperText><span className="error-text">{helperText}</span></FormHelperText>}
        </FormControl>
    );
}

export default FormPasswordInput;
