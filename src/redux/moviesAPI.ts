import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;

interface PageResponse<TResult> {
  page: number;
  results: TResult[];
  total_pages: number;
}
// interface PageDetails<TResult> {
//   page: number;
//   results: TResult[];
//   total_pages: number;
// }

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
}

interface MoviesState {
  results: MovieDetails[];
  lastPage: number;
  hasMorePages: boolean;
}

// interface MoviesResponse {
//   results: MovieDetails[];
//   page: number;
//   total_pages: number;
//   total_results: number;
// }

export interface MoviesFilters {
  keywords?: number[];
  genres?: number[];
}

export interface MoviesQuery {
  page: number;
  filters: MoviesFilters;
}

export interface KeywordItem {
  id: number;
  name: string;
}

// interface KeywordsResponse {
//   results: KeywordItem[];
//   page: number;
//   total_pages: number;
//   total_results: number;
// }

export interface Genre {
  id: number;
  name: string;
}

export const moviesApi = createApi({
  reducerPath: 'movies',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    prepareHeaders: (headers) => {
      headers.set('accept', 'application/json');
      headers.set('Authorization', `Bearer ${API_ACCESS_TOKEN}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<MoviesState, MoviesQuery>({
      query: (moviesQuery) => {
        const params = new URLSearchParams({
          page: moviesQuery.page.toString(),
        });
        if (moviesQuery.filters.keywords?.length) {
          params.append(
            'with_keywords',
            moviesQuery.filters.keywords.join('|'),
          );
        }
        if (moviesQuery.filters.genres?.length) {
          params.append('with_genres', moviesQuery.filters.genres.join(','));
        }

        const query = params.toString();
        const path = `discover/movie?${query}`;

        return path;
      },
      transformResponse: (response: PageResponse<MovieDetails>, _, arg) => {
        return {
          results: response.results,
          lastPage: response.page,
          hasMorePages: arg.page < response.total_pages,
        };
      },
      serializeQueryArgs({ endpointName }) {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      merge(currentCacheData, responseData) {
        if (responseData.lastPage === 1) {
          currentCacheData.results = responseData.results;
        } else {
          currentCacheData.results.push(...responseData.results);
        }
        currentCacheData.lastPage = responseData.lastPage;
        currentCacheData.hasMorePages = responseData.hasMorePages;
      },
    }),
    getKeywords: builder.query<KeywordItem[], string>({
      query: (queryText) => `search/keyword?query=${queryText}`,
      transformResponse: (response: PageResponse<KeywordItem>) =>
        response.results,
    }),
    getGenres: builder.query<Genre[], void>({
      query: () => 'genre/movie/list?language=en',
      transformResponse: (response: { genres: Genre[] }) => response.genres,
    }),
  }),
});

export const { useGetGenresQuery, useGetKeywordsQuery, useGetMoviesQuery } =
  moviesApi;
