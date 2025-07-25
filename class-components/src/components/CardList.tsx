import React, { useEffect, useState } from 'react';
import { fetchBooks, type Book } from '../api/openlibrary';
import { Card } from './Card';
import { SkeletonCard } from './SkeletonCard';

interface Props {
  search: string;
}

export const CardList: React.FC<Props> = ({ search = 'the' }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadBooks = async (query: string) => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchBooks(query);
        if (isMounted) {
          setBooks(data.docs);
        }
      } catch (e) {
        if (isMounted) {
          setError(e instanceof Error ? e.message : 'Unknown error');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadBooks(search);

    return () => {
      isMounted = false;
    };
  }, [search]);

  if (loading) {
    return (
      <div className="p-4 flex flex-wrap gap-4 justify-center items-center">
        {Array.from({ length: 15 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }
  if (error) return <div className="p-4">Error: {error}</div>;

  return (
    <div className="p-4 flex flex-wrap gap-4 justify-center items-center">
      {books.map((book) => (
        <Card
          key={book.key}
          name={book.title}
          imageUrl={
            typeof book.cover_i === 'number'
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : undefined
          }
          description={book.author_name?.join(', ') || 'Автор неизвестен'}
          first_publish_year={book.first_publish_year || 0}
        />
      ))}
    </div>
  );
};
