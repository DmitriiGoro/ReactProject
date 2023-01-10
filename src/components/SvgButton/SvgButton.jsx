import styles from "./styles.module.css";
import classnames from "classnames";
import { stylesNames } from "./stylesNames";

export const SvgButton = ({
  icon,
  onClick,
  tooltipText,
  className,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      className={classnames(styles[stylesNames.button], className)}
      onClick={onClick}
    >
      {tooltipText ? (
        <span className={styles[stylesNames.tooltip]}>{tooltipText}</span>
      ) : (
        ""
      )}
      <span className={styles[stylesNames.icon]}>{icon}</span>
    </button>
  );
};
