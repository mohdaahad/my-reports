// components/common/FormCheckbox.js
import React from 'react';
import { Checkbox, FormControlLabel,FormControl,FormHelperText } from '@mui/material';

const FormCheckbox = ({ label, name, checked, onChange, error, helperText }) => {
    return (
        <FormControl error={!!error}>
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={onChange} name={name} />}
                label={label}
            />
            {error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}

export default FormCheckbox;
