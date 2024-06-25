import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './signup.css'; // Assuming you have custom CSS for additional styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { signupRequest,  } from '../action/authAction';

const SignupForm = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [userRole, setRole] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { message, errors } = useSelector((state) => state);
  const [showPassword, setShowPassword] = useState(false);

 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUserNameChange = (value) => {
    setUserName(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  };

  const handleMobileNoChange = (value) => {
    setMobileNo(value);
  };

  const handleRoleChange = (value) => {
    setRole(value);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const userData = {
      userName,
      email,
      password,
      mobileNo,
      userRole,
      confirmPassword,
    };

    dispatch(signupRequest(userData));
  };

  useEffect(() => {
    if (message === 'User registered successfully!') {
      navigate('/login');
    }
  }, [message, navigate]);

  return (
    <>
      <div id="signup-form" className="container mt-5">
        {message && <p>{message}</p>}
        <div className="card p-5">
          <h2 className="text-center mb-3">SignUp Form</h2>
          <form onSubmit={handleSignupSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                value={userName}
                onChange={(e) => handleUserNameChange(e.target.value)}
              />
              {errors.userName && (
                <div className="text-danger">{errors.userName}</div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control password-input"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                />
                <span
                  className="input-group-text toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </div>
            <div className="mb-3">
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control password-input"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                />
                <span
                  className="input-group-text toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
              {errors.confirmPassword && (
                <div className="text-danger">{errors.confirmPassword}</div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="tel"
                className="form-control"
                placeholder="Enter your Mobile"
                value={mobileNo}
                onChange={(e) => handleMobileNoChange(e.target.value)}
              />
              {errors.mobileNo && (
                <div className="text-danger">{errors.mobileNo}</div>
              )}
            </div>
            <div>
              <select
                value={userRole}
                onChange={(e) => handleRoleChange(e.target.value)}
                required
                className="form-select"
              >
                <option value="">Select role</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
              {errors.userRole && (
                <div className="text-danger">{errors.userRole}</div>
              )}
            </div>
            <button type="submit" className="btn btn-success w-100 mt-3">
              Create Account
            </button>
            <p className="text-center mt-3">
              Clicking <strong>Create Account</strong> means that you agree to
              our <a href="javascript:void(0)">terms of service</a>.
              <a href="/login" className="ms-4">
                Login
              </a>
            </p>
            <hr />
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
