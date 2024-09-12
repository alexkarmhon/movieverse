import { connect } from 'react-redux';

import { MovieCard } from '../components/MovieCard/MovieCard';
import { Movie } from '../reducers/movies';
import { RootState } from '../store';
import styles from './Movies.module.scss';

interface MoviesProps {
  movies: Movie[];
}

function Movies({ movies }: MoviesProps) {
  return (
    <section>
      <div className={styles.movieList}>
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </section>
  );
}
const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
});

const connector = connect(mapStateToProps);
export default connector(Movies);
