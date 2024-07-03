// // ReusableInput.js
// import React from 'react';
// import { Field, ErrorMessage } from 'formik';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// const ReusableInput = ({ type, name, placeholder, showPassword, togglePasswordVisibility }) => (
//   <div className="mb-3">
//     {type === 'password' ? (
//       <div className="input-group">
//         <Field
//           type={showPassword ? 'text' : 'password'}
//           name={name}
//           className="form-control password-input"
//           placeholder={placeholder}
//         />
//         <span className="input-group-text toggle-password" onClick={togglePasswordVisibility}>
//           <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
//         </span>
//       </div>
//     ) : (
//       <Field
//         type={type}
//         name={name}
//         className="form-control"
//         placeholder={placeholder}
//       />
//     )}
//     <ErrorMessage name={name} component="div" className="text-danger" />
//   </div>
// );

// const RoleSelector = ({ name, error, touched }) => (
//   <div className="mb-3 ">
//     <Field
//       as="select"
//       name={name}
//       className={`form-select ${error && touched ? 'is-invalid' : ''}`}
//     >
//       <option value="">Select role</option>
//       <option value="User">User</option>
//       <option value="Admin">Admin</option>
//     </Field>
//     <ErrorMessage name={name} component="div" className="text-danger" />
//   </div>
// );

// export { ReusableInput, RoleSelector };
import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ReusableInput = ({ type, name, placeholder, showPassword, togglePasswordVisibility,error, touched }) => (
  <div className="">
    {type === 'password' ? (
      <div className="input-group">
        <Field
          type={showPassword ? 'text' : 'password'}
          name={name}
          className={` form-control ${error && touched ? 'is-invalid' : ''}`}

          placeholder={placeholder}
        />
        <span className="input-group-text toggle-password" onClick={togglePasswordVisibility}>
          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </span>
      </div>
    ) : (
      <Field
        type={type}
        name={name}
     
          placeholder={placeholder}
          className={` form-control ${error && touched ? 'is-invalid' : ''}`}
      />
    )}
    <ErrorMessage name={name} component="div" className="text-danger" />
  </div>
);

const RoleSelector = ({ name, error, touched }) => (
  <div className="">
    <Field
      as="select"
      name={name}
      className={`form-select  ${error && touched ? 'is-invalid' : '' }`}
    >
      <option value="">Select role</option>
      <option value="User">User</option>
      <option value="Admin">Admin</option>
    </Field>
    <ErrorMessage name={name} component="div" className="text-danger" />
  </div>
);

// const GenderSelector = ({ name, error, touched }) => (
//   <div className="">
//     <Field
//       as="select"
//       name={name}
//       className={`form-select ${error && touched ? 'is-invalid' : ''}`}
//     >
//       <option value="">Select gender</option>
//       <option value="Male">Male</option>
//       <option value="Female">Female</option>
//       <option value="Other">Other</option>
//     </Field>
//     <ErrorMessage name={name} component="div" className="text-danger" />
//   </div>
// );

export { ReusableInput, RoleSelector };
