import React, { useState,useRef  } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {
    Radio,
    RadioGroup,
    FormLabel,
    Grid,
    Button,
    FormControlLabel,
} from '@mui/material';
import im from '../../assets/images/logos/logo-2.png';
import '../../App.css';
import FormInput from '../../components/common/FormInput';
import FormCheckbox from '../../components/common/FormCheckbox';
import FormPasswordInput from '../../components/common/FormPasswordInput';
import SuccessMessage from '../../components/common/SuccessMessage';
import authService from '../../services/auth/authService';
import ReCAPTCHA from 'react-google-recaptcha';

const SignupPage = () => {
    const [accountType, setAccountType] = useState('Individual');
    const [formData, setFormData] = useState({
        accountType,
        username: '',
        firstName: '',
        lastName: '',
        technicianName: '',
        doctorName: '',
        email: '',
        labName: '',
        clinicName: '',
        password: '',
        agreedToTerms: false,

    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
   const captchaRef  = useRef(null);
   const navigate = useNavigate()


    const handleAccountTypeChange = (event) => {
        setAccountType(event.target.value);
        resetErrors();
        setSuccessMessage('');
        resetForm();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        // Clear specific errors when changing account type
        setErrors({ ...errors, [name]: '' });
        // Hide success message when user starts typing again
        setSuccessMessage('');
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => { // Make handleSubmit an async function
        event.preventDefault();
        // Validate form data
        const newErrors = {};

        const requiredFields = ['username', 'lastName', 'email', 'password'];
        if (accountType === 'Individual' && !formData.firstName.trim()) {
            newErrors.firstName = 'First Name is required';
        }
        requiredFields.forEach(field => {
            if (!formData[field].trim()) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });
        if (accountType === 'Lab Technician' && !formData.labName.trim()) {
            newErrors.labName = 'Lab Name is required';
        }

        if (accountType === 'Doctor' && !formData.clinicName.trim()) {
            newErrors.clinicName = 'Clinic Name is required';
        }
        if (accountType === 'Lab Technician' && !formData.technicianName.trim()) {
            newErrors.technicianName = 'Technician Name is required';
        }
        if (accountType === 'Doctor' && !formData.doctorName.trim()) {
            newErrors.doctorName = 'Doctor Name is required';
        }
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.';
        }
        // Set errors
        setErrors(newErrors);
        // If there are errors, prevent form submission
        if (Object.keys(newErrors).length > 0) {
            return;
        }
        try {
            // Call register method from authService
            const captchaValue = captchaRef.current.getValue();
            if (!captchaValue) {
                throw new Error('Please complete the CAPTCHA');
            }
            const data = await authService.register(formData);
            console.log('Singup successful:', data);
            navigate('/verify-otp');
        } catch (error) {
            // Handle registration error
            console.error('Registration failed:', error);
            setErrors(error);
            setErrors({ captcha: error.message });
        }
    };

    const resetForm = () => {
        setFormData({
            accountType,
            firstName: '',
            lastName: '',
            technicianName: '',
            doctorName: '',
            email: '',
            labName: '',
            username: '',
            clinicName: '',
            password: '',
            agreedToTerms: false,
        });
        if (captchaRef.current) {
            captchaRef.current.reset(); // Reset CAPTCHA
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

                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <FormInput
                                                label={`${accountType === 'Individual' ? 'First' : accountType} Name`}
                                                name={`${accountType === 'Individual' ? 'firstName' : accountType.toLowerCase() === 'lab technician' ? 'technicianName' : 'doctorName'}`}
                                                value={formData[`${accountType === 'Individual' ? 'firstName' : accountType.toLowerCase() === 'lab technician' ? 'technicianName' : 'doctorName'}`]}
                                                onChange={handleChange}
                                                error={errors[`${accountType === 'Individual' ? 'firstName' : accountType.toLowerCase() === 'lab technician' ? 'technicianName' : 'doctorName'}`]}
                                                helperText={errors[`${accountType === 'Individual' ? 'firstName' : accountType.toLowerCase() === 'lab technician' ? 'technicianName' : 'doctorName'}`]}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormInput
                                                label="Last Name"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                error={errors.lastName}
                                                helperText={errors.lastName}
                                            />
                                        </Grid>
                                    </Grid>
                                    <FormInput
                                        label="Username"
                                        name="username"
                                        type="text"
                                        value={formData.username}
                                        onChange={handleChange}
                                        error={errors.username}
                                        helperText={errors.username}
                                    />
                                    <FormInput
                                        label="Email address"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                        helperText={errors.email}
                                    />
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
                                    <FormCheckbox
                                        name="agreedToTerms"
                                        checked={formData.agreedToTerms}
                                        onChange={handleChange}
                                        label="I agree to the terms of service"
                                        error={errors.agreedToTerms}
                                        helperText={errors.agreedToTerms}
                                    />
                                    {errors.captcha && <p style={{ color: '#d32f2f' }}>{errors.captcha}</p>}
                                    {successMessage && <SuccessMessage message={successMessage} />}
                                    <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef}  />
                                    <Button type="submit" variant="contained" className='link-btn active btn-1 active-bg default-bg' fullWidth>Register</Button>
                                     
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

