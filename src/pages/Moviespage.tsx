import { connect } from 'react-redux';

import Movies from '../components/Movies/Movies';
import { Movie } from '../reducers/movies';
import { RootState } from '../store';

interface MoviesPageProps {
  movies: Movie[];
  loading: boolean;
}

function MoviesPage({ movies, loading }: MoviesPageProps) {
  return (
    <>
      <Movies movies={movies} loading={loading} />
    </>
  );
}
const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
  loading: state.movies.loading,
});

const connector = connect(mapStateToProps);
export default connector(MoviesPage);
