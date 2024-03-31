import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import FormInput from '../../components/common/FormInput';
import SuccessMessage from '../../components/common/SuccessMessage';
import im from '../../assets/images/logos/logo-2.png';
import FormPasswordInput from '../../components/common/FormPasswordInput';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { resetPassword } from '../../redux/actions/authActions'; // Import the resetPassword action
import WrongPasswordMessage from '../../components/common/WrongPasswordMessage';
const PasswordReset = () => {
    const dispatch = useDispatch(); // Initialize useDispatch
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

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

        if (!formData.newPassword.trim()) {
            newErrors.newPassword = 'New password is required';
        }
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(formData.newPassword)) {
            newErrors.newPassword = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            // Dispatch the resetPassword action with form data
            await dispatch(resetPassword({
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword,
            }));
            
            setSuccessMessage('Password reset successfully.');
            setFormData({ newPassword: '', confirmPassword: '' });
        } catch (error) {
            setErrors({ newPassword: error.response?.data?.message || 'Failed to reset password.' });
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
                                    <img src={im} alt="logo" />
                                </Link>
                            </div>
                            <div>
                                <h1>Password Reset</h1>
                                <div className="clearfix"></div>
                                <form onSubmit={handleSubmit}>
                                    <FormInput
                                        label="New Password"
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        error={errors.newPassword}
                                        helperText={errors.newPassword}
                                    />
                                    <FormPasswordInput
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        error={errors.confirmPassword}
                                        showPassword={showPassword}
                                        handleShowPassword={handleShowPassword}
                                        helperText={errors.confirmPassword}
                                    />
                                    {successMessage && <SuccessMessage message={successMessage} />}
                                    {errors && <WrongPasswordMessage message={errors} />}
                                    <Button type="submit" variant="contained" className="link-btn button btn-1 active-bg default-bg" fullWidth>Reset Password</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PasswordReset;
