import {
  getMovies,
  getNowPlaying,
  getUpcoming,
  MoviesFilters,
} from '../API/api';
import { genres } from '../genres';
import { ActionWithPayload, createReducer } from '../redux/utils';
import { AppThunk } from '../store';

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

interface MoviesTopPayload {
  movies: Movie[];
  page: number;
  hasMorePages: boolean;
}

const initialState: MoviesState = {
  top: [],
  topPage: 0,
  hasMoreTopPages: true,
  upcoming: [],
  upcomingPage: 0,
  loading: false,
  genres,
};

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

const moviesReducer = createReducer<MoviesState>(initialState, {
  'movies/loaded': (state, action: ActionWithPayload<MoviesTopPayload>) => {
    return {
      ...state,
      top: [...state.top, ...action.payload.movies],
      topPage: action.payload.page,
      hasMoreTopPages: action.payload.hasMorePages,
      loading: false,
    };
  },
  'moviesTop/loaded': (state, action: ActionWithPayload<MoviesTopPayload>) => {
    return {
      ...state,
      top: [...state.top, ...action.payload.movies],
      topPage: action.payload.page,
      hasMoreTopPages: action.payload.hasMorePages,
      loading: false,
    };
  },
  'moviesUpcoming/loaded': (state, action: ActionWithPayload<Movie[]>) => {
    return {
      ...state,
      upcoming: action.payload,
      loading: false,
    };
  },
  'movies/loading': (state) => {
    return {
      ...state,
      loading: true,
    };
  },
  'movies/reset': () => {
    return { ...initialState };
  },
});

export default moviesReducer;
