import useLanguages from "../hooks/useLanguages";
import { RefObject, useEffect, useRef, useState } from "react";
import { Language } from "../types/types";

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
  }, [langs, URLSearchParams]);

  return (
    <div className="">
      <div className="mb-3">Language</div>
      <div className="">
        <div className="w-full bg-black/80">
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
        </div>
        <div className="mt-2 overflow-hidden rounded-xl">
          {getLangsOpts.map((opt) => (
            <div
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
