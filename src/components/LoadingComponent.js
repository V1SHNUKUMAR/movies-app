import React from "react";
import loading from "../assets/loading.svg";

const LoadingComponent = () => {
  return (
    <div className="h-48 md:h-72 grid place-items-center">
      <img className="h-2/3 w-auto" src={loading} alt="Loading..." />
    </div>
  );
};

export default LoadingComponent;
