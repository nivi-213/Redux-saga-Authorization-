
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { signupRequest } from '../action/authAction';
import './signup.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message } = useSelector(state => state);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const initialValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNo: '',
    userRole: '',
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    mobileNo: Yup.string().required('Mobile number is required'),
    userRole: Yup.string().required('Role is required'),
  });

  const handleSignupSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(signupRequest(values));
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        const formattedErrors = {};

        errorData.error.errorList.forEach(err => {
          if (err.includes('user email')) {
            formattedErrors.email = 'Email already in use';
          }
          if (err.includes('user name')) {
            formattedErrors.userName = 'Username already in use';
          }
          if (err.includes('user password')) {
            formattedErrors.password = 'Password already in use';
          }
        });

        setErrors(formattedErrors);
      }
    }
    setSubmitting(true);
  };

  useEffect(() => {
    if (message === 'User registered successfully!') {
      navigate('/login');
    }
  }, [message, navigate]);

  return (
    <div id="signup-form" className="container mt-5">
      {message && <p>{message}</p>}
      <div className=" p-5">
        <h2 className="text-center mb-3">SignUp Form</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignupSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className='row'>
              <div className="mb-3 col-md-6">
                <Field
                  type="text"
                  name="userName"
                  className={`form-control ${errors.userName && touched.userName ? 'is-invalid' : ''}`}
                  placeholder="Enter your full name"
                />
                <ErrorMessage name="userName" component="div" className="text-danger errorring" />
              </div>
              <div className="mb-3 col-md-6">
                <Field
                  type="email"
                  name="email"
                  className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-danger errorring" />
                </div>
              </div>
            
              <div className="mb-3 col-md-12">
                <div className="input-group">
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className={`form-control password-input ${errors.password && touched.password ? 'is-invalid' : ''}`}
                    placeholder="Create password"
                  />
                  <span
                    className="input-group-text toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </span>
                </div>
                <ErrorMessage name="password" component="div" className="text-danger errorring" />
              </div>
              <div className="mb-3 col-md-12">
                <div className="input-group">
                  <Field
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    className={`form-control password-input ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
                    placeholder="Confirm password"
                  />
                  <span
                    className="input-group-text toggle-password"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                  </span>
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="text-danger errorring" />
                </div>
          
              <div className='row'>
              <div className="mb-3 col-md-6">
                <Field
                  type="tel"
                  name="mobileNo"
                  className={`form-control ${errors.mobileNo && touched.mobileNo ? 'is-invalid' : ''}`}
                  placeholder="Enter your Mobile"
                />
                <ErrorMessage name="mobileNo" component="div" className="text-danger errorring" />
              </div>
              <div className="mb-3 col-md-6">
                <Field
                  as="select"
                  name="userRole"
                  className={`form-select ${errors.userRole && touched.userRole ? 'is-invalid' : ''}`}
                >
                  <option value="">Select role</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </Field>
                <ErrorMessage name="userRole" component="div" className="text-danger errorring" />
                </div>
                </div>
              <button type="submit" className="btn createaccount btn-success w-100 mt-3">
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;
// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const LoginPage = () => {
//   return (
//     <div className="login-page ">
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-9 offset-lg-1">
//             <h3 className="mb-3">Login Now</h3>
//             <div className="bg-white shadow rounded">
//               <div className="row">
//                 <div className="col-md-7 pe-0">
//                   <div className="form-left h-100 py-5 px-5">
//                     <form action="" className="row g-4">
//                       <div className="col-12">
//                         <label>Username<span className="text-danger">*</span></label>
//                         <div className="input-group">
//                           <div className="input-group-text">
//                             <i className="bi bi-person-fill"></i>
//                           </div>
//                           <input type="text" className="form-control" placeholder="Enter Username" />
//                         </div>
//                       </div>
//                       <div className="col-12">
//                         <label>Password<span className="text-danger">*</span></label>
//                         <div className="input-group">
//                           <div className="input-group-text">
//                             <i className="bi bi-lock-fill"></i>
//                           </div>
//                           <input type="password" className="form-control" placeholder="Enter Password" />
//                         </div>
//                       </div>
//                       <div className="col-sm-6">
//                         <div className="form-check">
//                           <input className="form-check-input" type="checkbox" id="inlineFormCheck" />
//                           <label className="form-check-label" htmlFor="inlineFormCheck">
//                             Remember me
//                           </label>
//                         </div>
//                       </div>
//                       <div className="col-sm-6">
//                         <a href="#" className="float-end text-primary">
//                           Forgot Password?
//                         </a>
//                       </div>
//                       <div className="col-12">
//                         <button type="submit" className="btn btn-primary px-4 float-end mt-4">
//                           login
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//                 <div className="col-md-5 ps-0 d-none d-md-block">
//                   <div className="form-right h-100 bg-primary text-white text-center pt-5">
//                     <i className="bi bi-bootstrap"></i>
//                     <h2 className="fs-1">Welcome Back!!!</h2>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <p className="text-end text-secondary mt-3">Bootstrap 5 Login Page Design</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
