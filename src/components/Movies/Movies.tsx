import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback, useEffect, useState } from 'react';

import { Container, Grid, LinearProgress, Typography } from '@mui/material';

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import {
  MoviesFilters,
  MoviesQuery,
  useGetMoviesQuery,
} from '../../redux/moviesAPI';
import MovieCard from '../MovieCard/MovieCard';
import { MoviesFilter } from '../MoviesFilter/MoviesFilter';

export interface MoviesProps {
  moviesTitle?: string;
}

const initialQuery: MoviesQuery = { page: 1, filters: {} };

export const Movies: React.FC<MoviesProps> = ({ moviesTitle }) => {
  const [query, setQuery] = useState<MoviesQuery>(initialQuery);

  const { data, isFetching } = useGetMoviesQuery(query);

  const movies = data?.results;
  const hasMorePages = data?.hasMorePages;

  const { isAuthenticated, user } = useAuth0();

  const onIntersect = useCallback(() => {
    if (hasMorePages) {
      setQuery((q) => ({ ...q, page: q.page + 1 }));
    }
  }, [hasMorePages]);

  const [targetRef] = useIntersectionObserver({ onIntersect });

  const handleAddFavorite = useCallback(
    (id: number) => {
      alert(
        `Not implemented! Action: ${user?.name} is adding movie ${id} to favorites`,
      );
    },
    [user?.name],
  );

  useEffect(() => {
    console.log('Current page:', query.page);
    console.log('Current movies:', movies);
  }, [query.page, movies]);

  return (
    <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }}>
      <Grid item xs={5.5}>
        <MoviesFilter
          onApply={(filters) => {
            const moviesFilters: MoviesFilters = {
              keywords: filters.keywords.map((keyword) => keyword.id),
              genres: filters.genres,
            };

            setQuery({
              page: 1,
              filters: moviesFilters,
            });
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
            {movies?.map((movie, i) => (
              <Grid item key={`${movie.id}-${i}`} xs={12} sm={6} md={4}>
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  enableUserActions={isAuthenticated}
                  onAddFavorite={handleAddFavorite}
                />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>
            {isFetching && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Movies;
