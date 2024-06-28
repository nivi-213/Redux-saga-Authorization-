
// src/components/LoginForm.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation schema
import { loginRequest } from '../../action/authAction';
import './Login.css'; // Import your custom CSS file

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user } = useSelector((state) => state);

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Full name or email is required'),
      password: Yup.string()
        .required('Password is required'),
    }),
    onSubmit: values => {
      dispatch(loginRequest(values));
    },
  });

  // Redirect if user is logged in
  if (user) {
    if (user.role === 'USER') {
      navigate('/usertable');
    } else if (user.role === 'ADMIN') {
      navigate('/admintable');
    }
  }

  return (
    <div id="login-form" className="container">
      <div className="card carding p-5">
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit} className="">
          <div className="mb-3">
            <input
              type="text"
              className="form-control logininput"
              placeholder="Enter email or username"
              id="email"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-3 password-field">
            <input
              type={formik.values.passwordVisible ? 'text' : 'password'}
              className="form-control logininput"
              placeholder="Enter password"
              id="password"
              {...formik.getFieldProps('password')}
            />
            <span
              className="password-toggle-icon"
              onClick={() => formik.setFieldValue('passwordVisible', !formik.values.passwordVisible)}
            >
              {formik.values.passwordVisible ? '👁️' : '🙈'}
            </span>
          </div>
          <button type="submit" className="btn btn-success loginaccount">
            Login
          </button>
          <p className="text-center mt-3">
            <a href="javascript:void(0)" className="text-decoration-none  me-4">
              Forgotten account
            </a>
            <a href="/signup" className="ms-4">
              Signup
            </a>
          </p>
          <hr />
          {error && <p className="text-danger errorring">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
