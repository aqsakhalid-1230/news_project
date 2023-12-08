import fetchNews from '../services/newsService';

describe('fetchNews', () => {
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  it('fetchesthe  news successfully from API', async () => {
    const mockArticles = [{ id: 1, title: 'Test Article' }];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ articles: mockArticles }),
    });

    const articles = await fetchNews('apple', 'en');
    const url = 'http://127.0.0.1:8000/api/news/?q=apple&from=past7days&sortBy=publishedAt&language=en';
    expect(fetch).toHaveBeenCalledWith(url);
    expect(articles).toEqual({ articles: mockArticles });
  });

  it('responds with an error status', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({}),
    });

    const articles = await fetchNews('apple', 'en');
    expect(consoleErrorMock).toHaveBeenCalled();
    expect(articles).toEqual({ articles: [], error: true });
  });

  it('returns exception when error in fetching', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));

    const articles = await fetchNews('apple', 'en');
    expect(consoleErrorMock).toHaveBeenCalled();
    expect(articles).toEqual({ articles: [], error: true });
  });
});
