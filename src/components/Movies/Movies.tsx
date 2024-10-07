import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Container, Grid, LinearProgress, Typography } from '@mui/material';

import { anonymousUser, AuthContext } from '../../AuthContext';
import { useAppDispatch } from '../../hooks';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { fetchNextPage, Movie, resetMovies } from '../../reducers/movies';
import { selectHasMorePages } from '../../redux/selectors';
import MovieCard from '../MovieCard/MovieCard';
import { Filters, MoviesFilter } from '../MoviesFilter/MoviesFilter';

export interface MoviesProps {
  movies: Movie[];
  loading: boolean;
  moviesTitle?: string;
}

export const Movies: React.FC<MoviesProps> = ({
  movies,
  loading,
  moviesTitle,
}) => {
  const dispatch = useAppDispatch();
  const hasMorePages = useSelector(selectHasMorePages);
  const [filters, setFilters] = useState<Filters>();
  const { user } = useContext(AuthContext);
  const isLoggedIn = user !== anonymousUser;

  const [targetRef, entry] = useIntersectionObserver();

  useEffect(() => {
    dispatch(resetMovies());
  }, [dispatch]);

  useEffect(() => {
    if (entry?.isIntersecting && hasMorePages) {
      const moviesFilters = filters
        ? {
            keywords: filters.keywords.map((k) => k.id),
            genres: filters.genres,
          }
        : undefined;

      dispatch(fetchNextPage(moviesFilters));
    }
  }, [dispatch, entry?.isIntersecting, filters, hasMorePages]);

  const handleAddFavorite = useCallback(
    (id: number) => {
      alert(
        `Not implemented! Action: ${user.name} is adding movie ${id} to favorites`,
      );
    },
    [user.name],
  );

  return (
    <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }}>
      <Grid item xs={5.5}>
        <MoviesFilter
          onApply={(f) => {
            dispatch(resetMovies());
            setFilters(f);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ py: 2 }} maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: '#fbc02d' }}
          >
            {moviesTitle}
          </Typography>
          <Grid container spacing={4}>
            {movies.map((movie, i) => (
              <Grid item key={`${movie.id}-${i}`} xs={12} sm={6} md={4}>
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  enableUserActions={isLoggedIn}
                  onAddFavorite={handleAddFavorite}
                />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>
            {loading && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Movies;
