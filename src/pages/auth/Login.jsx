import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import im from '../../assets/images/logos/logo-2.png';
import '../../App.css';
import FormInput from '../../components/common/FormInput';
import SuccessMessage from '../../components/common/SuccessMessage';
import FormCheckbox from '../../components/common/FormCheckbox';
import WrongPasswordMessage from '../../components/common/WrongPasswordMessage';
import authService from '../../services/auth/authService';
import FormPasswordInput from '../../components/common/FormPasswordInput'; // Import FormPasswordInput component

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [wrongPassword, setWrongPassword] = useState(false);

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        setFormData({ ...formData, [name]: name === 'rememberMe' ? checked : value });
        // Clear specific errors
        setErrors({ ...errors, [name]: '' });
        // Hide wrong password message when user starts typing again
        setWrongPassword(false);
        // Hide success message when user starts typing again
        setSuccessMessage('');
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Validate form data
        const newErrors = {};
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }
        // Set errors
        setErrors(newErrors);
        // If there are errors, prevent form submission
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            const data = await authService.login(formData); // Call the login function from authService with username
            setSuccessMessage("Form submitted successfully!");
            console.log('Login successful:', data);
            // Redirect or perform any necessary action upon successful login
        } catch (error) {
            setWrongPassword("Incorrect username or password. Please try again.");
            setFormData({ ...formData, password: '' });
            console.error('Login failed:', error);
        }
    };

    return (
        <div id="top" className="login-7-bg">
            <div className="login-7">
                <div className="login-7-inner">
                    <div className="form-info">
                        <div className="form-section align-self-center">
                            <div>
                                <div className="btn-section clearfix">
                                    <Link to="/sign-in" className="link-btn active btn-1 active-bg default-bg">Login</Link>
                                    <Link to="/sign-up" className="link-btn btn-2">Register</Link>
                                </div>
                                <div className="logo">
                                    <Link to="/">
                                        <img src={im} alt="logo" />
                                    </Link>
                                </div>
                                <h1>Welcome!</h1>
                                <div className="typing">
                                    <h3>Sign Into Your Account</h3>
                                </div>
                                <div className="clearfix"></div>
                                <form onSubmit={handleSubmit}>
                                    <FormInput
                                        label="Username"
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        error={errors.username}
                                        helperText={errors.username}
                                    />
                                    <FormPasswordInput // Replace OutlinedInput with FormPasswordInput
                                        label="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        showPassword={showPassword}
                                        handleShowPassword={handleShowPassword}
                                        error={errors.password}
                                        helperText={errors.password}
                                    />
                                    <Grid container alignItems="center">
                                        <Grid item xs>
                                            <FormCheckbox
                                                name="rememberMe"
                                                checked={formData.rememberMe}
                                                onChange={handleChange}
                                                label="Remember me"
                                                error={errors.rememberMe}
                                                helperText={errors.rememberMe}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Link to="/forgot-password" className="forgot-link">Forgot your password?</Link>
                                        </Grid>
                                    </Grid>
                                    {successMessage && <SuccessMessage message={successMessage} />}
                                    {wrongPassword && <WrongPasswordMessage message={wrongPassword} />}
                                    <Button type="submit" variant="contained" className='link-btn active btn-1 active-bg default-bg' fullWidth>Sign In</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
