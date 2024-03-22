import React, { useState,useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import im from '../../assets/images/logos/logo-2.png';
import FormInput from '../../components/common/FormInput';
import SuccessMessage from '../../components/common/SuccessMessage';
import ReCAPTCHA from 'react-google-recaptcha';

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const captchaRef  = useRef(null);

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
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        // Validate captcha
        if (!captchaRef.current.getValue()) {
            newErrors.captcha = 'Please complete the captcha';
        }
        // Set errors
        setErrors(newErrors);
        // If there are errors, prevent form submission
        if (Object.keys(newErrors).length > 0) {
            return;
        }
        // Submit the form (you can handle this part according to your application's logic)
        // For demonstration purposes, let's show a success message
        setSuccessMessage('Password reset instructions sent to your email.');
        // Reset form data
        setFormData({ email: '' });
        // Reset captcha
        captchaRef.current.reset();
        navigate('/verify-otp');
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
                                    <img src={im} alt="logo" />
                                </Link>
                            </div>
                            <div>
                                <h1>Welcome!</h1>
                                <div className="typing">
                                    <h3>Recover Your Password</h3>
                                </div>
                                <div className="clearfix"></div>
                                <form onSubmit={handleSubmit}>
                                    <FormInput
                                        label="Email address"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                        helperText={errors.email}
                                    />
                                    {errors.captcha && <span style={{ color: '#d32f2f' }}>{errors.captcha}</span>}
                                    <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef} />
                                    {successMessage && <SuccessMessage message={successMessage} />}
                                    <Button type="submit" variant="contained" className='link-btn active btn-1 active-bg default-bg' fullWidth>Reset Password</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
