// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// // import "./login.css";

// const LoginForm = () => {
//   const [fullName, setFullname] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/auth/user/login",
//         {
//           userName: fullName,
//           password: password,
//         }
//       );

//       console.log(response.data);

//       const responseBody = response.data.data.body;

//       if (responseBody && responseBody.jwt) {
//         localStorage.setItem("token", responseBody.jwt);
//         localStorage.setItem("username", responseBody.userName);

//         // Determine user role and navigate accordingly
//         if (responseBody.role === "USER") {
//           navigate("/usertable");
//         } else if (responseBody.role === "ADMIN") {
//           navigate("/admintable");
//         } else {
//           setMessage("Unexpected user role");
//           console.error("Unexpected user role", responseBody.role);
//         }
//       } else {
//         setMessage("User is not Found");
//         console.error("Unexpected response structure", response.data);
//       }
//     } catch (error) {
//       setMessage("Error logging in");
//       console.error("There was an error!", error);
//     }
//   };

//   return (
//     <div id="login-form" className="container">
//       <div className="card carding p-5">
//         <h1>Login</h1>
//         <form onSubmit={handleLoginSubmit} className="">
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter email or username"
//               value={fullName}
//               onChange={(e) => setFullname(e.target.value)}
//             />
//           </div>
//           <div className="mb-3 password-field">
//             <input
//               type={passwordVisible ? "text" : "password"}
//               className="form-control"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <span
//               className="password-toggle-icon"
//               onClick={() => setPasswordVisible(!passwordVisible)}
//             >
//               {passwordVisible ?"👁️": "🙈"  }
//             </span>
//           </div>
//           <button type="submit" className="btn btn-success w-100">
//             Login
//           </button>
//           <p className="text-center mt-3">
//             <a href="javascript:void(0)" className="text-decoration-none">
//               Forgotten account
//             </a>
//             <a href="/signup" className=" ms-4">
//               Signup
//             </a>
//           </p>
//           <hr />
//           {message && <p className="text-danger">{message}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
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
