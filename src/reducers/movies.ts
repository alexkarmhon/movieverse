import { getNowPlaying, getUpcoming } from '../API/api';
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

interface MoviesState {
  top: Movie[];
  upcoming: Movie[];
  loading: boolean;
}

const initialState: MoviesState = {
  top: [],
  upcoming: [],
  loading: false,
};

const moviesTopLoaded = (movies: Movie[]) => ({
  type: 'moviesTop/loaded',
  payload: movies,
});

const moviesUpcomingLoaded = (movies: Movie[]) => ({
  type: 'moviesUpcoming/loaded',
  payload: movies,
});

const moviesLoading = () => ({
  type: 'movies/loading',
});

export const fetchMoviesTop = (): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    dispatch(moviesLoading());
    const { results } = await getNowPlaying();
    dispatch(moviesTopLoaded(results));
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
  'moviesTop/loaded': (state, action: ActionWithPayload<Movie[]>) => {
    return {
      ...state,
      top: action.payload,
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
});

export default moviesReducer;
