// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerRequest } from "../action/authAction";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
// import "./signup.css";
// import { useNavigate } from "react-router-dom";

// const RegisterForm = () => {
//   const dispatch = useDispatch();
//   const registering = useSelector((state) => state.auth.registering);
//   const error = useSelector((state) => state.auth.error);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     userName: "",
//     email: "",
//     mobileNo: "",
//     password: "",
//     confirmPassword: "",
//     userRole: "", // Default to empty string
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { userName, email, mobileNo, password, confirmPassword, userRole } = formData;

//     try {
//       const response = await dispatch(registerRequest(formData));

//       // Check if response contains data and token
//       if (response.data && response.data.token) {
//         // Store token in localStorage
//         localStorage.setItem("token", response.data.token);
//         navigate("/login");
    
//         console.log(response.data.message);

       
       

//         // Reset form fields (optional)
//         setFormData({
//           userName: "",
//           email: "",
//           mobileNo: "",
//           password: "",
//           confirmPassword: "",
//           userRole: "", // Reset to empty string
//         });
//       } else {
//         console.error("Invalid response from server:", response);
//         // Handle case where response data or token is missing
//         // Optionally set an error message or handle differently
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       // Handle specific errors from the backend
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.error &&
//         error.response.data.error.errorList
//       ) {
//         dispatch({
//           type: "REGISTER_FAILURE",
//           error: error.response.data.error,
//         });
//       } else {
//         // Handle other types of errors (network, server, etc.)
//         // Optionally, set an error message to display in the UI
//       }
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label htmlFor="userName" className="form-label">
//               Username:
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="userName"
//               name="userName"
//               value={formData.userName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="email" className="form-label">
//               Email:
//             </label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label htmlFor="mobileNo" className="form-label">
//               Mobile Number:
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="mobileNo"
//               name="mobileNo"
//               value={formData.mobileNo}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="password" className="form-label">
//               Password:
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label htmlFor="confirmPassword" className="form-label">
//               Confirm Password:
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="userRole" className="form-label">
//               User Role:
//             </label>
//             <select
//               className="form-select"
//               id="userRole"
//               name="userRole"
//               value={formData.userRole}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select role</option>
//               <option value="User">User</option>
//               <option value="Admin">Admin</option>
//             </select>
//           </div>
//         </div>
//         {registering && <p>Registering...</p>}
//         {error && error.errorList && (
//           <div className="alert alert-danger">
//             <ul>
//               {error.errorList.map((errorMessage, index) => (
//                 <li key={index}>{errorMessage}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//         <button type="submit" className="btn btn-primary">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupRequest } from '../action/authAction'; // Assuming this action handles signup request and token storage

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, message, errors: serverErrors } = useSelector(state => state.signup);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [userRole, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState([]); // State to store server errors

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateMobileNo = (mobileNo) => {
    return /^\d{10}$/.test(mobileNo);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    let hasErrors = false;
    let errors = {};

    if (!userName.trim()) {
      errors.userName = "Please enter your full name.";
      hasErrors = true;
    }

    if (!email.trim()) {
      errors.email = "Please enter your email address.";
      hasErrors = true;
    } else if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address.";
      hasErrors = true;
    }

    if (!password.trim()) {
      errors.password = "Please enter your password.";
      hasErrors = true;
    } else if (!validatePassword(password)) {
      errors.password = "Password must be at least 8 characters long.";
      hasErrors = true;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
      hasErrors = true;
    }

    if (!mobileNo.trim()) {
      errors.mobileNo = "Please enter your mobile number.";
      hasErrors = true;
    } else if (!validateMobileNo(mobileNo)) {
      errors.mobileNo = "Please enter a valid 10-digit mobile number.";
      hasErrors = true;
    }

    if (!userRole.trim()) {
      errors.userRole = "Please select a role.";
      hasErrors = true;
    }

    setFormErrors(errors);

    if (hasErrors) {
      return;
    }

    const userData = {
      userName,
      email,
      confirmPassword,
      password,
      mobileNo,
      userRole,
    };

    try {
      const response = await dispatch(signupRequest(userData));
      navigate('/login');
    } catch (error) {
      // Assuming error.response.data contains the error list
      if (error.response && error.response.data && error.response.data.errorList) {
        setSignupErrors(error.response.data.errorList);
      } else {
        setSignupErrors(['Signup failed. Please try again later.']);
      }
      console.error('Signup failed:', error);
    }
  };

  return (
    <>
      <div id="signup-form" className="container mt-5">
        {message && <p>{message}</p>}
        <div className="card p-5">
          <h2 className="text-center mb-3">SignUp Form</h2>
          {signupErrors.length > 0 && (
            <div className="alert alert-danger">
              {signupErrors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
          <form onSubmit={handleSignupSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              {formErrors.userName && (
                <div className="text-danger">{formErrors.userName}</div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {formErrors.email && (
                <div className="text-danger">{formErrors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control password-input"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="input-group-text toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
              {formErrors.password && (
                <div className="text-danger">{formErrors.password}</div>
              )}
            </div>
            <div className="mb-3">
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control password-input"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="input-group-text toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
              {formErrors.confirmPassword && (
                <div className="text-danger">{formErrors.confirmPassword}</div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="tel"
                className="form-control"
                placeholder="Enter your Mobile"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
              {formErrors.mobileNo && (
                <div className="text-danger">{formErrors.mobileNo}</div>
              )}
            </div>
            <div>
              <select
                value={userRole}
                onChange={(e) => setRole(e.target.value)}
                required
                className="form-select"
              >
                <option value="">Select role</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
              {formErrors.userRole && (
                <div className="text-danger">{formErrors.userRole}</div>
              )}
            </div>
            <button type="submit" className="btn btn-success w-100 mt-3" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
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
