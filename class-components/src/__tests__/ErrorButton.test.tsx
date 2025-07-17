import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorButton } from '../components/ErrorButton';

describe('ErrorButton', () => {
  it('renders with correct text and triggers onClick', () => {
    const handleClick = jest.fn();

    render(<ErrorButton onClick={handleClick} />);

    const button = screen.getByRole('button', { name: /error button/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
