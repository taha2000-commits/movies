import { FullMovie, MovieTranslatedData } from "../../types/types";

import FirstSectionActors from "./FirstSectionActors";
import FirstSectionTrailers from "./FirstSectionTrailers";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import LandingSectionWithBackdrop from "../../components/LandingSectionWithBackdrop";
import TranslationsSelect from "../PersonPage/TranslationsSelect";
import MainName from "../../components/MainName";
import RateComponent from "../../components/RateComponent";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import DotSpan from "../../components/DotSpan";
import { makeRuntime } from "../../utils/helpers";
import { useState } from "react";

const FirstSection = ({ movie }: { movie: FullMovie }) => {
  const [translatedObject, setTranslatedObject] =
    useState<MovieTranslatedData>();
  // ===========
  gsap.registerPlugin(useGSAP);
  useGSAP(() => {
    gsap.fromTo(
      ".first-sec",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 2,
      },
    );
  });
  return (
    <LandingSectionWithBackdrop
      backdropImg={movie.backdrop_path}
      posterImg={movie.poster_path}
      className="first-sec sticky top-0 grid grid-cols-1 items-end gap-x-20 md:grid-cols-2"
    >
      <div className="col-span-1 flex w-full flex-col gap-2 overflow-hidden sm:gap-5">
        <div className="flex w-full flex-col gap-2 sm:gap-5">
          <div className="flex w-full justify-end">
            <TranslationsSelect
              translations={movie.translations.translations}
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
                  Object.fromEntries(data) as MovieTranslatedData,
                );
              }}
            />
          </div>
          <MainName name={movie.original_title} />
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white/70">
            <RateComponent
              vote_average={movie.vote_average}
              vote_count={movie.vote_count}
            />
            <div className="flex w-full flex-wrap items-center gap-2">
              <DotSpan
                text={makeRuntime(translatedObject?.runtime || movie.runtime)}
              />
              <div className="flex items-center gap-2">
                <VscDebugBreakpointLog className="fill-primary" />
                {movie.genres.map((genre, i) => (
                  <span key={i}>{genre.name}</span>
                ))}
              </div>
              <DotSpan text={movie.release_date.split("-")[0]} />
            </div>{" "}
          </div>
          <p className="line-clamp-3 max-w-[400px] text-sm sm:font-bold">
            {translatedObject?.overview || movie.overview}
          </p>
          
        </div>
      </div>
      <div className="col-span-1 flex w-full flex-col gap-2">
        {movie.videos.results.length > 0 && (
          <FirstSectionTrailers trailers={movie.videos.results} />
        )}
        {movie.credits.cast.length > 0 && (
          <FirstSectionActors cast={movie.credits.cast} />
        )}
      </div>
    </LandingSectionWithBackdrop>
  );
};

export default FirstSection;
