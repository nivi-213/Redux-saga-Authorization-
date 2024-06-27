import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordField = ({ name, showPassword, togglePasswordVisibility, errors, touched }) => (
  <div className="mb-3">
    <div className="input-group">
      <Field
        type={showPassword ? 'text' : 'password'}
        name={name}
        className={`form-control password-input ${errors[name] && touched[name] ? 'is-invalid' : ''}`}
        placeholder={`Enter ${name}`}
      />
      <span className="input-group-text toggle-password" onClick={togglePasswordVisibility}>
        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
      </span>
    </div>
    <ErrorMessage name={name} component="div" className="text-danger errorring" />
  </div>
);

export default PasswordField;
