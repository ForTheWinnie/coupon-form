import React from 'react';
import ReactDOM from 'react-dom';
import SubscriptionForm from './../form';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';

// unmount or cleanup after every test
afterEach(cleanup); 

// unit test to verify form renders
it("component renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SubscriptionForm></SubscriptionForm>, div);
});

it("form renders correctly from React Testing Library", () => {
    render(<SubscriptionForm></SubscriptionForm>);
});

// verify correct email value/format
it('correct email value submitted', async () => {
    const handleChange = jest.fn();
    const {getByTestId} = render(<SubscriptionForm handleChange={handleChange}/>);
    const input = getByTestId('test-input');
  
    fireEvent.change(input, { target: { value: 'test@domain.com' } }); 
     
    // wrap expect in await to wait for .change
    await wait(() => expect(input).toHaveAttribute('value', 'test@domain.com'));
});