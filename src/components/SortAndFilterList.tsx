import { useSearchParams } from "react-router-dom";
import CustomeSlider from "../components/CustomeSlider";
import DropDownMenu from "../components/DropDownMenu";
import { MovieType } from "../services/all";
import { ChangeEvent } from "react";
import SortSection from "./SortSection";
import FilterByLangs from "./FilterByLangs";
import FilterByGenresSection from "./FilterByGenresSection";

const SortAndFilterList = ({
  type,
  closeFilterSidebar,
}: {
  type: MovieType;
  closeFilterSidebar: () => void;
}) => {
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();

  const handleSearch = () => {
    URLSearchParams.forEach((val, key) => {
      if (val == "") URLSearchParams.delete(key);
    });
    SetURLSearchParams(URLSearchParams);
    closeFilterSidebar();
  };
  const handleClearSearch = () => {
    SetURLSearchParams({});
  };
  return (
    <div className="flex w-full min-w-[200px] flex-col gap-3">
      <SortSection URLSearchParams={URLSearchParams} />
      <DropDownMenu title="Filter" className="bg-white/10">
        <div className="flex flex-col gap-5">
          <FilterByLangs URLSearchParams={URLSearchParams} />
          <hr />
          <FilterByGenresSection
            type={type}
            URLSearchParams={URLSearchParams}
          />
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
