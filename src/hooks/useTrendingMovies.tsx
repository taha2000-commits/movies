import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies, MovieType, Period } from "../services/all";

export function useTrendingMovies({
  period,
  type,
}: {
  period: Period;
  type: MovieType;
}) {
  const query = useQuery({
    queryKey: ["trending", type, period],
    queryFn: () => getTrendingMovies({ period, type }),
    placeholderData: (prev) => prev,
  });
  return query;
}
