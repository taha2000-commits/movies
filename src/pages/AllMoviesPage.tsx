import { useSearchParams } from "react-router-dom";
import MovieCard from "../features/Home/MovieCard";
import SortAndFilterList from "../components/SortAndFilterList";
import { useFilteredMovies } from "../hooks/useFilteredMovies";

import { MovieType } from "../services/all";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import { useState } from "react";
import { format } from "date-fns";
import { FaFilter } from "react-icons/fa";
import { MdClear } from "react-icons/md";

const AllMoviesPage = ({ type }: { type: MovieType }) => {
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(URLSearchParams.get("page") || 1),
  );
  const [filterIconClicked, setFilterIconClicked] = useState(false);

  const closeFilterSidebar = () => {
    setFilterIconClicked(false);
  };

  const onFilterIconClick = () => {
    setFilterIconClicked((is) => !is);
  };

  const searchParams = {
    with_original_language: URLSearchParams.get("lang") || undefined,
    sort_by: URLSearchParams.get("sortby") || undefined,
    dateGte: URLSearchParams.get("released_from")
      ? format(
          new Date(URLSearchParams.get("released_from") || ""),
          "yyyy-MM-dd",
        )
      : undefined,
    dateLte: URLSearchParams.get("released_to")
      ? format(new Date(URLSearchParams.get("released_to") || ""), "yyyy-MM-dd")
      : undefined,
    voteAverageGte: Number(URLSearchParams.get("min_rate")) || undefined,
    voteAverageLte: Number(URLSearchParams.get("max_rate")) || undefined,
    runtimeGte: Number(URLSearchParams.get("min_runtime")) || undefined,
    runtimeLte: Number(URLSearchParams.get("max_runtime")) || undefined,
    with_genres:
      URLSearchParams.get("genres")
        ?.split(",")
        .map((i) => Number(i)) || undefined,
    with_Keywords:
      URLSearchParams.get("Keywords")
        ?.split(",")
        .map((i) => Number(i)) || undefined,
  };

  const { data: movies, isLoading } = useFilteredMovies({
    type: type,
    page: page,
    ...searchParams,
  });

  const handleNext = () => {
    if (movies && page < movies.total_pages) {
      URLSearchParams.set("page", (page + 1).toString());
      SetURLSearchParams(URLSearchParams);
    }
  };
  const handlePrevious = () => {
    if (page > 1) {
      URLSearchParams.set("page", (page - 1).toString());
      SetURLSearchParams(URLSearchParams);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col pt-20 sm:flex-row">
      <div
        className={`fixed top-0 z-[1000] h-full w-fit min-w-[300px] max-w-[300px] bg-black p-5 transition-all duration-1000 ${
          !filterIconClicked ? "-translate-x-full" : ""
        }`}
      >
        <div className={`scrollbar h-full overflow-y-auto pr-2`}>
          <SortAndFilterList
            type={type}
            closeFilterSidebar={closeFilterSidebar}
          />
          <div
            onClick={onFilterIconClick}
            className={`overflow-y-uto absolute left-full top-[50%] z-[1000] flex aspect-square -translate-y-[50%] cursor-pointer items-center justify-center rounded-br-full rounded-tr-full p-4 pl-2 transition-all duration-1000 ${filterIconClicked ? "bg-black" : "bg-white"}`}
          >
            {filterIconClicked ? (
              <MdClear />
            ) : (
              <FaFilter className="text-black" />
            )}
          </div>
        </div>
      </div>

      <div className="w-full">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap justify-center gap-3">
            {movies?.results.map((movie, i) => (
              <MovieCard type={type} key={i} movie={movie} />
            ))}
          </div>
        )}
        <div className="mt-10 flex items-center justify-center">
          <Pagination
            currentPage={movies?.page || 1}
            totalPages={movies?.total_pages || 1}
            changePageState={setPage}
            onGoNext={handleNext}
            onGoPrevious={handlePrevious}
          />
        </div>
      </div>
    </div>
  );
};

export default AllMoviesPage;
