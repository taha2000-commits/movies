import { useGSAP } from "@gsap/react";
import { IoClose } from "react-icons/io5";
import gsap from "gsap";
import { useLocation, useNavigate } from "react-router-dom";
const SidebarMenu = () => {
  const location = useLocation();

  const nav = useNavigate();
  const { contextSafe } = useGSAP();
  const closeMenu = contextSafe(() =>
    gsap.to(".side-menu", {
      translateX: "100%",
      duration: 1,
      borderRadius: "100%",
      ease: "bounce.out",
    }),
  );
  return (
    <div className="side-menu absolute left-full top-0 z-[100] grid h-screen w-full translate-x-full place-items-center rounded-[100%] bg-black sm:w-fit">
      <IoClose
        className="absolute right-5 top-5 cursor-pointer"
        size={25}
        onClick={closeMenu}
      />
      <ul className="text-center font-title text-4xl">
        <li
          className={`cursor-pointer px-20 py-3 hover:text-primary ${location.pathname === "/movies" ? "text-primary" : ""}`}
          onClick={() => {
            nav("/movies");
            closeMenu();
          }}
        >
          Movies
        </li>
        <li
          className={`cursor-pointer px-20 py-3 hover:text-primary ${location.pathname === "/tvs" ? "text-primary" : ""}`}
          onClick={() => {
            nav("/tvs");
            closeMenu();
          }}
        >
          TvShows
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
