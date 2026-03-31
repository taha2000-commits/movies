import { useSearchParams } from "react-router-dom";
import CustomSlider from "../components/CustomSlider";
import DropDownMenu from "../components/DropDownMenu";
import { MovieType } from "../services/all";
import SortSection from "./SortSection";
import FilterByLangs from "./FilterByLangs";
import FilterByGenresSection from "./FilterByGenresSection";
import FilterByDateSection from "./FilteByDateSection";

const SortAndFilterList = ({
  type,
  closeFilterSidebar,
}: {
  type: MovieType;
  closeFilterSidebar: () => void;
}) => {
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();

  const handleSearch = () => {
    Array.from(URLSearchParams.entries()).forEach((entry) => {
      if (entry[1] == "") URLSearchParams.delete(entry[0]);
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
          <FilterByDateSection URLSearchParams={URLSearchParams} />
          <hr />
          <div className="mb-3">
            <div className="mb-3">Average Rating</div>
            <CustomSlider
              min={0}
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
          <hr />
          <div className="mb-3">
            <div className="mb-3">Rauntime</div>
            <CustomSlider
              min={1}
              max={400}
              step={1}
              paramsMaxName="max_runtime"
              paramsMinName="min_runtime"
              minChange={(min) => {
                URLSearchParams.set("min_runtime", min.toString());
              }}
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
