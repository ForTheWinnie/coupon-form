import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from './App';


  it('Button label exists', () => {
    render(<App />);
    
    screen.debug(); // allows you to verify output of App component in terminal
    screen.getByText('See Coupon Details!');
    
    // verify that button text appears
    expect(screen.getByText('See Coupon Details!')).toBeInTheDocument();
  });

  // test('modal shows the children and a close button', () => {
  //   // Arrange
  //   const handleHide = jest.fn()
  
  //   // Act
  //   const { getByText } = render(
  //     <Modal onHide={handleHide}>
  //       <div>test</div>
  //     </Modal>
  //   )
  //   // Assert
  //   expect(getByText('test')).toBeTruthy()
  
  //   // Act
  //   fireEvent.click(getByText(/close/i))
  
  //   // Assert
  //   expect(handleHide).toHaveBeenCalledTimes(1)
  // })





it('App renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});

