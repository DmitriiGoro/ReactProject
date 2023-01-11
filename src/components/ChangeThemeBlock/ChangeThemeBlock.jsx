import styles from "./styles.module.css";
import { stylesNames } from "./stylesNames";
import { ReactComponent as SunIcon } from "../../images/icons/sun_icon.svg";
import { ReactComponent as MoonIcon } from "../../images/icons/moon_icon.svg";
import { ReactComponent as TogglerIcon } from "../../images/icons/toggler_icon.svg";
import { useRef } from "react";

export const ChangeThemeBlock = ({ forwardedRef }) => {
  const checkBoxRef = useRef();

  return (
    <label
      onClick={() =>
        checkBoxRef?.current.checked
          ? forwardedRef?.current.setAttribute("data-theme", "dark")
          : forwardedRef?.current.removeAttribute("data-theme")
      }
      className={styles[stylesNames.toggler]}
    >
      <input
        type="checkbox"
        ref={checkBoxRef}
        className={styles[stylesNames.togglerInput]}
      />

      <div className={styles[stylesNames.togglerState]}>
        <SunIcon className={styles[stylesNames.togglerIconSun]} />
        <div className={styles[stylesNames.togglerControl]}>
          <TogglerIcon
            height={18}
            width={18}
            className={styles[stylesNames.togglerIcon]}
          />
        </div>
        <MoonIcon className={styles[stylesNames.togglerIconMoon]} />
      </div>
    </label>
  );
};
