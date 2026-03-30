import { CN } from "../utils/helpers";
import { ReactNode, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AnyObject } from "../types/types";

export type SelectItem = { innerText: string; value: string; data?: AnyObject };
type CustomSelectProps = {
  options: SelectItem[];
  className?: string;
  itemsClassName?: string;
  title: string;
  icon?: ReactNode;
  onChange?: (data?: SelectItem) => void;
};
const CustomSelect = ({
  options,
  title,
  className,
  itemsClassName,
  icon,
  onChange = () => {},
}: CustomSelectProps) => {
  const [status, setStatus] = useState<boolean>(false);
  const [choosed, setChoosed] = useState<
    { id: number; item: SelectItem } | undefined
  >();
  useEffect(() => {
    onChange(choosed?.item);
  }, [choosed]);
  return (
    <div className="relative">
      <div
        className={CN(
          "flex w-fit cursor-pointer items-center gap-2 rounded-lg p-1 hover:bg-white/20",
          className || "",
        )}
        onClick={() => setStatus((is) => !is)}
      >
        {icon}
        <span>{choosed?.item.innerText || title}</span>
        {status ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {status && (
        <div className="scrollbar absolute left-1/2 top-full mt-2 max-h-[300px] -translate-x-1/2 overflow-hidden overflow-y-scroll rounded-md bg-gray-600">
          <ul className="min-w-32">
            {options.map((item, index) => (
              <li
                key={index}
                className={CN(
                  "px-2 py-1 hover:bg-gray-700",
                  choosed?.id === index ? "bg-gray-700" : "",
                  itemsClassName || "",
                )}
                onClick={() => {
                  setChoosed({ id: index, item });
                  setStatus(false);
                }}
              >
                {item.innerText}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
