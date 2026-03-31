import { useEffect, useState } from "react";
import { useGenres } from "../hooks/useGenres";
import { MovieType } from "../services/all";
import { FaX } from "react-icons/fa6";

const FilterByGenresSection = ({
  type,
  URLSearchParams,
}: {
  type: MovieType;
  URLSearchParams: URLSearchParams;
}) => {
  const { data: genres } = useGenres(type);

  const [selectedGenres, setSelectedGenres] = useState<string[] | undefined>(
    URLSearchParams.get("genres")?.split(",") || undefined,
  );

  const handleClear = () => {
    setSelectedGenres(undefined);
    URLSearchParams.set("genres", "");
  };

  useEffect(() => {
    if (!URLSearchParams.get("genres")) {
      setSelectedGenres(undefined);
    }
  }, [URLSearchParams]);

  return (
    <div className="">
      <div className="mb-2 flex items-center justify-between">
        <span>Genres</span>
        {selectedGenres?.length && (
          <div
            className="cursor-pointer rounded-full bg-black/75 p-2 hover:bg-white/25"
            onClick={handleClear}
          >
            <FaX size={12} />
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-1">
        {genres?.map((genre, i) => (
          <span
            key={i}
            className={`cursor-pointer rounded-full border px-2 py-1 text-xs hover:bg-primary ${selectedGenres?.includes(`${genre.id}`) ? "bg-primary" : ""}`}
            onClick={() => {
              if (selectedGenres?.includes(`${genre.id}`)) {
                setSelectedGenres((sg) =>
                  sg?.filter((i) => i != genre.id.toString()),
                );
                URLSearchParams.set(
                  "genres",
                  URLSearchParams.get("genres")!
                    .split(",")
                    .filter((item) => item != genre.id.toString())
                    .join(","),
                );
              } else {
                setSelectedGenres((sg) =>
                  sg ? [...sg, genre.id.toString()] : [genre.id.toString()],
                );
                URLSearchParams.set(
                  "genres",
                  URLSearchParams.get("genres")
                    ? URLSearchParams.get("genres") + "," + genre.id
                    : `${genre.id}`,
                );
              }
            }}
          >
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FilterByGenresSection;
