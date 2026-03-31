import { useQuery } from "@tanstack/react-query";
import { getPopularMovies, MovieType } from "../services/all";

export const usePopular = (type: MovieType) => {
  return useQuery({
    queryKey: ["popular", type],
    queryFn: () => getPopularMovies({ type }),
    placeholderData: (prev) => prev,
  });
};
