import React, { useEffect } from 'react';

import { Container, Grid, LinearProgress, Typography } from '@mui/material';

import { useAppDispatch } from '../../hooks';
import { fetchMoviesTop, fetchUpcoming, Movie } from '../../reducers/movies';
import { MovieCard } from '../MovieCard/MovieCard';

export interface MoviesProps {
  movies: Movie[];
  loading: boolean;
  moviesTitle: string;
}

export const Movies: React.FC<MoviesProps> = ({
  movies,
  loading,
  moviesTitle,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMoviesTop());
    dispatch(fetchUpcoming());
  }, [dispatch]);

  return (
    <Container sx={{ py: 2 }} maxWidth="lg">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: '#fbc02d' }}
      >
        {moviesTitle}
      </Typography>
      {loading && <LinearProgress color="secondary" />}
      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4}>
            <MovieCard movie={movie} key={movie.id} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Movies;
