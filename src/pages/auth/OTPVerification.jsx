// OTPVerification.js
import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button,Typography,Stack } from '@mui/material';
import FormInput from '../../components/common/FormInput';
import SuccessMessage from '../../components/common/SuccessMessage';
import im from '../../assets/images/logos/logo-2.png';
const OTPVerification = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        otp: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [remainingTime, setRemainingTime] = useState(60);
    const [resendDisabled, setResendDisabled] = useState(false);
    // const OTPVerification  = (event) => {
    //     const { name, value } = event.target;
    //     setFormData({ ...formData, [name]: value });
    //     setErrors({ ...errors, [name]: '' });
    //     setSuccessMessage('');
    // };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (remainingTime > 0) {
                setRemainingTime((prevTime) => prevTime - 1);
            } else {
                setResendDisabled(false);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [remainingTime]); 

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
        setSuccessMessage('');
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate form data
        const newErrors = {};
        if (!formData.otp.trim()) {
            newErrors.otp = 'OTP is required';
        }
        // Set errors
        setErrors(newErrors);
        // If there are errors, prevent form submission
        if (Object.keys(newErrors).length > 0) {
            return;
        }
        // Submit the form (you can handle this part according to your application's logic)
        // For demonstration purposes, let's show a success message
        setSuccessMessage('OTP verified successfully.');
        // Reset form data
        setFormData({ otp: '' });
        navigate('/reset-password');
    };
    const handleResendOTP = () => {
        // Logic to resend OTP
        setResendDisabled(true);
        setRemainingTime(60); // Reset the timer
    };

    return (
        <div id="top" className="login-7-bg">
            <div className="login-7">
                <div className="login-7-inner">
                    <div className="form-info">
                        <div className="form-section align-self-center">
                        <div className="btn-section clearfix">
                                    <Link to="/sign-in" className="link-btn  btn-1 default-bg">Login</Link>
                                    <Link to="/sign-up" className="link-btn btn-2 ">Register</Link>
                                </div>
                                <div className="logo">
                                    <Link to="/">
                                        <img src={im} alt="logo" />
                                    </Link>
                                </div>
                        <div>
                                <h1>OTP Verification</h1>
                                <div className="clearfix"></div>
                                <form onSubmit={handleSubmit}>
                                    <FormInput
                                        label="Enter OTP"
                                        type="text"
                                        name="otp"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        error={errors.otp}
                                        helperText={errors.otp}
                                    />
                                     <Typography variant="caption" gutterBottom>
                                        Resend OTP in {remainingTime} seconds
                                    </Typography>
                                    {successMessage && <SuccessMessage message={successMessage} />}
                                  
                                    <Stack  spacing={2} direction="row">
                                    <Button type="submit" variant="contained" className='link-btn active btn-1 active-bg default-bg' fullWidth>
                                        Verify OTP
                                    </Button>
                                    <Button
                                        variant="contained"
                                        disabled={resendDisabled}
    
                                        onClick={handleResendOTP}
                                       
                                        fullWidth
                                    >
                                        Resend OTP
                                    </Button>
                                    </Stack>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OTPVerification;
