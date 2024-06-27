import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import '../signup.css';

const FormWrapper = ({ initialValues, validationSchema, onSubmit, children }) => (
  <div id="signup-form" className="container mt-5">
    <div className="p-5">
      {/* <h2 className="text-center mb-3">SignUp Form</h2> */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            {children(errors, touched)}
          </Form>
        )}
      </Formik>
    </div>
  </div>
);

export default FormWrapper;
