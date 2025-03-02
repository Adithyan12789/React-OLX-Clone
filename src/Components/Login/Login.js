import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../store/Contexts';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState(null); // State to handle Firebase errors

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    setIsFormValid(emailError === '' && passwordError === '' && email !== '' && password !== '');
  }, [emailError, passwordError, email, password]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        setError(error.message); // Update error state with Firebase error message
        console.error("Error logging in: ", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }
    handleLogin(e); // Call handleLogin to attempt login if form is valid
  };

  return (
    <div className="loginContainer">
      <div className="loginParentDiv">
        <img width="200px" height="130px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
          {emailError && <span className="error">{emailError}</span>}
          <label htmlFor="password">Password</label>
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
          {passwordError && <span className="error">{passwordError}</span>}
          {error && <span className="error">{error}</span>} {/* Display Firebase error message */}
          <button type="submit" className="loginButton" disabled={!isFormValid}>
            Login
          </button>
        </form>
        <a href="/signup" className="signupLink">Signup</a>
      </div>
    </div>
  );
}
