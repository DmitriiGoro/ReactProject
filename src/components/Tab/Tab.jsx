import React from "react";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";

export const Tab = ({ className = "", name }) => {
  const navigate = useNavigate();
  console.log(name);

  return (
    <button
      onClick={() => navigate(`${name}`)}
      className={classnames(className)}
    >
      {name}
    </button>
  );
};
