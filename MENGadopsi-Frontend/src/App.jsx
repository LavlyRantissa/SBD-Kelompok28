import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import { Toast } from "flowbite-react";
import './App.css'

const SignUpGroup = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [toastSuccess, setSuccess] = useState(false);
  const [toastFailed, setFailed] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkUsername, setCheckUsername] = useState(false);

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
}

const handlePasswordChange = (event) => {
  setPassword(event.target.value);
  if (event.target.value.length < 8) {
    setError(true);
  } else {
    setError('');
  }
};

const handleUsernameChange = (event) => {
  setUsername(event.target.value);
  if (event.target.value.length < 5 || event.target.value.length > 20) {
    setErrorUsername(true);
  } else {
    setErrorUsername('');
  }
};

const handleSignUp = async (event) => {
  event.preventDefault();
  try {
    const checkEmail = await fetch(`http://localhost:9453/users/checkEmail/${encodeURIComponent(email)}`)
    const checkUsername = await fetch(`http://localhost:9453/users/checkUsername/${encodeURIComponent(username)}`)
    

    if (checkEmail.status === 201){
      if (checkUsername.status === 201){
        try{const response = await fetch('http://localhost:9453/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, username, password }),
        });
        
        if (response.status === 201) {
          
          setSuccess(true);
          setTimeout(() => {
          setSuccess(false);
          }, 3000);
          navigate(`/profilePage/${encodeURIComponent(username)}`);
        } 
        else {
          setFailed(true);
          setTimeout(() => {
            setFailed(false);
          }, 3000);
        }
        } 
        catch (error) {
        alert('There was an error. Please try again later.');
        }
      }
      else {
        setCheckUsername(true);
        setTimeout(() => {
          setCheckUsername(false);
        }, 3000);
      }
    }
    else {
      setCheckEmail(true);
      setTimeout(() => {
        setCheckEmail(false);
      }, 3000);
    }

}
catch (error) {
  alert('There was an error. Please try again later.');
}
};
  return (
    <div className="sign-up-group-container">
 {toastSuccess && (
       <Toast className='toast-bgsu'>
        <div>
            <HiCheck className='success-toastsu' />
        </div>
        <div className='toast-textsu'>Register Account Success!</div>
        <Toast.Toggle className='toast-closesu'/>
    </Toast>)}

    {toastFailed && (
       <Toast className='toast-bgsu'>
        <div>
            <HiX className='failed-toastsu' />
        </div>
        <div className='toast-textsu'>Failed To Register Account!Make Sure To Meet The Requirements</div>
        <Toast.Toggle className='toast-closesu'/>
    </Toast>)}

    {checkEmail && (
       <Toast className='toast-bgsu'>
        <div>
            <HiX className='failed-toastsu' />
        </div>
        <div className='toast-textsu'>Failed To Register Account!Email Already Exist</div>
        <Toast.Toggle className='toast-closesu'/>
    </Toast>)}

    {checkUsername && (
       <Toast className='toast-bgsu'>
        <div>
            <HiX className='failed-toastsu' />
        </div>
        <div className='toast-textsu'>Failed To Register Account!Username Already Exist</div>
        <Toast.Toggle className='toast-closesu'/>
    </Toast>)}

      <div className="sign-up-group-sign-up-group">
        <div className="sign-up-group-sign-up">
          <div className="sign-up-group-background-shadow">
            <div className="sign-up-group-background"></div>
            <span className="sign-up-group-text">
              <span>Sign Up</span>
            </span>
            <div className="sign-up-group-form">
              <input type='email' placeholder='E-Mail' className="sign-up-group-input" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                <input type='text' placeholder='Username' className="sign-up-group-input1" value={username} onChange={handleUsernameChange} required></input>
                {errorUsername && <h1 className='text-username'>*5 - 20 characters</h1>}
                
                <button type="button"  className='visibility' id='toggle-password' onClick={togglePasswordVisibility}>
    {passwordVisible ? "👁️‍🗨️" : "👁️‍🗨️"}
</button>
                <input type={passwordVisible ? "text" : "password"} placeholder='Password' className="sign-up-group-input2" onChange={handlePasswordChange} value={password}></input>
                
                {error && <h1 className='passwordcheck'>*Min 8 characters</h1>}

              <div className="sign-up-group-container4"></div>
              <button className="sign-up-group-button" onClick={handleSignUp}>
                <span className="sign-up-group-text08">
                  <span>Sign Up</span>
                </span>
              </button>
            </div>
            <span className="sign-up-group-text10">
              <span>Hello,</span>
              <br></br>
              <span>Nice to Meet You!</span>
              <h1 className='to-sign-in'>Already Have An Account?</h1>
              <Link to={`/signIn`} className='to-sign-in-link'>Sign In!</Link>
              
            </span>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpGroup
