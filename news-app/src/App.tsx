
import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import NewsCard from './components/NewsCard';
import { ThemeProvider } from '@mui/material/styles';
import ThemeSelector from './components/ThemeSelector';
import theme from './components/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import fetchNews from './services/newsService';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Pagination } from '@mui/material';
import LanguageSelector from './components/LanguageSelector';

const App: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedTopic] = useState('apple');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const loadNews = async () => {
      const data = await fetchNews(selectedTopic, language);
      setArticles(data.articles);
    };

    loadNews();
  }, [selectedTopic, language]);

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
          <LanguageSelector language={language} setLanguage={setLanguage} data-testid="language-selector" />
          <>
            {currentArticles.map(article => (
                <NewsCard
                  key={article.title}
                  title={article.title}
                  description={article.description}
                  urlToImage={article.urlToImage}
                  url={article.url}
                />
            ))}
            <Pagination
                count={Math.ceil(articles.length / articlesPerPage)}
                page={currentPage}
                onChange={paginate}
                color="primary"
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
              />
          </>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
