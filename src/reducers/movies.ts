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

export interface MoviesState {
  top: Movie[];
  topPage: number;
  hasMoreTopPages: boolean;
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
};

const moviesTopLoaded = (
  movies: Movie[],
  page: number,
  hasMorePages: boolean,
) => ({
  type: 'moviesTop/loaded',
  payload: { movies, page, hasMorePages },
});

const moviesUpcomingLoaded = (movies: Movie[]) => ({
  type: 'moviesUpcoming/loaded',
  payload: movies,
});

const moviesLoading = () => ({
  type: 'movies/loading',
});

// export const fetchMoviesTop = (): AppThunk<Promise<void>> => {
//   return async (dispatch) => {
//     dispatch(moviesLoading());
//     const response = await getNowPlaying(1);
//     console.log(response);
//     dispatch(moviesTopLoaded(response.results, response.page));
//   };
// };

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
});

export default moviesReducer;
