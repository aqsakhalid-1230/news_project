
import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import NewsCard from './components/NewsCard';
import { ThemeProvider } from '@mui/material/styles';
import ThemeSelector from './components/ThemeSelector';
import theme from './components/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import fetchNews from './services/newsService';
import { AppBar, Toolbar, Typography } from '@mui/material';

const App: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedTopic] = useState('apple');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      const data = await fetchNews(selectedTopic, 'en');
      setArticles(data.articles);
    };

    loadNews();
  }, [selectedTopic, 'en']);

  return (
    <ThemeProvider theme={theme(darkMode)}>
      <CssBaseline />
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            News App
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{ minHeight: 'calc(100vh - 20.4vh)' }}>
        <Container style={{ marginTop: '20px' }}>
          <ThemeSelector darkMode={darkMode} setDarkMode={setDarkMode} />
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
    </ThemeProvider>
  );
}

export default App;
