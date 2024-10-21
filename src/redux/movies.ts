import {
  getGenres,
  getMovies,
  getNowPlaying,
  getUpcoming,
  MoviesFilters,
} from '../API/api';
import { AppThunk } from './store';

export interface Movie {
  backdrop_path: string;
  id: number;
  title: string;
  overview: string;
  popularity: number;
  release_date: string;
  poster_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MoviesState {
  top: Movie[];
  topPage: number;
  hasMoreTopPages: boolean;
  genres: Genre[];
  upcoming: Movie[];
  upcomingPage: number;
  loading: boolean;
}

const moviesTopLoaded = (
  movies: Movie[],
  page: number,
  hasMorePages: boolean,
) => ({
  type: 'moviesTop/loaded',
  payload: { movies, page, hasMorePages },
});

const moviesLoaded = (
  movies: Movie[],
  page: number,
  hasMorePages: boolean,
) => ({
  type: 'movies/loaded',
  payload: { movies, page, hasMorePages },
});

const moviesUpcomingLoaded = (movies: Movie[]) => ({
  type: 'moviesUpcoming/loaded',
  payload: movies,
});

const genresLoaded = (genres: Genre[]) => ({
  type: 'movies/genres',
  payload: genres,
});

const moviesLoading = () => ({
  type: 'movies/loading',
});

export const resetMovies = () => ({
  type: 'movies/reset',
});

export const fetchNextPage = (
  filters: MoviesFilters = {},
): AppThunk<Promise<void>> => {
  return async (dispatch, getState) => {
    const nextPage = getState().movies.topPage + 1;
    dispatch(moviesLoading());
    const moviesResponse = await getMovies(nextPage, filters);
    const hasMorePages = moviesResponse.page < moviesResponse.total_pages;
    dispatch(
      moviesLoaded(moviesResponse.results, moviesResponse.page, hasMorePages),
    );
  };
};

export const fetchMoviesTopNext = (): AppThunk<Promise<void>> => {
  return async (dispatch, getState) => {
    const nextPage = getState().movies.topPage + 1;
    dispatch(moviesLoading());
    const { results, page, total_pages } = await getNowPlaying(nextPage);
    const hasMorePages = page < total_pages;
    dispatch(moviesTopLoaded(results, page, hasMorePages));
  };
};

export const fetchUpcoming = (): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    dispatch(moviesLoading());
    const { results } = await getUpcoming();
    dispatch(moviesUpcomingLoaded(results));
  };
};

export const fetchGenres = (): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    dispatch(moviesLoading());
    const { genres } = await getGenres();
    dispatch(genresLoaded(genres));
  };
};
