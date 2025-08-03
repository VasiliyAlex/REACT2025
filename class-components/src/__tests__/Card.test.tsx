import { render, screen } from '@testing-library/react';
import { Card } from '../components/Card';
import '@testing-library/jest-dom';

const mockProps = {
  name: 'React Basics',
  description: 'This is a basic React course.',
  imageUrl: '/book.png',
  first_publish_year: 2022,
};

describe('Card Component', () => {
  it('renders the title', () => {
    render(<Card {...mockProps} />);
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
  });

  it('renders the image with correct src and alt', () => {
    render(<Card {...mockProps} />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src.endsWith(mockProps.imageUrl)).toBe(true);
    expect(img.alt).toBe(mockProps.name);
  });

  it('renders the publication year', () => {
    render(<Card {...mockProps} />);
    expect(
      screen.getByText(mockProps.first_publish_year.toString())
    ).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<Card {...mockProps} />);
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it('handles missing optional props gracefully', () => {
    const modifiedProps = { ...mockProps, description: '', imageUrl: '' };
    render(<Card {...modifiedProps} />);
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(
      screen.getByText(mockProps.first_publish_year.toString())
    ).toBeInTheDocument();
  });
});
