import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from '../components/Search';

describe('<Search />', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders input and button', () => {
    render(<Search onSearch={mockOnSearch} />);
    expect(
      screen.getByPlaceholderText(/enter your query/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('loads search query from localStorage on mount', () => {
    localStorage.setItem('searchQuery', 'saved term');
    render(<Search onSearch={mockOnSearch} />);
    expect(screen.getByDisplayValue('saved term')).toBeInTheDocument();
  });

  it('updates input value on user typing', async () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/enter your query/i);
    await userEvent.type(input, 'test input');
    expect(screen.getByDisplayValue('test input')).toBeInTheDocument();
  });

  it('submits trimmed input value on button click', async () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/enter your query/i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, '   hello   ');
    await userEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('hello');
  });

  it('saves trimmed search query to localStorage', async () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/enter your query/i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, '   hello   ');
    await userEvent.click(button);

    expect(localStorage.getItem('searchQuery')).toBe('hello');
  });

  it('submits empty string if input is only spaces', async () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/enter your query/i);
    const button = screen.getByRole('button');

    await userEvent.type(input, '   ');
    await userEvent.click(button);

    expect(localStorage.getItem('searchQuery')).toBe('');
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
