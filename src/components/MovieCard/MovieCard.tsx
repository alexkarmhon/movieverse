import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import { Movie } from '../../reducers/movies';

export interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card
      sx={{
        backgroundColor: '#1e1e1e',
        color: '#fff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: '0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.005)',
          boxShadow: '0 12px 20px rgba(0,0,0,0.5)',
        },
      }}
    >
      <CardMedia
        component={'img'}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/movie-thumb.png'
        }
        sx={{ width: '100%', height: 'auto' }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          padding: '16px',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#333' }}
          >
            {movie.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, mb: 2 }}
          >
            {movie.overview}
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="button"
            display={'block'}
            mt={2}
            sx={{ fontSize: '0.875rem', color: '#777' }}
          >
            Popularity: {movie.popularity}
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'flex-end',
          padding: '8px 16px',
          backgroundColor: '#e0e0e0',
        }}
      >
        <Button
          component={RouterLink}
          to={`${movie.id}`}
          color="primary"
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
};
