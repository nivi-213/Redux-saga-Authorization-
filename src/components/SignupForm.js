
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
        console.log(formattedErrors)
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
            
              <div className="mb-3  col-sm-12">
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
                <a href="/login" className="ms-4 mt-5">
                  Already have an Account? Login
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
// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import { Link } from '@mui/material';  // Correct import for Link
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// // TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();

// export default function SignUp() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign up
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   autoComplete="given-name"
//                   name="firstName"
//                   required
//                   fullWidth
//                   id="firstName"
//                   label="First Name"
//                   autoFocus
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="lastName"
//                   label="Last Name"
//                   name="lastName"
//                   autoComplete="family-name"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={<Checkbox value="allowExtraEmails" color="primary" />}
//                   label="I want to receive inspiration, marketing promotions and updates via email."
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign Up
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   Already have an account? Sign in
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 5 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }
