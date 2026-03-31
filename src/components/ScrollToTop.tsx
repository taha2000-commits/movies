import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChildrenProp } from "../types/types";

const ScrollToTop = ({ children }: ChildrenProp) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return children;
};

export default ScrollToTop;
