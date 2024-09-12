import React from 'react';
import { Link } from 'react-router-dom';

import { Movie } from '../../reducers/movies';
import styles from './MovieCard.module.css';

export interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className={styles.movieCard}>
      <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
      <div className={styles.overview}>{movie.overviews}</div>
      <div className={styles.popularity}>{movie.popularity}</div>
    </div>
  );
};
