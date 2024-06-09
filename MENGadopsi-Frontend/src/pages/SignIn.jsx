import React from 'react'
import { useState } from 'react';
import { Toast } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import './SignIn.css'

const SignIn = () => {
  const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [accountExist, setAccountExist] = useState(false);
    const [toastSuccess, setSuccess] = useState(false);
    const [toastFailedAccount, setFailedAccount] = useState(false);
    const [toastFailedSign, setFailedSign] = useState(false);
    const [toastWarning, setWarning] = useState(false);


    
    function togglePasswordVisibility() {
        setPasswordVisible(!passwordVisible);
    }

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch('http://localhost:9453/users/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ identifier, password }),
          });
          
          if (response.status === 200) {
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
          }, 3000);
          navigate(`/profilePage/${encodeURIComponent(identifier)}`);
          
          } else {
            setFailedSign(true);
            setTimeout(() => {
              setFailedSign(false);
          }, 3000);
          }
        } catch (error) {
          alert('There was an error. Please try again later.');
        }
      };

      
      const handleCheckAccount = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:9453/users/checkAccount/${encodeURIComponent(identifier)}`)
        try {
         
          if (response.status === 200) {
            navigate('/forgotPassword', { state: { identifier } });
          } else {
            setFailedAccount(true);
            setTimeout(() => {
              setFailedAccount(false);
          }, 3000);
          }
        } catch (error) {
          alert('There was an error. Please try again l3ater.');
        }
      };

  return (
    <div className="sign-in-container">
      {toastFailedAccount && (
       <Toast className='toast-bgsi'>
        <div>
            <HiX className='failed-toastsi' />
        </div>
        <div className='toast-textsi'>Account Not Found!</div>
        <Toast.Toggle className='toast-closesi'/>
    </Toast>)}

    {toastFailedSign && (
       <Toast className='toast-bgsi'>
        <div>
            <HiX className='failed-toastsi' />
        </div>
        <div className='toast-textsi'>Failed to Sign In! Make sure Username, E-Mail, Or Password Are Correct!</div>
        <Toast.Toggle className='toast-closesi'/>
    </Toast>)}

    {toastSuccess && (
       <Toast className='toast-bgsi'>
        <div>
            <HiCheck className='success-toastsi' />
        </div>
        <div className='toast-textsi'>Sign In Success</div>
        <Toast.Toggle className='toast-closesi'/>
    </Toast>)}

      <div className="sign-in-sign-in">
        <div className="sign-in-background-shadow">
          <div className="sign-in-background"></div>
          <span className="sign-in-text">
            <span>Sign In</span>
          </span>
          <div className="sign-in-form">
                  <input type='text' placeholder='Username or E-Mail' className="sign-in-input" value={identifier} onChange={(e) => setIdentifier(e.target.value)} required></input>
                  <button type="button"  className='visibility_signin' id='toggle-password' onClick={togglePasswordVisibility}>
    {passwordVisible ? "👁️‍🗨️" : "👁️‍🗨️"}
    </button>
                  <input type={passwordVisible ? "text" : "password"} placeholder='Password' className="sign-in-input1" value={password} onChange={(e) => setPassword(e.target.value)} required></input>

                  {identifier && (
     <div className="sign-in-container3" >
      <span className="sign-in-text06"  onClick={handleCheckAccount}>
     <Link>Forgot Password</Link>
     </span>
   </div>
    
)}

           
            <div className="sign-in-container4"></div>
            <button className="sign-in-button" onClick={handleSignIn}>
              <span className="sign-in-text08">
                <span>Sign In</span>
              </span>
            </button>
          </div>
          <span className="sign-in-text10">
            <span>Hello,</span>
            <br></br>
            <span>Welcome Back!</span>
          </span>
          <span className="sign-in-text14">
            <span className="sign-in-text15">
              Don’t Have An Account?
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <Link to={'/'} className='to-sign-up-link'>Sign Up</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default SignIn
