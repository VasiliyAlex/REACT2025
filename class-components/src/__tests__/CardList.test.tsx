import { render, screen, waitFor } from '@testing-library/react';
import { CardList } from '../components/CardList';
import * as api from '../api/openlibrary';

jest.mock('../components/Card', () => ({
  Card: ({ name }: { name: string }) => <div data-testid="card">{name}</div>,
}));
jest.mock('../components/SkeletonCard', () => ({
  SkeletonCard: () => <div data-testid="skeleton" />,
}));

jest.mock('../api/openlibrary');

const mockedFetchBooks = api.fetchBooks as jest.MockedFunction<
  typeof api.fetchBooks
>;

describe('<CardList />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading indicators while data is being fetched', async () => {
    mockedFetchBooks.mockResolvedValueOnce({ docs: [] });

    render(<CardList search="harry" />);

    expect(screen.getAllByTestId('skeleton')).toHaveLength(15);
    await waitFor(() => expect(mockedFetchBooks).toHaveBeenCalled());
  });

  it('displays the list of books after loading', async () => {
    mockedFetchBooks.mockResolvedValueOnce({
      docs: [
        {
          key: '1',
          title: 'Harry Potter',
          cover_i: 123,
          author_name: ['J.K. Rowling'],
          first_publish_year: 1997,
        },
        {
          key: '2',
          title: 'LOTR',
          cover_i: undefined,
          author_name: undefined,
          first_publish_year: undefined,
        },
      ],
    });

    render(<CardList search="magic" />);
    expect(screen.getAllByTestId('skeleton')).toHaveLength(15);

    await waitFor(() => {
      expect(screen.getAllByTestId('card')).toHaveLength(2);
    });

    expect(screen.getByText('Harry Potter')).toBeInTheDocument();
    expect(screen.getByText('LOTR')).toBeInTheDocument();
  });

  it('displays an error message when the API call fails', async () => {
    mockedFetchBooks.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<CardList search="error" />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Failed to fetch/)).toBeInTheDocument();
    });
  });

  it('handles re-rendering with a new query', async () => {
    mockedFetchBooks
      .mockResolvedValueOnce({
        docs: [{ key: '1', title: 'First', cover_i: 1 }],
      })
      .mockResolvedValueOnce({
        docs: [{ key: '2', title: 'Second', cover_i: 2 }],
      });

    const { rerender } = render(<CardList search="first" />);
    await waitFor(() => expect(screen.getByText('First')).toBeInTheDocument());

    rerender(<CardList search="second" />);
    await waitFor(() => expect(screen.getByText('Second')).toBeInTheDocument());
  });

  it('displays an empty result without errors if the book array is empty', async () => {
    mockedFetchBooks.mockResolvedValueOnce({ docs: [] });

    render(<CardList search="empty" />);

    await waitFor(() => {
      expect(screen.queryByTestId('card')).not.toBeInTheDocument();
    });
  });
});
