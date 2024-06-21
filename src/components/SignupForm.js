import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../action/authAction';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './signup.css';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const registering = useSelector((state) => state.auth.registering);
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: '',
    userName: '',
    email: '',
    mobileNo: '',
    password: '',
    confirmPassword: '',
    userRole: '', // Defaulting to 'User'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await dispatch(registerRequest(formData));
      if (success) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle error as needed (dispatch error action, show error message, etc.)
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNo" className="form-label">
            Mobile Number:
          </label>
          <input
            type="text"
            className="form-control"
            id="mobileNo"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userRole" className="form-label">
            User Role:
          </label>
          <select
            className="form-select"
            id="userRole"
            name="userRole"
            value={formData.userRole}
            onChange={handleChange}
            required
          >
            <option value="">Select role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        {registering && <p>Registering...</p>}
        {error && error.errorList && (
          <div className="alert alert-danger">
            {error.errorList.map((errorMessage, index) => (
              <p key={index}>{errorMessage}</p>
            ))}
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
