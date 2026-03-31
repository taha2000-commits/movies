import { format } from "date-fns";
import { Reducer, useEffect, useReducer, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdClear } from "react-icons/md";
type Period = {
  startDate: string | Date | undefined | null;
  endDate: string | Date | undefined | null;
};
type Action = {
  type: string;
  payload?: Date | null;
};
const datesReducer = (state: Period, action: Action): Period => {
  switch (action.type) {
    case "SetSD":
      return { ...state, startDate: action.payload };
    case "SetED":
      return { ...state, endDate: action.payload };
    case "CLEAR":
      return { startDate: "", endDate: "" };
    default:
      return state;
  }
};

const FilterByDateSection = ({
  URLSearchParams,
}: {
  URLSearchParams: URLSearchParams;
}) => {
  const [{ startDate, endDate }, dispatch] = useReducer<
    Reducer<Period, Action>
  >(datesReducer, {
    startDate: URLSearchParams.get("released_from"),
    endDate: URLSearchParams.get("released_to"),
  });

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClear = () => {
    dispatch({ type: "CLEAR" });
    URLSearchParams.set("released_from", "");
    URLSearchParams.set("released_to", "");
  };

  useEffect(() => {
    if (startDate && endDate) {
      URLSearchParams.set("released_from", format(startDate, "yyyy-MM-dd"));
      URLSearchParams.set("released_to", format(endDate, "yyyy-MM-dd"));
    }
  }, [URLSearchParams, endDate, startDate]);

  return (
    <div className="">
      <div className="mb-3 flex items-center justify-between">
        <span>Release Dates</span>
        {(startDate || endDate) && (
          <button
            className="w-fit rounded-full bg-primary/75 p-1 text-xs hover:bg-white/25"
            onClick={handleClear}
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex items-center justify-evenly gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm">From</span>
          <DatePicker
            selected={startDate as Date}
            onChange={(d: Date | null) => {
              dispatch({ type: "SetSD", payload: d });
            }}
            customInput={
              <button
                ref={buttonRef}
                onClick={() => {}}
                type="button"
                style={{
                  cursor: "pointer",
                }}
              >
                📅
              </button>
            }
            popperPlacement="top-end"
            popperClassName="z-[100000000]"
            popperTargetRef={buttonRef}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">To</span>
          <DatePicker
            selected={endDate as Date}
            onChange={(d: Date | null) => {
              dispatch({ type: "SetED", payload: d });
            }}
            customInput={
              <button
                ref={buttonRef}
                onClick={() => {}}
                type="button"
                style={{
                  cursor: "pointer",
                }}
              >
                📅
              </button>
            }
            popperPlacement="top-end"
            popperClassName="z-[100000000]"
            popperTargetRef={buttonRef}
          />
        </div>
      </div>
      {(startDate || endDate) && (
        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-white/50">
          <span>
            {startDate ? format(startDate, "yyyy-MM-dd") : "yyyy-MM-dd"}
          </span>
          <span>~</span>
          <span>{endDate ? format(endDate, "yyyy-MM-dd") : "yyyy-MM-dd"}</span>
        </div>
      )}
    </div>
  );
};

export default FilterByDateSection;
