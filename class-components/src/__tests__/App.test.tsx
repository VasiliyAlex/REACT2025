import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '../App';

jest.mock('../components/CardList', () => ({
  CardList: ({ search }: { search: string }) => (
    <div data-testid="card-list">Search: {search}</div>
  ),
}));

jest.mock('../components/Search', () => ({
  Search: ({ onSearch }: { onSearch: (query: string) => void }) => (
    <div>
      <input
        data-testid="search-input"
        type="text"
        placeholder="Enter your query"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  ),
}));

jest.mock('../components/ErrorButton', () => ({
  ErrorButton: ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} data-testid="error-button">
      Trigger Error
    </button>
  ),
}));

describe('App component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders without crashing and shows initial CardList', () => {
    render(<App />);
    expect(screen.getByTestId('card-list')).toBeInTheDocument();
  });

  it('updates query on search input change', () => {
    render(<App />);
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Pikachu' } });

    expect(screen.getByTestId('card-list')).toHaveTextContent(
      'Search: Pikachu'
    );
  });

  it('throws an error when triggerError is set to true', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      render(<App />);
      fireEvent.click(screen.getByTestId('error-button'));
    }).toThrow('Test error');

    consoleError.mockRestore();
  });
});
