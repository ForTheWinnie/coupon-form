import { Formik, useField, Form } from 'formik'; // used Formik for its lightweight & scalability
import React from 'react';
import { CouponColumn, FormColumn } from './Styles';
import * as Yup from 'yup'; // used Yup for validation
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard'; // copy text to clipboard (could also use navigator.clipboard, but this is not supported across all browsers)
import data from './data.json'; // placeholder json data for testing
//import logo from './logo.svg';
// import './App.css';

const couponDetails = data.merchant;

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

// modal component
class App extends React.Component {
  // modal does not show by default 
  constructor () {
    super()
    this.state={ show:false }
  }
  handleModal() {
    this.setState({show:!this.state.show})
  }

  // click-to-copy functionality
  state = {value: '', copied: false};
  onChange = ({target: {value}}) => {
    this.setState({value, copied: false});
  };
  // onClick = ({target: {button}}) => {
  //   console.log(`Clicked on "${button}"!`); // eslint-disable-line
  // };
  onCopy = () => {
    this.setState({copied: true});
  };

  render() {
    return (
      // Button to open modal, Modal, Subscription form !!!!!!!!===============
      <div>
        <Button onClick={()=>{this.handleModal()}}>See Coupon Details!</Button>
      
        

        <Modal show={this.state.show} onHide={()=>{this.handleModal()}}>
          <Modal.Header closeButton><h1>Thank you for making a difference!</h1></Modal.Header>
          <Modal.Body>
            <Container>
            <Row>
                { couponDetails.map((coupon) => { 
                  return (
                    <CouponColumn key={coupon.id}>
                      <Col md="auto">
                        <img src={coupon.logo} alt={coupon.alt} width="100"></img>
                        <h2>{coupon.couponStore}</h2>
                        <p>{coupon.couponDesc}</p>
                        <input type="text" value={coupon.couponCode} size={10} onChange={({target: {value}}) => this.setState({value, copied: false})} />

                        <CopyToClipboard text={coupon.couponCode} onCopy={() => this.setState({copied: true})}>
                          <button>{this.state.copied ? <span className="copied">Copied!</span> : <span>Copy</span>}</button>
                        </CopyToClipboard>
                        
                        <p>Expires: {coupon.couponExpDate}</p>
                      </Col>
                    </CouponColumn>
                  )
                }) }
    
              
              <Col md={true} className="colForm">
                <img src="./img/email-100.png" alt="Bird holding envelope with a red heart in its beak"></img>
                <h2>Love Shopping Kind?</h2>
                <ul>
                  <li>Be the first to receive weekly offers</li>
                  <li>Keep making an impact to help other non-profits</li></ul>
                <FormColumn>
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
                        <EmailInput label="Email" name="email" type="email" placeholder="abc@email.com"></EmailInput>
                        <button type="submit">{props.isSubmitting ? 'Joining...' : 'Join the Movement'}</button>
                        <p className="footnote">We won't spam you. Unsubscribe at anytime.</p>
                      </Form>
                    )}
                  </Formik>
                </FormColumn>
                
              </Col>
            </Row>
            </Container>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


export default App;
