const API_ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;

export const getOptions: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
  },
};

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
interface MoviesResponse {
  results: MovieDetails[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface KeywordItem {
  id: number;
  name: string;
}

interface KeywordsResponse {
  results: KeywordItem[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface MoviesFilters {
  keywords?: number[];
  genres?: number[];
}

export const getNowPlaying = async (
  page: number,
): Promise<NowPlayingResponse> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
    getOptions,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch now playing movies: ${response.statusText}`,
    );
  }

  return response.json();
};

export const getMovies = async (
  page: number,
  filters: MoviesFilters,
): Promise<MoviesResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
  });

  if (filters.keywords?.length) {
    params.append('with_keywords', filters.keywords.join('|'));
  }

  if (filters.genres?.length) {
    params.append('with_genres', filters.genres.join(','));
  }

  const query = params.toString();

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?${query}`,
    getOptions,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch now playing movies: ${response.statusText}`,
    );
  }

  return response.json();
};

export const getUpcoming = async (): Promise<UpcomingResponse> => {
  const response = await fetch(
    'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
    getOptions,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch now playing movies: ${response.statusText}`,
    );
  }

  return response.json();
};

export const getKeywords = async (query: string): Promise<KeywordsResponse> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/keyword?query=${query}&page=1`,
    getOptions,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch now playing movies: ${response.statusText}`,
    );
  }

  return response.json();
};
