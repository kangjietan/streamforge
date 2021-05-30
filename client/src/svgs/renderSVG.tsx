import React from "react";

import ChevronCircleRight from "./chevronCircleRight";
import ChevronCircleLeft from "./chevronCircleLeft";

const renderSVG = (svg: string) => {
  switch (svg) {
    case "chevronCircleRight":
      return <ChevronCircleRight />;
    case "chevronCircleLeft":
      return <ChevronCircleLeft />;
    default:
      return null;
  }
};

export default renderSVG;
