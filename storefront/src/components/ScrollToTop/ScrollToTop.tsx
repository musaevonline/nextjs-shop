import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {ssrMode} from "@temp/constants";

const ScrollToTop:React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!ssrMode) {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;