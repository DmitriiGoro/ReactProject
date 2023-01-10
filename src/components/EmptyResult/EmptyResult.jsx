import styles from "./styles.module.css";
import { stylesNames } from "./stylesNames";

export const EmptyResult = () => {
  return (
    <div className={styles[stylesNames.emptyResult]}>
      <h2>No flights were found</h2>
      <span>The most possible reasons are:</span>
      <ul>
        <li>The arrival or departure airport doesn`t serve any flight.</li>
        <li>The selected dates are too late.</li>
      </ul>
    </div>
  );
};
