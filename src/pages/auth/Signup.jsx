import React, { useState, useRef } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {
    Radio,
    RadioGroup,
    FormLabel,
    Button,
    FormControlLabel,
} from '@mui/material';
import im from '../../assets/images/logos/logo-2.png';
import '../../App.css';
import FormInput from '../../components/common/FormInput';
import FormPasswordInput from '../../components/common/FormPasswordInput';
import SuccessMessage from '../../components/common/SuccessMessage';
import WrongPasswordMessage from '../../components/common/WrongPasswordMessage';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch } from 'react-redux';
import { verifyEmail } from '../../redux/actions/authActions';

const SignupPage = () => {
    const [accountType, setAccountType] = useState('Individual');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        accountType,
        email: '',
        labName: '',
        clinicName: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const captchaRef = useRef(null);

    const handleAccountTypeChange = (event) => {
        setAccountType(event.target.value);
        resetErrors();
        setSuccessMessage('');
        resetForm();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
        setSuccessMessage('');
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};
        const requiredFields = ['email', 'password'];

        requiredFields.forEach(field => {
            if (!formData[field].trim()) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            const captchaValue = captchaRef.current.getValue();
            if (!captchaValue) {
                throw new Error('Please complete the CAPTCHA');
            }
            await dispatch(verifyEmail(formData.email));
            navigate('/verify-otp',{ state: { formData } } );
        } catch (error) {
            console.error('Registration failed:', error);
            setErrors(error);
            setErrors({ captcha: error.message });
        }
    };

    const resetForm = () => {
        setFormData({
            accountType,
            email: '',
            labName: '',
            clinicName: '',
            password: '',
        });
        if (captchaRef.current) {
            captchaRef.current.reset();
        }
    };

    const resetErrors = () => {
        setErrors({});
    };

    return (
        <div className="login-7-bg">
            <div className="login-7">
                <div className="login-7-inner">
                    <div className="form-info">
                        <div className="form-section align-self-center">
                            <div>
                                <div className="btn-section clearfix">
                                    <Link to="/sign-in" className="link-btn active btn-1 default-bg">Login</Link>
                                    <Link to="/sign-up" className="link-btn btn-2 active-bg">Register</Link>
                                </div>
                                <div className="logo">
                                    <Link to="/">
                                        <img src={im} alt="logo" />
                                    </Link>
                                </div>
                                <h1>Welcome!</h1>
                                <div className="typing">
                                    <h3>Create An Account</h3>
                                </div>
                                <div className="clearfix"></div>
                                <form onSubmit={handleSubmit}>
                                    <FormLabel component="legend">Account Type</FormLabel>
                                    <RadioGroup row name="accountType" value={accountType} onChange={handleAccountTypeChange}>
                                        {['Individual', 'Lab Technician', 'Doctor'].map(type => (
                                            <FormControlLabel key={type} value={type} control={<Radio />} label={type} />
                                        ))}
                                    </RadioGroup>

                                    {accountType === 'Lab Technician' && (
                                        <FormInput
                                            label="Lab Name"
                                            name="labName"
                                            value={formData.labName}
                                            onChange={handleChange}
                                            error={errors.labName}
                                            helperText={errors.labName}
                                        />
                                    )}
                                    {accountType === 'Doctor' && (
                                        <FormInput
                                            label="Clinic Name"
                                            name="clinicName"
                                            value={formData.clinicName}
                                            onChange={handleChange}
                                            error={errors.clinicName}
                                            helperText={errors.clinicName}
                                        />
                                    )}
                                    <FormInput
                                        label="Email address"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                        helperText={errors.email}
                                    />
                                    <FormPasswordInput
                                        label="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                        helperText={errors.password}
                                        showPassword={showPassword}
                                        handleShowPassword={handleShowPassword}
                                    />
                                    {successMessage && <SuccessMessage message={successMessage} />}
                                    {errors.captcha && <WrongPasswordMessage message={errors.captcha} />}
                                    <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef} />
                                    <Button type="submit" variant="contained" className='link-btn button active btn-1 active-bg default-bg' fullWidth>Register</Button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
