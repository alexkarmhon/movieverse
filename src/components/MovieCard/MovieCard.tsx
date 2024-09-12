import React from 'react';
import { Link } from 'react-router-dom';

import { Movie } from '../../reducers/movies';
import styles from './MovieCard.module.scss';

export interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className={styles.card}>
      <img
        src="/movie-thumb.png"
        alt="Movie thumbnail"
        className={styles.thumbnail}
      />
      <div className={styles.content}>
        <div>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </div>
        <div className={styles.overview}>{movie.overviews}</div>
        <div className={styles.popularity}>{movie.popularity}</div>
      </div>
    </div>
  );
};
