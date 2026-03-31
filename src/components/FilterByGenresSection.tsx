import { useEffect, useState } from "react";
import { useGenres } from "../hooks/useGenres";
import { MovieType } from "../services/all";
import { IoIosArrowUp } from "react-icons/io";
import { ClipLoader } from "react-spinners";

const FilterByGenresSection = ({
  type,
  URLSearchParams,
}: {
  type: MovieType;
  URLSearchParams: URLSearchParams;
}) => {
  const { data: genres, isLoading, isSuccess } = useGenres(type);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    URLSearchParams.get("genres")?.split(",") || [],
  );
  const [open, setOpen] = useState(selectedGenres?.length ? true : false);

  const handleClear = () => {
    setSelectedGenres([]);
    URLSearchParams.set("genres", "");
  };

  useEffect(() => {
    if (!URLSearchParams.get("genres")) {
      setSelectedGenres([]);
    }
  }, [URLSearchParams]);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="items- flex gap-1">
          <span>Genres</span>
          {selectedGenres.length > 0 && (
            <span className="h-1 w-1 rounded-full bg-primary text-xs"></span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {selectedGenres.length > 0 && open && (
            <button
              className="w-fit rounded-full bg-primary/75 p-1 text-xs hover:bg-white/25"
              onClick={handleClear}
            >
              Clear
            </button>
          )}
          {isLoading ? (
            <ClipLoader color="white" size={14} loading={true} />
          ) : (
            <IoIosArrowUp
              onClick={() => setOpen((is) => !is)}
              className={`transition-all duration-500 ${!open ? "rotate-180" : "rotate-0"}`}
            />
          )}
        </div>
      </div>
      {isSuccess && open && (
        <div className="mt-2 flex flex-wrap gap-1">
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
      )}
    </div>
  );
};

export default FilterByGenresSection;
