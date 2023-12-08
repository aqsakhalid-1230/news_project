import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, CardActionArea } from '@mui/material';
import { NewsCardProps } from '../types/NewsCardProps';

const NewsCard: React.FC<NewsCardProps> = ({ title, description, urlToImage, url }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 6 } }}>
    <CardActionArea onClick={() => window.open(url, '_blank')}>
      <CardMedia
        component="img"
        height="140"
        image={urlToImage}
        alt="news image"
        onError={(e) => (e.currentTarget.src = 'fallback-image-url.jpg')}
      />
      <Box sx={{ flexGrow: 1 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Box>
    </CardActionArea>
  </Card>
);

export default NewsCard;

