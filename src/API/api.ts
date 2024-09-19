const API_ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
}

interface NowPlayingResponse {
  results: MovieDetails[];
  page: number;
  total_pages: number;
  total_results: number;
}

interface UpcomingResponse {
  results: MovieDetails[];
  page: number;
  total_pages: number;
  total_results: number;
}

export const getNowPlaying = async (): Promise<NowPlayingResponse> => {
  const options: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_ACCESS_TOKEN}`,
    },
  };

  const response = await fetch(
    'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
    options,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch now playing movies: ${response.statusText}`,
    );
  }

  return response.json();
};

export const getUpcoming = async (): Promise<UpcomingResponse> => {
  const options: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_ACCESS_TOKEN}`,
    },
  };

  const response = await fetch(
    'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
    options,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch now playing movies: ${response.statusText}`,
    );
  }

  return response.json();
};
