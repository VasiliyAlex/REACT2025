import { fetchBooks } from '../api/openlibrary.ts';
import type { OpenLibraryResponse } from '../api/openlibrary.ts';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('fetchBooks', () => {
  it('should fetch books with given query and page', async () => {
    const mockResponse: OpenLibraryResponse = {
      docs: [
        {
          key: 'book1',
          title: 'Example Book',
          author_name: ['John Doe'],
          first_publish_year: 1999,
          cover_i: 123,
        },
      ],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await fetchBooks('example', 2);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://openlibrary.org/search.json?q=example&page=2'
    );
    expect(result).toEqual(mockResponse);
  });

  it('should use default query if input is empty', async () => {
    const mockResponse = { docs: [] };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    await fetchBooks('   ');
    expect(fetchMock).toHaveBeenCalledWith(
      'https://openlibrary.org/search.json?q=the&page=1'
    );
  });

  it('should throw an error if response is not ok', async () => {
    fetchMock.mockResponseOnce('Internal Server Error', { status: 500 });

    await expect(fetchBooks('fail')).rejects.toThrow(
      'Error loading data from Open Library'
    );
  });
});
