
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { signupRequest } from '../action/authAction';
// import './signup.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const SignupForm = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { message } = useSelector(state => state);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   const initialValues = {
//     userName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     mobileNo: '',
//     userRole: '',
//   };

//   const validationSchema = Yup.object({
//     userName: Yup.string().required('Full name is required'),
//     email: Yup.string().email('Invalid email format').required('Email is required').required('formattedErrors.email'),
//     password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//     confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
//     mobileNo: Yup.string().required('Mobile number is required'),
//     userRole: Yup.string().required('Role is required'),
//   });

//   const handleSignupSubmit = async (values, { setSubmitting, setErrors }) => {
//     try {
//       await dispatch(signupRequest(values));
//     } catch (error) {
//       if (error.response && error.response.data) {
//         const errorData = error.response.data;
//         const formattedErrors = {};

//         errorData.error.errorList.forEach(err => {
//           if (err.includes(' email')) {
//             formattedErrors.email = 'Email already in use';
//           }
//           if (err.includes('userName')) {
//             formattedErrors.userName = 'Username already in use';
//           }
//           if (err.includes(' password')) {
//             formattedErrors.password = 'Password already in use';
//           }
//         });

//         setErrors(formattedErrors);
//         console.log(formattedErrors)
//       }
//     }
//     setSubmitting(false);
//   };

//   useEffect(() => {
//     if (message === 'User registered successfully!') {
//       navigate('/login');
//     }
//   }, [message, navigate]);

   
//   return (
//     <div id="signup-form" className="container mt-5">
//       {message && <p>{message}</p>}
//       <div className=" p-5">
//         <h2 className="text-center mb-3">SignUp Form</h2>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSignupSubmit}
//         >
//           {({ errors, touched }) => (
//             <Form>
//               <div className='row'>
//                 <div className="mb-3 col-md-6">
                  
//                 <Field
//                   type="text"
//                   name="userName"
//                   className={`form-control ${errors.userName && touched.userName ? 'is-invalid' : ''}`}
//                   placeholder="Enter your full name"
//                 />
//                 <ErrorMessage name="userName" component="div" className="text-danger errorring" />
//               </div>
//               <div className="mb-3 col-md-6">
//                 <Field
//                   type="email"
//                   name="email"
//                   className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
//                   placeholder="Enter your email"
//                 />
//                 <ErrorMessage name="email" component="div" className="text-danger errorring" />
//                 </div>
//               </div>
            
//               <div className="mb-3  col-sm-12">
//                 <div className="input-group">
//                   <Field
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     className={`form-control password-input ${errors.password && touched.password ? 'is-invalid' : ''}`}
//                     placeholder="Create password"
//                   />
//                   <span
//                     className="input-group-text toggle-password"
//                     onClick={togglePasswordVisibility}
//                   >
//                     <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
//                   </span>
//                 </div>
//                 <ErrorMessage name="password" component="div" className="text-danger errorring" />
//               </div>
//               <div className="mb-3 col-md-12">
//                 <div className="input-group">
//                   <Field
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     name="confirmPassword"
//                     className={`form-control password-input ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
//                     placeholder="Confirm password"
//                   />
//                   <span
//                     className="input-group-text toggle-password"
//                     onClick={toggleConfirmPasswordVisibility}
//                   >
//                     <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
//                   </span>
//                 </div>
//                 <ErrorMessage name="confirmPassword" component="div" className="text-danger errorring" />
//                 </div>
          
//               <div className='row'>
//               <div className="mb-3 col-md-6">
//                 <Field
//                   type="tel"
//                   name="mobileNo"
//                   className={`form-control ${errors.mobileNo && touched.mobileNo ? 'is-invalid' : ''}`}
//                   placeholder="Enter your Mobile"
//                 />
//                 <ErrorMessage name="mobileNo" component="div" className="text-danger errorring" />
//               </div>
//               <div className="mb-3 col-md-6">
//                 <Field
//                   as="select"
//                   name="userRole"
//                   className={`form-select ${errors.userRole && touched.userRole ? 'is-invalid' : ''}`}
//                 >
//                   <option value="">Select role</option>
//                   <option value="User">User</option>
//                   <option value="Admin">Admin</option>
//                 </Field>
//                 <ErrorMessage name="userRole" component="div" className="text-danger errorring" />
//                 </div>
//                 </div>
//               <button type="submit" className="btn createaccount btn-success w-100 mt-3">
//                 Create Account
//               </button>
//               <p className="text-center mt-3">
//                 Clicking <strong>Create Account</strong> means that you agree to
//                 our <a href="javascript:void(0)">terms of service</a>.
//                 <a href="/login" className="ms-4 mt-5">
//                   Already have an Account? Login
//                 </a>
//               </p>
//               <hr />
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;
// SignupForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { signupRequest } from '../action/authAction';
import { ReusableInput, RoleSelector } from '../components/resuableComponent/InputField'; // Updated import
import './signup.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message } = useSelector((state) => state);
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

        errorData.error.errorList.forEach((err) => {
          if (err.includes(' email')) {
            formattedErrors.email = 'Email already in use';
          }
          if (err.includes('userName')) {
            formattedErrors.userName = 'Username already in use';
          }
          if (err.includes(' password')) {
            formattedErrors.password = 'Password already in use';
          }
        });

        setErrors(formattedErrors);
      }
    }
    setSubmitting(false);
  };

  useEffect(() => {
    if (message === 'User registered successfully!') {
      navigate('/login');
    }
  }, [message, navigate]);

  return (
    <div id="signup-form" className="container mt-5">
      {message && <p>{message}</p>}
      <div className="p-5">
        <h2 className="text-center mb-3">SignUp Form</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignupSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="row">
                <div className="col-md-6">
                  <ReusableInput
                    type="text"
                    name="userName"
                    placeholder="Enter your full name"
                    showPassword={false}
                  />
                </div>
                <div className="col-md-6">
                  <ReusableInput
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    showPassword={false}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <ReusableInput
                    type="password"
                    name="password"
                    placeholder="Create password"
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                  />
                </div>
                <div className="col-md-12">
                  <ReusableInput
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    showPassword={showConfirmPassword}
                    togglePasswordVisibility={toggleConfirmPasswordVisibility}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <ReusableInput
                    type="tel"
                    name="mobileNo"
                    placeholder="Enter your mobile number"
                    showPassword={false}
                  />
                </div>
                <div className="col-md-6">
                  <RoleSelector
                    name="userRole"
                    error={errors.userRole}
                    touched={touched.userRole}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-success w-100 mt-3">
                Create Account
              </button>
              <p className="text-center mt-3">
                Clicking <strong>Create Account</strong> means that you agree to our <a href="#">terms of service</a>.
                <a href="/login" className="ms-4">Already have an Account? Login</a>
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

