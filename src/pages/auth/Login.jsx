import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Button, CircularProgress } from '@mui/material';
import im from '../../assets/images/logos/logo-2.png';
import '../../App.css';
import FormInput from '../../components/common/FormInput';
import SuccessMessage from '../../components/common/SuccessMessage';
import FormCheckbox from '../../components/common/FormCheckbox';
import WrongPasswordMessage from '../../components/common/WrongPasswordMessage';
import { login } from '../../redux/actions/authActions';
import { useSelector, useDispatch } from 'react-redux';
import FormPasswordInput from '../../components/common/FormPasswordInput';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',  
        password: '',
        rememberMe: false,
    });
    const dispatch = useDispatch();
    const { isAuthenticated} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [wrongPassword, setWrongPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);
    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        setFormData({ ...formData, [name]: name === 'rememberMe' ? checked : value });
        setErrors({ ...errors, [name]: '' });
        setWrongPassword(false);
        setSuccessMessage('');
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const newErrors = {};
        if (!formData.email.trim()) {  
            newErrors.email = 'Email is required';  
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setIsSubmitting(false);
            return;
        }

        try {
            await dispatch(login({
                email: formData.email,
                password: formData.password,
                rememberMe: formData.rememberMe,
            }));
            setSuccessMessage("Form submitted successfully!");
            // console.log('Login successful:', data);
            navigate("/")
        } catch (error) {
            setWrongPassword("Incorrect email or password. Please try again.");  
            setFormData({ ...formData, password: '' });
            console.error('Login failed:', error);
        } finally {
            setIsSubmitting(false);
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
                                        label="Email"
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        error={errors.email}  
                                        helperText={errors.email} 
                                    />
                                    <FormPasswordInput
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
                                    <Button 
                                        type="submit" 
                                        variant="contained" 
                                        className='button link-btn active btn-1 active-bg default-bg' 
                                        fullWidth
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? <CircularProgress  size={24} style={{'color': 'white'}} /> : 'Sign In'}
                                    </Button>
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
