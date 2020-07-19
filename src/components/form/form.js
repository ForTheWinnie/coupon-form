import React from 'react';
import { Form, useField, Formik } from 'formik'; // used Formik for its lightweight & scalability
import { FormColumn } from '../../Styles';
import * as Yup from 'yup'; // used Yup for validation

// elements for email input field
const EmailInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
  
    // return label & input field; display error if there's an error
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
        <FormColumn>
            <Formik initialValues={{email:''}} validationSchema={Yup.object({
            email: Yup.string()
                .email('Email format should be abc@domain.com')
                .max(20, 'Must be 20 chars or less')
                .required('This field is required')
            })}
            // POST to fake API
            onSubmit={(values, { setSubmitting, resetForm }) => {
                fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        email: values.email
                    }), 
                    retries: 2,  // retry upon failure up to 2 times
                    retryDelay: 10000 // throttle each retry (1sec)
                })
                .then(response => response.json())
                .then(json => {
                    console.log(json); // verify json (email) in console
                    // in real situation, would check if (Response.status == "200")
                    const status = "200"; 
                    if (status === "200") {
                        setSubmitting(false); // this would be deleted in production
                        console.log("success");
                    }
                }) 
                .catch(error => {
                    console.error('Error:', error);
                    setSubmitting(false);
                })
                .finally(() => {
                    resetForm();
                });
            }}>
                
            {props => (
                <Form className="newsletterForm">
                <EmailInput label="Email" name="email" type="email" placeholder="abc@email.com" data-testid="test-input"></EmailInput>
                <button type="submit" data-testid="test-button">{props.isSubmitting ? 'Joining...' : 'Join the Movement'}</button>
                <p className="footnote">We won't spam you. Unsubscribe at anytime.</p>
                </Form>
            )}
            </Formik>
        </FormColumn>
    )
}

export default SubscriptionForm;