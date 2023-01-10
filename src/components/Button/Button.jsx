import styles from "./styles.module.css";
import { stylesNames } from "./stylesNames";
import classnames from "classnames";

export const Button = ({ onClick, className, children, forwardedRef }) => {
  return (
    <button
      ref={forwardedRef}
      className={(className, styles[stylesNames.button])}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
