const fetchNews = async (selectedTopic: string, language: string): Promise<any> => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}?q=${selectedTopic}&from=past7days&sortBy=publishedAt&language=${language}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch News Error: ", error);
    return { articles: [], error: true };
  }
};

export default fetchNews;
