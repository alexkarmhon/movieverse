import { connect } from 'react-redux';

import { Container } from '@mui/material';

import Movies from '../components/Movies/Movies';
import { Movie } from '../reducers/movies';
import { RootState } from '../store';

interface MoviesPageProps {
  movies: Movie[];
  loading: boolean;
}

function MoviesPage({ movies, loading }: MoviesPageProps) {
  return (
    <Container sx={{ py: 6 }}>
      <Movies movies={movies} loading={loading} moviesTitle={'Now playing'} />
    </Container>
  );
}
const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
  loading: state.movies.loading,
});

const connector = connect(mapStateToProps);
export default connector(MoviesPage);
