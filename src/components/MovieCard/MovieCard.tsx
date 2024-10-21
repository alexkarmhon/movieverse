import React, { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';

import { Movie } from '../../redux/movies';

export interface MovieCardProps {
  movie: Movie;
  enableUserActions?: boolean;
  onAddFavorite?(id: number): void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  enableUserActions,
  onAddFavorite,
}) => {
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
          transform: 'scale(1.03)',
          boxShadow: '0 12px 20px rgba(255, 193, 7, 0.6)',
        },
      }}
    >
      <CardMedia
        component={'img'}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
            : '/movie-thumb.png'
        }
        sx={{
          width: '100%',
          height: 'auto',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#cfcfcf',
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom color="text.primary">
            {movie.title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {movie.overview}
          </Typography>
        </Box>
        <Typography
          variant="button"
          sx={{ fontSize: '0.875rem', color: '#2c2c2c', mt: 1 }}
        >
          Popularity: {movie.popularity}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ justifyContent: 'flex-end', p: 2, backgroundColor: '#333' }}
      >
        <Button
          component={RouterLink}
          to={`/movies/${movie.id}`}
          color="secondary"
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#fbc02d',
              color: '#333',
            },
          }}
        >
          DETAILS
        </Button>
        {enableUserActions && (
          <Tooltip title="Add to favorites">
            <IconButton onClick={() => onAddFavorite?.(movie.id)}>
              <FavoriteIcon
                sx={{
                  '&:hover': {
                    color: '#fbc12d95',
                  },
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
};

export default memo(MovieCard);
