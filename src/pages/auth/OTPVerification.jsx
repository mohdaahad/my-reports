import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Typography, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../../components/common/FormInput';
import SuccessMessage from '../../components/common/SuccessMessage';
import WrongPasswordMessage from '../../components/common/WrongPasswordMessage';
import { verifyEmailOTP, register, verifyEmail } from '../../redux/actions/authActions';
import logoImage from '../../assets/images/logos/logo-2.png';

const OTPVerification = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error);

    const location = useLocation();
    const emailFromState = location.state?.formData?.email || '';
    const data = location.state?.formData;

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
                setRemainingTime(prevTime => prevTime - 1);
            } else {
                setResendDisabled(false);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [remainingTime]);

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        setSuccessMessage('');
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const { email, otp: email_otp } = formData;
        if (!email_otp.trim()) {
            setErrors({ file: 'OTP is required' });
            return;
        }
        try {
            if (await dispatch(verifyEmailOTP(email, email_otp))) {
                setSuccessMessage('OTP verified successfully.');
                setFormData(prevState => ({ ...prevState, otp: '' }));
                dispatch(register(data));
                navigate('/sign-in');
            } else {
                setErrors({ otp: 'Failed to verify OTP.' });
            }
        } catch (error) {
            setErrors({ otp: error.response?.data?.message || 'Failed to verify OTP.' });
        }
    };

    const handleResendOTP = async () => {
        try {
            await dispatch(verifyEmail(formData.email));
            setResendDisabled(true);
            setRemainingTime(60);
        } catch (error) {
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
                                <Link to="/sign-in" className="link-btn btn-1 default-bg">Login</Link>
                                <Link to="/sign-up" className="link-btn btn-2">Register</Link>
                            </div>
                            <div className="logo">
                                <Link to="/">
                                    <img src={logoImage} alt="logo" />
                                </Link>
                            </div>
                            <div>
                                <h1>OTP Verification</h1>
                                <form onSubmit={handleSubmit}>
                                    <FormInput
                                        label="Enter OTP"
                                        type="text"
                                        name="otp"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        error={errors.file}
                                        helperText={errors.file}
                                    />
                                    <Typography variant="caption" gutterBottom>
                                        Resend OTP in {remainingTime} seconds
                                    </Typography>
                                    {successMessage && <SuccessMessage message={successMessage} />}
                                    {errors.otp && <WrongPasswordMessage message={errors.otp} />}
                                    <Stack spacing={2} direction="row">
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
};

export default OTPVerification;
