import React from 'react';
import { CouponColumn } from './Styles';
import SubscriptionForm from './components/form/form';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard'; // copy text to clipboard (could also use navigator.clipboard, but this is not supported across all browsers)
import data from './data.json'; // placeholder json data for testing

const couponDetails = data.merchant;

// modal component (modal does not show by default)
class App extends React.Component {
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
  onCopy = () => {
    this.setState({copied: true});
  };

  // Button to open modal (landing page) & Modal w/ 2 columns
  render() {
    return (
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
                  <SubscriptionForm></SubscriptionForm>
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
