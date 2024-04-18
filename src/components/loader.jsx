import React from "react";
import { AtomSpinner } from "react-epic-spinners";

import "./loader.css";

const CustomLoader = () => {
  return (
    <div className="loader-container">
      <div className="backdrop" />
      <div className="loader">
        <AtomSpinner color="#FF5573" size={50} />
      </div>
    </div>
  );
};

export default CustomLoader;
