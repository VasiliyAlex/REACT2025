import React from 'react';
import { fetchBooks, type Book } from '../api/openlibrary';
import { Card } from './Card';
import { SkeletonCard } from './SkeletonCard';

interface Props {
  search: string;
}

interface State {
  books: Book[];
  loading: boolean;
  error: string;
}

export class CardList extends React.Component<Props, State> {
  state: State = {
    books: [],
    loading: false,
    error: '',
  };

  static defaultProps = { search: 'the' };

  componentDidMount() {
    this.loadBooks(this.props.search);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.search !== this.props.search) {
      this.loadBooks(this.props.search);
    }
  }

  async loadBooks(query: string) {
    this.setState({ loading: true, error: '' });
    try {
      const data = await fetchBooks(query);
      this.setState({ books: data.docs, loading: false });
    } catch (e) {
      this.setState({
        error: e instanceof Error ? e.message : 'Unknown error',
        loading: false,
      });
    }
  }

  render() {
    const { books, loading, error } = this.state;

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
  }
}
