import React from 'react';
import { Field, ErrorMessage } from 'formik';
import '../signup.css';
const InputField = ({ name, type, placeholder, errors, touched }) => (
  <div className="mb-3">
    <Field
      type={type}
      name={name}
      className={`form-control ${errors[name] && touched[name] ? 'is-invalid' : ''}`}
      placeholder={placeholder}
    />
    <ErrorMessage name={name} component="div" className="text-danger errorring" />
  </div>
);

export default InputField;
