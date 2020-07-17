import React from 'react';
import { Form, useField, Formik } from 'formik'; // used Formik for its lightweight & scalability
import { FormColumn } from '../../Styles';
import * as Yup from 'yup'; // used Yup for validation

// for email input field
const EmailInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
  
    // return component & display error if there's an error
    return(
      <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} /> 
      
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ):null}
      </>
    )
  }

function SubscriptionForm () {
    return (
        <FormColumn data-testid="EmailInput">
                  <Formik initialValues={{email:''}} validationSchema={Yup.object({
                    email: Yup.string()
                      .email('Email format should be abc@domain.com')
                      .max(50, 'Must be 50 chars or less')
                      .required('This field is required')
                  })}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 1));
                      resetForm();
                      setSubmitting(false);
                    }, 1000);
                  }}
                  >
                    {props => (
                      <Form className="newsletterForm">
                        <EmailInput label="Email" name="email" type="email" placeholder="abc@email.com" data-testid="test-input"></EmailInput>
                        <button type="submit">{props.isSubmitting ? 'Joining...' : 'Join the Movement'}</button>
                        <p className="footnote">We won't spam you. Unsubscribe at anytime.</p>
                      </Form>
                    )}
                  </Formik>
                </FormColumn>
    )
}

export default SubscriptionForm;