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
                .max(50, 'Must be 50 chars or less')
                .required('This field is required')
            })}
            // POST to fake API
            onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    email: values.email
                })
            })
            .then(response => response.json())
            .then(json => {
                console.log(json); // verify json (email) in console
                const status = "200"; // in real situation, would check if (Response.status == "200")
                if (status === "200") {
                    //setSubmitting(true);  (this would be uncomment out in production)
                    setSubmitting(false); // this would be deleted in production
                    console.log("success");
                }
            }) 
            .catch(error => {
                console.error('Error:', error);
                setSubmitting(false);
            });
            resetForm();
            }}>
                
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