import { getNowPlaying } from '../API/api';
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

interface MovieState {
  top: Movie[];
  loading: boolean;
}

const initialState: MovieState = {
  top: [],
  loading: false,
};

const moviesLoaded = (movies: Movie[]) => ({
  type: 'movies/loaded',
  payload: movies,
});

const moviesLoading = () => ({
  type: 'movies/loading',
});

export const fetchMovies = (): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    dispatch(moviesLoading());
    const { results } = await getNowPlaying();

    dispatch(moviesLoaded(results));
  };
};

const moviesReducer = createReducer<MovieState>(initialState, {
  'movies/loaded': (state, action: ActionWithPayload<Movie[]>) => {
    return {
      ...state,
      top: action.payload,
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
