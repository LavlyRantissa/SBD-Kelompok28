import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import './ForgotPassword.css'

const ForgotPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [passwordVisible1, setPasswordVisible1] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);
    const [errorLength, setErrorLength] = useState(false);
    const [errorMatch, setErrorMatch] = useState(false);
    const [identifier, setIdentifier] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [toastSuccess, setSuccess] = useState(false);
    const [toastFailed, setFailed] = useState(false);
    const [toastWarning, setWarning] = useState(false);

    function togglePasswordVisibility1() {
        setPasswordVisible1(!passwordVisible1);
    }

    function togglePasswordVisibility2() {
        setPasswordVisible2(!passwordVisible2);
    }
    useEffect(() => {
        if (location.state && location.state.identifier) {
            setIdentifier(location.state.identifier);
        }
    }, [location]);

    const handlePasswordChange = (event) => {
        const newPass = event.target.value;
        setNewPassword(newPass);
        if (newPass.length < 8) {
          setErrorLength(true);
        } else {
          setErrorLength(false);
        }
    };

    const handlePasswordMatch = (event) => {
        const confirmPass = event.target.value;
        setConfirmPassword(confirmPass);
        if (newPassword !== confirmPass) {
          setErrorMatch(true);
        } else {
          setErrorMatch(false);
        }
    };

    const handleForgotPassword = async (event) => {
        event.preventDefault();
        if (!errorLength && !errorMatch) {
            try {
                const response = await fetch('http://localhost:9453/users/forgotPassword', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ identifier, newPassword }),
                });
                const data = await response.json();

                if (response.status === 200) {
                     setSuccess(true);
                   setTimeout(() => {
                        setSuccess(false);
                        navigate(`/SignIn`);
                    }, 3000);
                } else {
                    setFailed(true);
                    setTimeout(() => {
                        setFailed(false);
                    }, 3000);
                }
            } catch (error) {
            }
        } else {
            setWarning(true);
            setTimeout(() => {
                setWarning(false);
            }, 3000);
        }
    };

    

    return (
        <div className="forgot-password-container">
                    {toastSuccess && (
    <Toast className='toast-bg'>
        <div>
            <HiCheck className='success-toast' />
        </div>
        <div className='toast-text'>Password Reset Successful!</div>
        <Toast.Toggle className='toast-close'/>
    </Toast>
)}

{toastWarning && (
    <Toast className='toast-bg'>
        <div>
            <HiExclamation className='warning-toast' />
        </div>
        <div className='toast-text'>Please Match Your New Password!</div>
        <Toast.Toggle className='toast-close'/>
    </Toast>
)}

{toastFailed && (
    <Toast className='toast-bg'>
        <div>
            <HiX className='failed-toast' />
        </div>
        <div className='toast-text'>There was an error. Please try again later. </div>
        <Toast.Toggle className='toast-close'/>
    </Toast>
)}
            <div className="forgot-password-forgot-password">
                <div style={{ width: 999, height: 591, position: 'absolute' }}>
                    <div style={{ width: 800, height: 420, left: 370, top: 150, position: 'absolute', background: 'white', borderRadius: 71 }} />
                    <div style={{ width: 800, height: 420, left: 370, top: 250, position: 'absolute', background: '#FB760D', borderRadius: 65 }} />
                </div>

                <span className="forgot-password-text">
                    <span>Set New Password</span>
                </span>
                <button className="forgot-password-frame00-button" onClick={handleForgotPassword}>
                    <span className="forgot-password-text2">
                        <span>Reset Password</span>
                    </span>
                </button>
                <h1 className='user-or-email'>
                    Username / E-Mail
                </h1>
                <h1 className='new-password'>
                    New Password
                </h1>
                {errorLength && <h1 className='check-password'>*Min 8 characters</h1>}
                {errorMatch && <h1 className='check-password-correct'>*Passwords Don't Match! Try Again</h1>}

                <input
                    className='forgot-password-frame02-input-fieldwith-label'
                    placeholder='  New Password'
                    type={passwordVisible1 ? "text" : "password"}
                    onChange={handlePasswordChange}
                    value={newPassword}
                />
                <button type="button"  className='visibility_new' onClick={togglePasswordVisibility1}>
    {passwordVisible1 ? "👁️‍🗨️" : "👁️‍🗨️"}
</button>
<button type="button"  className='visibility_confirm' onClick={togglePasswordVisibility2}>
    {passwordVisible2 ? "👁️‍🗨️" : "👁️‍🗨️"}
</button>
                <h1 className='confirm-new-password'>
                    Confirm New Password
                </h1>
                <h1 className='forgot-password-frame02-input-fieldwith-label2'>{identifier}</h1>
                <input
                    className='forgot-password-frame02-input-fieldwith-label1'
                    placeholder='  Confirm New Password'
                    type={passwordVisible2 ? "text" : "password"}
                    onChange={handlePasswordMatch}
                    value={confirmPassword}
                />
            </div>
        </div>
    );
}

export default ForgotPassword;
