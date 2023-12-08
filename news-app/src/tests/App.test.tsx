import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import fetchNews from '../services/newsService';

jest.mock('../services/newsService');

describe('App Component', () => {
  beforeEach(() => {
    (fetchNews as jest.Mock).mockResolvedValue({
      articles: [
        { title: 'Test Article 1', description: 'Description 1', urlToImage: 'image1.jpg', url: 'url1.com' },
        { title: 'Test Article 2', description: 'Description 2', urlToImage: 'image2.jpg', url: 'url2.com' }
      ],
      error: false
    });
  });

  test('fetches news and renders the App component', async () => {
    render(<App />);
  
    expect(screen.queryByTestId('loading-spinner')).toBeNull();
    await waitFor(() => {
      expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    });
  
    await waitFor(() => {
      expect(screen.getByText('Test Article 2')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('loading-spinner')).toBeNull();
    expect(screen.getByText('News App')).toBeInTheDocument(); // Header text
    expect(screen.getByTestId('theme-selector')).toBeInTheDocument(); // Theme selector
    expect(screen.getByTestId('language-selector')).toBeInTheDocument(); // Language selector
    expect(screen.getByTestId('topics-selector')).toBeInTheDocument(); // Topics selector
  });
});
