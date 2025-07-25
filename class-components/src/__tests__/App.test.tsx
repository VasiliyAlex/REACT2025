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
});
