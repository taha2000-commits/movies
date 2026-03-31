import { useState } from "react";
import { useImgConfigsContext } from "../../hooks/useImgConfigsContext";
import { FullSeason, TvTranslatedData } from "../../types/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import TranslationsSelect from "../PersonPage/TranslationsSelect";
import MainName from "../../components/MainName";
import RateComponent from "../../components/RateComponent";
import DotSpan from "../../components/DotSpan";
import FirstSectionTrailers from "../MoviePage/FirstSectionTrailers";
import FirstSectionActors from "../MoviePage/FirstSectionActors";

const SeasonPageLandingSection = ({ season }: { season: FullSeason }) => {
  const { secure_base_url, poster_sizes } = useImgConfigsContext();
  const [translatedObject, setTranslatedObject] = useState<TvTranslatedData>();
  return (
    <div className="relative max-h-screen min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-20 flex h-full min-h-screen w-full">
        {season.images.posters.slice(0, 5).map((poster, i) => (
          <div
            key={i}
            className={`relative hidden h-full w-full -skew-x-12 grayscale md:block`}
          >
            <LazyLoadImage
              src={secure_base_url + poster_sizes[6] + poster.file_path}
              placeholderSrc={
                secure_base_url + poster_sizes[0] + poster.file_path
              }
              alt="Poster"
              className="absolute top-0 h-full w-full object-cover"
            />
          </div>
        ))}
        <LazyLoadImage
          src={secure_base_url + poster_sizes[6] + season?.poster_path}
          placeholderSrc={
            secure_base_url + poster_sizes[0] + season?.poster_path
          }
          alt="Poster"
          className="absolute top-0 h-full w-full object-cover"
        />
      </div>
      <div className="ms:hidden absolute inset-0 -z-10 block h-full w-full bg-rad"></div>
      <div className="z-50 grid h-full min-h-screen grid-cols-1 items-end gap-x-20 p-5 md:grid-cols-2">
        <div className="col-span-1 flex w-full flex-col gap-2 overflow-hidden sm:gap-5">
          <div className="flex w-full justify-end">
            <TranslationsSelect
              translations={season.translations.translations}
              onChange={(item) => {
                const data =
                  Object.entries(item?.data || {}).filter(
                    (entry) =>
                      entry[1] !== null &&
                      entry[1] !== undefined &&
                      entry[1] !== "" &&
                      entry[1] !== 0,
                  ) || undefined;
                setTranslatedObject(
                  Object.fromEntries(data) as TvTranslatedData,
                );
              }}
            />
          </div>
          <div className="z-50 col-span-1 flex w-full flex-col gap-2 sm:gap-5">
            <MainName name={translatedObject?.name || season.name} />

            <div className="flex-wra flex items-center gap-2 text-sm font-semibold text-white/70">
              <RateComponent vote_average={season.vote_average} />
              <div className="flex w-full flex-wrap items-center gap-2">
                <DotSpan text={season.air_date?.split("-")[0]} />
              </div>
            </div>
            <p className="line-clamp-3 max-w-[400px] text-sm sm:font-bold">
              {translatedObject?.overview || season.overview}
            </p>
          </div>
        </div>
        <div className="col-span-1 flex w-full flex-col gap-2">
          {season.videos.results.length > 0 && (
            <FirstSectionTrailers trailers={season.videos.results} />
          )}
          {season.credits.cast.length && (
            <FirstSectionActors cast={season.credits.cast} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SeasonPageLandingSection;
