import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsCard from '../components/NewsCard';

interface NewsCardProps {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
}

describe('NewsCard', () => {
  it('fetches news card with the provided parameters', () => {
    const mockData: NewsCardProps = {
      title: 'Dummy Title',
      description: 'Dummy Description',
      urlToImage: 'example.jpg',
      url: 'http://example.com',
    };

    render(<NewsCard {...mockData} />);
    expect(screen.getByText('Dummy Title')).toBeInTheDocument();
    expect(screen.getByText('Dummy Description')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'example.jpg');
  });
});
