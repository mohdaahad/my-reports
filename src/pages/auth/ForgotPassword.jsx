import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import im from '../../assets/images/logos/logo-2.png';
import FormInput from '../../components/common/FormInput';
import SuccessMessage from '../../components/common/SuccessMessage';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import WrongPasswordMessage from '../../components/common/WrongPasswordMessage';
import { resetPassword } from '../../redux/actions/authActions';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error);

    const [formData, setFormData] = useState({
        email: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const captchaRef = useRef(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setSuccessMessage('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Dispatch action to verify email
        dispatch(resetPassword(formData.email));
        setSuccessMessage('Please check your email for the reset password link.');
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
                                    />
                                    
                                    <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef} />
                                    {successMessage && <SuccessMessage message={successMessage} />}
                                    {error && <WrongPasswordMessage message={error} />}
                                    <Button type="submit" variant="contained" className='button link-btn active btn-1 active-bg default-bg' fullWidth>Reset Password</Button>
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
