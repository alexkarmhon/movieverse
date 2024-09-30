import { RootState } from '../store';

export const selectMoviesTop = (state: RootState) => state.movies.top;

export const selectHasMorePages = (state: RootState) =>
  state.movies.hasMoreTopPages;
