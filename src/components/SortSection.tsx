import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import DropDownMenu from "./DropDownMenu";
import { SORT_OPTIONS } from "../utils/constants";
import { useEffect, useReducer } from "react";

enum SortType {
  DESC = "desc",
  ASC = "asc",
}
type State = {
  name?: string;
  type?: string;
};

type Action =
  | { type: "addName"; payload: string }
  | { type: "addType"; payload: SortType };
const sortReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "addName":
      return { ...state, name: action.payload };
    case "addType":
      return { ...state, type: action.payload };

    default:
      return state;
  }
};
export default function SortSection({
  URLSearchParams,
}: {
  URLSearchParams: URLSearchParams;
}) {
  const sortBy = URLSearchParams.get("sortby");
  const name = sortBy?.split(".")[0];
  const type = sortBy?.split(".")[1];

  const [sortData, dispatch] = useReducer<React.Reducer<State, Action>>(
    sortReducer,
    { name, type: type || "asc" },
  );

  useEffect(() => {
    URLSearchParams.set("sortby", sortData.name + "." + sortData.type);
  }, [URLSearchParams, sortData.name, sortData.type]);

  return (
    <DropDownMenu title="Sort" className="bg-white/10">
      <div className="">
        <div className="">Sort By</div>

        <div className="ch mt-2 overflow-hidden rounded-xl">
          {SORT_OPTIONS.map((opt) => (
            <div
              className={`cursor-pointer border-b border-white/5 ${sortData.name == opt.value ? "bg-white/50" : "bg-black/20 hover:bg-black"}`}
              key={opt.value}
            >
              <div
                className="flex items-center justify-between p-2 capitalize"
                onClick={() => {
                  if (sortData.name !== opt.value) {
                    dispatch({ type: "addName", payload: opt.value });
                    dispatch({ type: "addType", payload: SortType.ASC });
                  }
                }}
              >
                {opt.innerText}
                <div
                  className="rounded-full bg-black p-1"
                  onClick={() => {
                    dispatch({
                      type: "addType",
                      payload:
                        sortData.type == SortType.DESC
                          ? SortType.ASC
                          : SortType.DESC,
                    });
                  }}
                >
                  {sortData.name !== opt.value ? (
                    <FaArrowUp size={16} />
                  ) : sortData.type == SortType.ASC ? (
                    <FaArrowUp size={16} />
                  ) : (
                    <FaArrowDown size={16} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DropDownMenu>
  );
}
