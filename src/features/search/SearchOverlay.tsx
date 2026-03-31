import { BiSearch } from "react-icons/bi";
import CustomSelect from "../../components/CustomSelect";
import { MutableRefObject, useContext, useRef, useState } from "react";
import { MovieType } from "../../services/all";
import { useSearchedData } from "../../hooks/useSearchedData";
import { useDebounce } from "../../hooks/useDepouncing";
import SearchedMovie from "./SearchedMovie";
import Loader from "../../components/Loader";
import { SearchOverlayContext } from "../../context/SearchOverlayContext";
import Pagination from "../../components/Pagination";

const SearchOverlay = () => {
  const [type, setType] = useState<MovieType>();
  const { searchOverlay, setSearchOverlay } = useContext(SearchOverlayContext);
  const [searchInpValue, setSearchInpValue] = useState<string>(
    searchOverlay.searchText || "",
  );

  const debouncedData = useDebounce<string>({
    value: searchInpValue,
    delay: 600,
  });

  const [page, setPage] = useState<number>(1);
  const { data: searchedData, isLoading } = useSearchedData({
    page,
    type: type || "multi",
    query: debouncedData,
  });
  const scrollableSec = useRef() as MutableRefObject<HTMLDivElement>;
  return (
    <div className="fixed top-0 z-[1000] grid h-screen w-screen place-items-center overflow-y-hidden bg-black/80 px-2 py-10">
      <div
        className="absolute inset-0 -z-10 bg-black/40"
        onClick={() =>
          setSearchOverlay({ isShow: false, searchText: undefined })
        }
      ></div>
      <div className="flex h-5/6 max-h-full min-h-full w-full max-w-2xl flex-col gap-5 rounded-xl bg-black p-4 shadow-md md:rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="bord borde relative flex min-h-10 w-full overflow-hidden rounded-lg">
            <input
              type="text"
              title="search"
              className="search-inp w-full border-none bg-white/20 p-1 outline-none"
              placeholder={searchOverlay.searchText}
              onChange={(e) => {
                setSearchInpValue(e.target.value);
                e.target.placeholder = "";
              }}
            />
            <button title="search" className="w-fit bg-primary px-4">
              <BiSearch />
            </button>
          </div>
          <CustomSelect
            options={[
              { innerText: "all", value: "multi" },
              { innerText: MovieType.MOVIE, value: MovieType.MOVIE },
              { innerText: MovieType.TV, value: MovieType.TV },
            ]}
            title="type"
            className="h-10 bg-white/30"
            onChange={(data) => {
              setType(data?.value as MovieType);
            }}
          />
        </div>
        <div
          className="scrollbar flex flex-1 flex-col items-center gap-1 overflow-y-scroll pr-2"
          ref={scrollableSec}
        >
          {!isLoading ? (
            searchedData?.results && searchedData?.results.length > 0 ? (
              <>
                {searchedData?.results?.map((movie, i) => (
                  <SearchedMovie
                    key={i}
                    movie={movie}
                    type={(movie.media_type as MovieType) || type}
                  />
                ))}
              </>
            ) : (
              <div className="">NO DATA</div>
            )
          ) : (
            <div className="grid h-full w-full place-items-center">
              <Loader size={30} />
            </div>
          )}
        </div>
        <div className="flex w-full justify-end">
          <Pagination
            currentPage={page}
            totalPages={searchedData?.total_pages || 1}
            changePageState={setPage}
            onGoNext={() =>
              scrollableSec.current.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            onGoPrevious={() =>
              scrollableSec.current.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
