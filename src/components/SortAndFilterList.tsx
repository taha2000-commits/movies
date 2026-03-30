import { useSearchParams } from "react-router-dom";
import CustomSelect from "./CustomSelect";
import CustomeSlider from "../components/CustomeSlider";
import DropDownMenu from "../components/DropDownMenu";
import { useGenres } from "../hooks/useGenres";
import useLanguages from "../hooks/useLanguages";
import { MovieType } from "../services/all";
import { ChangeEvent, useState } from "react";
import SortSection from "./SortSection";

const SortAndFilterList = ({
  type,
  closeFilterSidebar,
}: {
  type: MovieType;
  closeFilterSidebar: () => void;
}) => {
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  const { data: langs } = useLanguages();
  const { data: genres } = useGenres(type);
  const [selectedGenres, setSelectedGenres] = useState<string[] | undefined>(
    URLSearchParams.get("genres")?.split(",") || undefined,
  );

  const handleSearch = () => {
    URLSearchParams.forEach((val, key) => {
      if (val == "") URLSearchParams.delete(key);
    });
    SetURLSearchParams(URLSearchParams);
    closeFilterSidebar();
  };
  const handleClearSearch = () => {
    setSelectedGenres(undefined);
    SetURLSearchParams({});
  };
  return (
    <div className="flex w-full min-w-[200px] flex-col gap-3">
      <SortSection URLSearchParams={URLSearchParams} />
      <DropDownMenu title="Filter" className="bg-white/10">
        <div className="flex flex-col gap-5">
          <div className="">
            <div className="mb-3">Language</div>
            <CustomSelect
              options={
                langs?.sort().map((lang) => ({
                  innerText: lang.english_name,
                  value: lang.iso_639_1,
                })) || []
              }
              title={URLSearchParams.get("lang") || ""}
              className="w-full justify-between"
              onChange={(data) => {
                if (data?.value) {
                  URLSearchParams.set("lang", data.value);
                }
              }}
            />
          </div>
          <hr />
          <div className="">
            <div className="mb-3">Genres</div>
            <div className="flex flex-wrap gap-2">
              {genres?.genres.map((genre, i) => (
                <span
                  key={i}
                  className={`cursor-pointer rounded-full border px-2 py-1 hover:bg-primary ${selectedGenres?.includes(`${genre.id}`) ? "bg-primary" : ""}`}
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
                        sg
                          ? [...sg, genre.id.toString()]
                          : [genre.id.toString()],
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
          <hr />
          <div className="">
            <div className="mb-3">Release Dates</div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span>From:</span>
                <input
                  title="from-date"
                  type="date"
                  name="from-date"
                  id=""
                  value={URLSearchParams.get("released_from") || undefined}
                  className="border border-primary bg-transparent p-1 outline-none"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    URLSearchParams.set("released_from", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span>To:</span>
                <input
                  title="from-date"
                  type="date"
                  name="from-date"
                  id=""
                  value={URLSearchParams.get("released_to") || undefined}
                  className="border border-primary bg-transparent p-1 outline-none"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    URLSearchParams.set("released_to", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="">
            <div className="mb-3">Averege Rating</div>
            <CustomeSlider
              min={1}
              max={10}
              step={0.1}
              paramsMinName="min_rate"
              paramsMaxName="max_rate"
              minChange={(min) =>
                URLSearchParams.set("min_rate", min.toString())
              }
              maxChange={(max) =>
                URLSearchParams.set("max_rate", max.toString())
              }
            />
          </div>
          <div className="">
            <div className="mb-3">Rauntime</div>
            <CustomeSlider
              min={1}
              max={400}
              step={1}
              paramsMaxName="max_runtime"
              paramsMinName="min_runtime"
              minChange={(min) =>
                URLSearchParams.set("min_runtime", min.toString())
              }
              maxChange={(max) =>
                URLSearchParams.set("max_runtime", max.toString())
              }
            />
          </div>
        </div>
      </DropDownMenu>
      <div
        className="w-full cursor-pointer rounded-xl bg-white/10 p-3 text-center hover:bg-primary/30"
        onClick={handleSearch}
      >
        Search
      </div>
      <div
        className="w-full cursor-pointer rounded-xl bg-white/10 p-3 text-center hover:bg-primary/30"
        onClick={handleClearSearch}
      >
        Clear
      </div>
    </div>
  );
};

export default SortAndFilterList;
