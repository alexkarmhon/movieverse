import { combineReducers } from 'redux';

// import { genres } from '../genres';
import { Genre, Movie, MoviesState } from './movies';
import { ActionWithPayload, createReducer } from './utils';

const initialState: MoviesState = {
  top: [],
  topPage: 0,
  hasMoreTopPages: true,
  upcoming: [],
  upcomingPage: 0,
  loading: false,
  genres: [],
};

interface MoviesTopPayload {
  movies: Movie[];
  page: number;
  hasMorePages: boolean;
}

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

  'movies/genres': (state, action: ActionWithPayload<Genre[]>) => {
    return {
      ...state,
      genres: action.payload,
      loading: false,
    };
  },
});

const rootReducer = combineReducers({
  movies: moviesReducer,
});

export default rootReducer;
