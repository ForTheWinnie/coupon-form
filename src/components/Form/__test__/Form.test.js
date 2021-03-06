import React from 'react';
import ReactDOM from 'react-dom';
import SubscriptionForm from './../Form';
import { render, fireEvent, wait, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup); 

describe('subscription form renders', () => {
    it("form component renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<SubscriptionForm></SubscriptionForm>, div);
    });

    it("form renders correctly via React Testing Library", () => {
        render(<SubscriptionForm></SubscriptionForm>);
    });
});

describe('testing subscription form validation', () => {
    let handleChange;
    let input;
    let button;

    // variables to run before each test
    beforeEach(() => {
        handleChange = jest.fn();
        let {getByTestId} = render(<SubscriptionForm handleChange={handleChange}/>); 
        input = screen.getByTestId('test-input');
        button = screen.getByTestId('test-button');
    });
    
    it('correct email value submitted', async () => {
        fireEvent.change(input, { target: { value: 'test@domain.com' } });
        fireEvent.click(button);
        await wait(() => expect(input).toHaveAttribute('value', 'test@domain.com'));
        expect(screen.getByText('Joining...')).toBeInTheDocument();
    });
    
    it('form not submitted if email field is empty', async () => {
        fireEvent.click(button);
        await wait(() => expect(screen.getByText('Join the Movement')).toBeInTheDocument());
    });

    it('form not submitted if email format is not valid', async () => {
        fireEvent.change(input, { target: { value: 'testInvalidEmail' } }); 
        await wait(() => {
            const formButtonText = screen.getByText('Join the Movement');
            expect(formButtonText).toBeInTheDocument();
        }); 
    });
    
    it('error appears if email is blank', async () => {
        fireEvent.change(input, { target: { value: '' } }); 
        fireEvent.click(button);
        await wait(() => {
            const requiredText = screen.getByText('This field is required');
            expect(requiredText).toBeInTheDocument();
        });
    });
    
    it('error appears if email format invalid', async () => {
        fireEvent.change(input, { target: { value: 'testInvalidEmail' } }); 
        fireEvent.click(button);
        await wait(() => {
            const confirmationText = screen.getByText('Email format should be abc@domain.com');
            expect(confirmationText).toBeInTheDocument();
        });
    });
    
    it('error appears if 21+ characters entered in email input', async () => {
        fireEvent.change(input, { target: { value: '1234567890123@email.com' } }); 
        fireEvent.click(button);
        await wait(() => {
            const charCountText = screen.getByText('Must be 20 chars or less');
            expect(charCountText).toBeInTheDocument();
        });
    });
});