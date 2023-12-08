
import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import NewsCard from './components/NewsCard';
import fetchNews from './services/newsService';
import { AppBar, Toolbar, Typography } from '@mui/material';

const App: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedTopic] = useState('apple');

  useEffect(() => {
    const loadNews = async () => {
      const data = await fetchNews(selectedTopic, 'en');
      setArticles(data.articles);
    };

    loadNews();
  }, [selectedTopic, 'en']);

  return (
    <>
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            News App
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{ minHeight: 'calc(100vh - 20.4vh)' }}>
        <Container style={{ marginTop: '20px' }}>
          <>
            {articles.map(article => (
                <NewsCard
                  key={article.title}
                  title={article.title}
                  description={article.description}
                  urlToImage={article.urlToImage}
                  url={article.url}
                />
            ))}
          </>
        </Container>
      </div>
    </>
  );
}

export default App;
