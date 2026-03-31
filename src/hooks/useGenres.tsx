import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../services/genres";
import { MovieType } from "../services/all";

export function useGenres(type: MovieType) {
  return useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const data = await getGenres({ type }).then((res) =>
        res.genres.sort((a, b) => a.name.length - b.name.length),
      );
      return data;
    },
  });
}
