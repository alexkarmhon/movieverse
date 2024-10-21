import { RootState } from './store';

export const selectMoviesTop = (state: RootState) => state.movies.top;

export const selectGenres = (state: RootState) => state.movies.genres;

export const selectHasMorePages = (state: RootState) =>
  state.movies.hasMoreTopPages;
