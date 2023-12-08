
import React, { useState, useEffect } from 'react';
import { Container, Grid, AppBar, Toolbar, Typography, Box } from '@mui/material';
import NewsCard from './components/NewsCard';
import { ThemeProvider } from '@mui/material/styles';
import ThemeSelector from './components/ThemeSelector';
import theme from './components/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import fetchNews from './services/newsService';
import { Pagination } from '@mui/material';
import LanguageSelector from './components/LanguageSelector';
import LoadingSpinner from './components/LoadingSpinner';
import TopicsSelector from './components/TopicsSelector';
import Alert from '@mui/material/Alert';

const App: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('apple');
  const [error, setError] = useState(false);
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
      setLoading(true);
      const data = await fetchNews(selectedTopic, language);
      if (data.error) {
        setError(true);
      } else {
        setArticles(data.articles);
      }
      setLoading(false);
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
          <TopicsSelector selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />

          {error && <Alert severity="error">Error fetching news articles.</Alert>}
          {loading ? <LoadingSpinner /> : (
            <>
              <Grid container spacing={3}>
                {currentArticles.map(article => (
                  <Grid item xs={12} sm={6} md={4} key={article.title}>
                    <NewsCard
                      key={article.title}
                      title={article.title}
                      description={article.description}
                      urlToImage={article.urlToImage}
                      url={article.url}
                    />
                  </Grid>
                ))}
              </Grid>
              <Pagination
                count={Math.ceil(articles.length / articlesPerPage)}
                page={currentPage}
                onChange={paginate}
                color="primary"
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
              />
            </>
          )}
        </Container>
      </div>
      <Box mt={5} py={3} bgcolor="primary.main" color="white" textAlign="center">
        <Typography variant="body2">© 2023 News App</Typography>
      </Box>
    </ThemeProvider>
  );
}

export default App;
