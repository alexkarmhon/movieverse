import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Container, Grid, LinearProgress, Typography } from '@mui/material';

import { anonymousUser, AuthContext } from '../../AuthContext';
import { useAppDispatch } from '../../hooks';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { fetchMoviesTopNext, Movie } from '../../reducers/movies';
import { selectHasMorePages } from '../../redux/selectors';
import { MovieCard } from '../MovieCard/MovieCard';
import { MoviesFilter } from '../MoviesFilter/MoviesFilter';

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
  const hasMorePages = useSelector(selectHasMorePages);

  const { user } = useContext(AuthContext);
  const isLoggedIn = user !== anonymousUser;

  const [targetRef, entry] = useIntersectionObserver();

  useEffect(() => {
    if (entry?.isIntersecting && hasMorePages) {
      dispatch(fetchMoviesTopNext());
    }
  }, [dispatch, entry?.isIntersecting, hasMorePages]);

  return (
    <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }}>
      <Grid item xs="auto">
        <MoviesFilter onApply={(filters) => alert(JSON.stringify(filters))} />
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
            {movies.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4}>
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  enableUserActions={isLoggedIn}
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
// import React, { useContext, useEffect } from 'react';

// import { Container, Grid, LinearProgress, Typography } from '@mui/material';

// import { anonymousUser, AuthContext } from '../../AuthContext';
// import { useAppDispatch } from '../../hooks';
// import { useIntersectionObserver } from '../../hooks/useIntersectionObservrer';
// import { Movie } from '../../reducers/movies';
// import { MovieCard } from '../MovieCard/MovieCard';
// import { AppThunk } from '../../store';

// export interface MoviesProps {
//   movies: Movie[];
//   loading: boolean;
//   moviesTitle: string;
//   fetchCallback: () => AppThunk<Promise<void>>;
// }

// export const Movies: React.FC<MoviesProps> = ({
//   movies,
//   loading,
//   moviesTitle,
//   fetchCallback,
// }) => {
//   const dispatch = useAppDispatch();

//   const { user } = useContext(AuthContext);
//   const isLoggedIn = user !== anonymousUser;

//   const [targetRef, entry] = useIntersectionObserver();

//   useEffect(() => {
//     dispatch(fetchCallback());
//     if (entry?.isIntersecting) {
//       dispatch(fetchCallback());
//     }
//   }, [dispatch, entry?.isIntersecting, fetchCallback]);

//   return (
//     <Container sx={{ py: 2 }} maxWidth="lg">
//       <Typography
//         variant="h4"
//         align="center"
//         gutterBottom
//         sx={{ color: '#fbc02d' }}
//       >
//         {moviesTitle}
//       </Typography>
//       <Grid container spacing={4}>
//         {movies.map((movie) => (
//           <Grid item key={movie.id} xs={12} sm={6} md={4}>
//             <MovieCard
//               movie={movie}
//               key={movie.id}
//               enableUserActions={isLoggedIn}
//             />
//           </Grid>
//         ))}
//       </Grid>
//       <div ref={targetRef}>
//         {loading && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
//       </div>
//     </Container>
//   );
// };

// export default Movies;
