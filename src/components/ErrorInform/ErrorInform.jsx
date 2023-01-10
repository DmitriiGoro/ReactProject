import styles from "./styles.module.css";
import { stylesNames } from "./stylesNames";

export const ErrorInform = ({ errorText, errorCode }) => {
  return (
    <div className={styles[stylesNames.errorInform]}>
      <h3 className={styles[stylesNames.errorInformTitle]}>An error occured</h3>
      <span>{errorText}</span>
      <span>The error code: {errorCode}</span>
    </div>
  );
};
