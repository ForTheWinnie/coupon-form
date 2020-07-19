import React from 'react';
import ReactDOM from 'react-dom';
import SubscriptionForm from './../form';
import { render, fireEvent, wait, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

// unmount or cleanup after every test
afterEach(cleanup); 

// unit tests to verify form renders
describe('testing subscription form', () => {
    it("form component renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<SubscriptionForm></SubscriptionForm>, div);
    });

    it("form renders correctly via React Testing Library", () => {
        render(<SubscriptionForm></SubscriptionForm>);
    });
});

// unit tests for form validation
describe('testing subscription form validation', () => {
    it('correct email value submitted', async () => {
        const handleChange = jest.fn();
        const {getByTestId} = render(<SubscriptionForm handleChange={handleChange}/>);
        const input = getByTestId('test-input');
        const button = screen.getByTestId('test-button');

        fireEvent.change(input, { target: { value: 'test@domain.com' } });
        fireEvent.click(button);
        await wait(() => expect(input).toHaveAttribute('value', 'test@domain.com'));
        expect(screen.getByText('Joining...')).toBeInTheDocument()
    });
    
    it('form not submitted if email field is empty', async () => {
        const {getByTestId} = render(<SubscriptionForm />);
        const button = screen.getByTestId('test-button');
    
        fireEvent.click(button);
        await wait(() => expect(screen.getByText('Join the Movement')).toBeInTheDocument());
    });

    it('form not submitted if email format is not valid', async () => {
        const handleChange = jest.fn();
        const {getByTestId} = render(<SubscriptionForm handleChange={handleChange}/>);
        const input = getByTestId('test-input');
      
        fireEvent.change(input, { target: { value: 'testInvalidEmail' } }); 
        await wait(() => expect(screen.getByText('Join the', { exact: false })).toBeInTheDocument());
    });
    
    it('error (This field is required) appears if email is blank', async () => {
        const handleChange = jest.fn();
        const {getByTestId} = render(<SubscriptionForm handleChange={handleChange}/>);
        const input = screen.getByTestId('test-input');
        const button = screen.getByTestId('test-button');
        
        fireEvent.change(input, { target: { value: '' } }); 
        fireEvent.click(button);
        await wait(() => {
            const requiredText = screen.getByText('This field is required');
            expect(requiredText).toBeInTheDocument();
        });
    });
    
    it('error appears if email format invalid', async () => {
        const handleChange = jest.fn();
        const {getByTestId} = render(<SubscriptionForm handleChange={handleChange}/>);
        const input = screen.getByTestId('test-input');
        const button = screen.getByTestId('test-button');
        
        fireEvent.change(input, { target: { value: 'testInvalidEmail' } }); 
        fireEvent.click(button);
        await wait(() => {
            const confirmationText = screen.getByText('Email format should be abc@domain.com');
            expect(confirmationText).toBeInTheDocument();
        });
    });
    
    it('error appears if 21+ characters entered in email input', async () => {
        const handleChange = jest.fn();
        const {getByTestId} = render(<SubscriptionForm handleChange={handleChange}/>);
        const input = screen.getByTestId('test-input');
        const button = screen.getByTestId('test-button');
        
        fireEvent.change(input, { target: { value: '1234567890123@email.com' } }); 
        fireEvent.click(button);
        await wait(() => {
            const charCountText = screen.getByText('Must be 20 chars or less');
            expect(charCountText).toBeInTheDocument();
        });
    });
});