import { Action, Reducer } from 'redux';

export interface Movie {
  id: number;
  title: string;
  popularity: number;
  overviews: string;
}

interface MovieState {
  top: Movie[];
}

const initialState: MovieState = {
  top: [
    {
      id: 1,
      title: 'The Shawshank Redemption',
      popularity: 98,
      overviews: 'Redemption...',
    },
    {
      id: 2,
      title: 'The Godfather',
      popularity: 97,
      overviews: 'Godfather...',
    },
    {
      id: 3,
      title: 'The Dark Knight',
      popularity: 96.5,
      overviews: 'Batman...',
    },
    {
      id: 4,
      title: 'The Godfather Part II',
      popularity: 96,
      overviews: 'Part two...',
    },
    {
      id: 5,
      title: 'Angry men',
      popularity: 96,
      overviews: 'Men...',
    },
  ],
};

const moviesReducer: Reducer<MovieState, Action> = () => {
  return initialState;
};

export default moviesReducer;
