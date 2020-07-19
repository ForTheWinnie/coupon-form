import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

// unmount or cleanup after every test
afterEach(cleanup); 

// unit tests to verify landing page renders correctly
describe('testing subscription form', () => {
  it('App renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  });

  it('renders correctly via RTL, button label exists, modal does not show by default', () => {
    render(<App />);
    const modalContent = screen.queryByText('Love Shopping Kind?');
    screen.debug(); // verify output of App component in terminal
    screen.getByText('See Coupon Details!');
    
    // verify that button text appears & modal is not shown by default
    expect(modalContent).not.toBeInTheDocument();
    expect(screen.getByText('See Coupon Details!')).toBeInTheDocument();
  });
});

it('after button clicked on landing page, content in subscription form pane & merchant data appears', () => {
  const wrapper = mount(<App />);
  wrapper.find('button').simulate('click');
  const modalContent = screen.getByText('Love Shopping Kind?');
  expect(modalContent).toBeInTheDocument();

  const merchantContent = screen.queryAllByText('DubK', {exact: false});
  expect(merchantContent).not.toBeNull();
});