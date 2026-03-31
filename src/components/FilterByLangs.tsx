import useLanguages from "../hooks/useLanguages";
import { RefObject, useEffect, useRef, useState } from "react";
import { Language } from "../types/types";
import { FaX } from "react-icons/fa6";

const FilterByLangs = ({
  URLSearchParams,
}: {
  URLSearchParams: URLSearchParams;
}) => {
  const { data: langs } = useLanguages();
  const searchedLang = URLSearchParams.get("lang");
  const input = useRef() as RefObject<HTMLInputElement>;
  const [languageOptions, setLanguageOptions] = useState<Language[]>([]);
  const [selectedLang, setSelectedLang] = useState<string | null>(searchedLang);

  const getLangsOpts =
    languageOptions.sort().map((lang) => ({
      innerText: lang.english_name,
      value: lang.iso_639_1,
    })) || [];

  const handleClear = () => {
    if (input.current) {
      input.current.value = "";
      setLanguageOptions([]);
      URLSearchParams.set("lang", "");
    }
  };

  useEffect(() => {
    if (searchedLang && input.current) {
      input.current.focus();
      input.current.value =
        langs?.filter((lng) => lng.iso_639_1 == selectedLang)[0].english_name ||
        "";
      setLanguageOptions([
        ...(langs?.filter((lng) => lng.iso_639_1 == selectedLang) || []),
      ]);
    }
  }, [langs, URLSearchParams, searchedLang, selectedLang]);

  return (
    <div className="">
      <h4>Language</h4>
      <div className="mt-2">
        <div className="flex w-full items-center justify-between bg-black/80 pr-1">
          <input
            ref={input}
            type="text"
            name="search-lang"
            id="search-lang"
            className="h-full w-full border-none bg-transparent p-2 text-sm outline-none"
            placeholder="Search language 🔎"
            onChange={(e) => {
              const searchedLangs =
                langs?.filter(
                  (lang) =>
                    (e.target.value &&
                      lang.english_name.startsWith(
                        e.target.value[0]?.toUpperCase() +
                          e.target.value?.slice(1),
                      )) ||
                    lang.iso_639_1 === e.target.value.toLowerCase(),
                ) || [];

              setLanguageOptions(searchedLangs);
            }}
          />
          {searchedLang && languageOptions.length > 0 && (
            <div
              className="cursor-pointer rounded-full bg-white/25 p-1 hover:bg-white/15"
              onClick={handleClear}
            >
              <FaX size={12} />
            </div>
          )}
        </div>
        <div className="mt-2 overflow-hidden rounded-xl">
          {getLangsOpts.map((opt) => (
            <div
              key={opt.value}
              className={`cursor-pointer border-b border-white/5 px-2 py-1 text-xs ${selectedLang === opt.value ? "bg-white/50" : "bg-black/20 hover:bg-black"} `}
              onClick={() => {
                URLSearchParams.set("lang", opt.value);
                setSelectedLang(opt.value);
              }}
            >
              {opt.innerText}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterByLangs;
