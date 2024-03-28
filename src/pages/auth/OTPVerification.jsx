// OTPVerification.js
import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button,Typography,Stack } from '@mui/material';
import FormInput from '../../components/common/FormInput';
import SuccessMessage from '../../components/common/SuccessMessage';
import im from '../../assets/images/logos/logo-2.png';
import authService from '../../services/auth/authService';
import { useLocation } from 'react-router-dom';
const OTPVerification = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const emailFromState = location.state?.email || '';
    const [formData, setFormData] = useState({
        email: emailFromState,
        otp: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [remainingTime, setRemainingTime] = useState(60);
    const [resendDisabled, setResendDisabled] = useState(false);
   
    useEffect(() => {
        const timer = setTimeout(() => {
            if (remainingTime > 0) {
                setRemainingTime((prevTime) => prevTime - 1);
            } else {
                setResendDisabled(false);
            }
        }, 100000);

        return () => clearTimeout(timer);
    }, [remainingTime]); 

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
        setSuccessMessage('');
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const { email, otp } = formData;
        try {
             await authService.verifyEmailOTP(email, otp);
            
            setSuccessMessage('OTP verified successfully.');
            setFormData({ otp: '' });
            navigate('/reset-password');
        } catch (error) {
            setErrors({ otp: error.response?.data?.message || 'Failed to verify OTP.' });
        }
    };
    const handleResendOTP = async () => {
        try {
            await authService.sendOTP();
            
            setResendDisabled(true);
            setRemainingTime(60); // Reset the timer
        } catch (error) {
            // Handle error
            console.error('Failed to resend OTP:', error);
        }
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
                                    <Button type="submit" variant="contained" className='link-btn button active btn-1 active-bg default-bg' fullWidth>
                                        Verify OTP
                                    </Button>
                                    <Button
                                        variant="contained"
                                        disabled={resendDisabled}
    
                                        onClick={handleResendOTP}
                                       className='button'
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
