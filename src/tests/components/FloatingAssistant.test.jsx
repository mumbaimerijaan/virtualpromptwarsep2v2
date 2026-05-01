import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { FloatingAssistant } from '../../components/Common/FloatingAssistant';
import { BrowserRouter } from 'react-router-dom';

describe('FloatingAssistant Component', () => {
  it('should render the assistant button', () => {
    render(
      <BrowserRouter>
        <FloatingAssistant onClick={() => {}} />
      </BrowserRouter>
    );
    
    expect(screen.getByLabelText(/Ask our AI assistant for help/i)).toBeInTheDocument();
    expect(screen.getByText(/Need help?/i)).toBeInTheDocument();
  });

  it('should trigger onClick when clicked', () => {
    const handleClick = vi.fn();
    render(
      <BrowserRouter>
        <FloatingAssistant onClick={handleClick} />
      </BrowserRouter>
    );
    
    const button = screen.getByLabelText(/Ask our AI assistant for help/i);
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
