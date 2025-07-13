export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

export interface OpenLibraryResponse {
  docs: Book[];
}

export async function fetchBooks(
  query: string,
  page = 1
): Promise<OpenLibraryResponse> {
  const defaultQuery = 'the';
  const q = query.trim() || defaultQuery;

  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error loading data from Open Library');
  return res.json();
}
