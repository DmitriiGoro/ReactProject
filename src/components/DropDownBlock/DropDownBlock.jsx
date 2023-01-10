import styles from "./styles.module.css";
import { stylesNames } from "./stylesNames";

export const DropDownBlock = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className={styles[stylesNames.dropdownBlock]}>
      {children}
    </div>
  );
};
