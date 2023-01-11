import React from "react";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { stylesNames } from "./stylesNames";

export const Tab = ({ className = "", name }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/${name}`)}
      className={classnames(className, styles[stylesNames.tab])}
    >
      Find the {name}
    </button>
  );
};
