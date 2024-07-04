import React, { useState, useContext, useEffect } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Contexts';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    setIsFormValid(
      userNameError === '' &&
      emailError === '' &&
      phoneError === '' &&
      passwordError === '' &&
      userName !== '' &&
      email !== '' &&
      phone !== '' &&
      password !== ''
    );
  }, [userNameError, emailError, phoneError, passwordError, userName, email, phone, password]);

  const validateUsername = (userName) => {
    if (userName.length < 3) {
      setUserNameError('Username must be at least 3 characters long.');
    } else {
      setUserNameError('');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email.');
    } else {
      setEmailError('');
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError('Please enter a valid phone number.');
    } else {
      setPhoneError('');
    }
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }
  };

  const handleUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
    validateUsername(value);
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePhone = (e) => {
    const value = e.target.value;
    setPhone(value);
    validatePhone(value);
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
      res.user.updateProfile({ displayName: userName }).then(() => {
        firebase.firestore().collection('Users').add({
          id: res.user.uid,
          username: userName,
          phone: phone,
        }).then(() => {
          navigate('/login');
        });
      });
    }).catch((error) => {
      console.error("Error creating user: ", error);
    });
  };

  return (
    <div className="signupContainer">
      <div className="signupParentDiv">
        <img width="200px" height="130px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="username"
            value={userName}
            onChange={handleUsername}
            name="username"
            placeholder="Enter your username"
          />
          {userNameError && <span className="error">{userNameError}</span>}
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={handleEmail}
            name="email"
            placeholder="Enter your email"
          />
          {emailError && <span className="error">{emailError}</span>}
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="tel"
            id="phone"
            value={phone}
            onChange={handlePhone}
            name="phone"
            placeholder="Enter your phone number"
          />
          {phoneError && <span className="error">{phoneError}</span>}
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
            name="password"
            placeholder="Enter your password"
          />
          {passwordError && <span className="error">{passwordError}</span>}
          <br />
          <button type="submit" className="signupButton" disabled={!isFormValid}>Signup</button>
        </form>
        <a href="/login" className="loginLink">Login</a>
      </div>
    </div>
  );
}
