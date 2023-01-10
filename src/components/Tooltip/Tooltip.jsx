import styles from "./styles.module.css";
import classnames from "classnames";

export const Tooltip = ({ message, className }) => {
  return <span className={classnames(className)}>{message}</span>;
};
