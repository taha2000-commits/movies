import { useState } from "react";
import FirstSectionActors from "../MoviePage/FirstSectionActors";
import FirstSectionTrailers from "../MoviePage/FirstSectionTrailers";
import DotSpan from "../../components/DotSpan";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import RateComponent from "../../components/RateComponent";
import MainName from "../../components/MainName";
import TranslationsSelect from "../PersonPage/TranslationsSelect";
import { FullTvShow, TvTranslatedData } from "../../types/types";
import LandingSectionWithBackdrop from "../../components/LandingSectionWithBackdrop";

const TvLandingSection = ({ tvShow }: { tvShow: FullTvShow }) => {
  const [translatedObject, setTranslatedObject] = useState<TvTranslatedData>();
  return (
    <LandingSectionWithBackdrop
      backdropImg={tvShow.backdrop_path}
      posterImg={tvShow.poster_path}
      className="sticky top-0 grid grid-cols-1 items-end gap-x-20 md:grid-cols-2"
    >
      <div className="col-span-1 flex w-full flex-col gap-2 overflow-hidden sm:gap-5">
        <div className="flex w-full flex-col gap-2 sm:gap-5">
          <div className="flex w-full justify-end">
            <TranslationsSelect
              translations={tvShow.translations.translations}
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
          <MainName name={tvShow.original_name} />
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white/70">
            <RateComponent
              vote_average={tvShow.vote_average}
              vote_count={tvShow.vote_count}
            />
            <div className="flex w-full flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <VscDebugBreakpointLog className="fill-primary" />
                <div className="flex flex-wrap gap-x-2">
                  {tvShow.genres.map((genre, i) => (
                    <span key={i}>{genre.name}</span>
                  ))}
                </div>
              </div>
              <DotSpan text={tvShow.first_air_date.split("-")[0]} />
            </div>{" "}
          </div>
          <p className="line-clamp-3 max-w-[400px] text-sm sm:font-bold">
            {translatedObject?.overview || tvShow.overview}
          </p>
          
        </div>
      </div>
      <div className="col-span-1 flex w-full flex-col gap-2">
        {tvShow.videos.results.length > 0 && (
          <FirstSectionTrailers trailers={tvShow.videos.results} />
        )}
        {tvShow.credits.cast.length > 0 && (
          <FirstSectionActors cast={tvShow.credits.cast} />
        )}
      </div>
    </LandingSectionWithBackdrop>
  );
};

export default TvLandingSection;
