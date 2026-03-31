import { GetAllReturn } from "../types/apiTypes";
import { Movie, TVShow } from "../types/types";
import { apiV3 } from "./api";
export enum MovieType {
  MOVIE = "movie",
  TV = "tv",
}
export interface GetAllParams {
  type: MovieType;
  page: number | 1;
  language?: string | "en-US";
  dateGte?: string | Date;
  dateLte?: string | Date;
  region?: string;
  sort_by?: string;
  voteAverageGte?: number;
  voteAverageLte?: number;
  runtimeGte?: number;
  runtimeLte?: number;
  with_genres?: number[];
  with_Keywords?: number[];
  with_original_language?: string;
}

export const getMovies: (
  params: GetAllParams,
) => Promise<GetAllReturn<Movie & TVShow>> = async (params) => {
  const {
    page = 1,
    language = "en-US",
    dateGte,
    dateLte,
    type,
    voteAverageGte,
    voteAverageLte,
    with_genres = undefined,
    runtimeGte,
    runtimeLte,
    region,
    sort_by,
    with_original_language,
  } = params;
  const { data } = await apiV3.get(`/discover/${type}`, {
    params: {
      region,
      sort_by,
      with_original_language,
      page,
      language,
      "primary_release_date.gte": dateGte,
      "primary_release_date.lte": dateLte,
      "vote_average.gte": voteAverageGte,
      "vote_average.lte": voteAverageLte,
      with_genres: with_genres?.join(),
      "with_runtime.gte": runtimeGte,
      "with_runtime.lte": runtimeLte,
    },
  });
  return data;
};

export const getPopularMovies: ({
  type,
  page,
}: {
  type: MovieType;
  page?: number;
}) => Promise<GetAllReturn<Movie & TVShow>> = async ({ type, page = 1 }) => {
  const { data } = await apiV3.get(`/${type}/popular`, { params: { page } });

  return data;
};

export enum Period {
  DAY = "day",
  WEEK = "week",
}

export const getTrendingMovies: (params: {
  period?: Period;
  type?: MovieType;
  page?: number;
}) => Promise<GetAllReturn<Movie & TVShow>> = async ({
  period = Period.DAY,
  type = MovieType.MOVIE,
  page = 1,
}) => {
  const { data } = await apiV3.get(`/trending/${type}/${period}`, {
    params: { page },
  });

  return data;
};

{
  /*
<option value=""></option><option value="original_title.asc">original_title.asc</option><option value="original_title.desc">original_title.desc</option><option value="popularity.asc">popularity.asc</option><option value="popularity.desc">popularity.desc</option><option value="revenue.asc">revenue.asc</option><option value="revenue.desc">revenue.desc</option><option value="primary_release_date.asc">primary_release_date.asc</option><option value="title.asc">title.asc</option><option value="title.desc">title.desc</option><option value="primary_release_date.desc">primary_release_date.desc</option><option value="vote_average.asc">vote_average.asc</option><option value="vote_average.desc">vote_average.desc</option><option value="vote_count.asc">vote_count.asc</option><option value="vote_count.desc">vote_count.desc</option>
*/
}
