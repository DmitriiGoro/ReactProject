import { stylesNames } from "./stylesNames";
import styles from "./styles.module.css";

export const NotFoundPage = () => {
  return (
    <div className={styles[stylesNames.notFoundPage]}>
      <span>Sorry, the page you are looking for doesn`t exist</span>
    </div>
  );
};
