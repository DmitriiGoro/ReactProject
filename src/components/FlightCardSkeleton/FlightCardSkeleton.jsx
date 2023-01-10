import styles from "./styles.module.css";
import classnames from "classnames";
import { stylesNames } from "./stylesNames";

export const FlightCardSkeleton = () => {
  return (
    <div className={classnames(styles.skeleton)}>
      <div className={styles[stylesNames.skeletonTop]}>
        <div
          className={classnames(
            styles[stylesNames.skeletonLogo],
            styles[stylesNames.skeletonBox]
          )}
        ></div>
        <div
          className={classnames(
            styles[stylesNames.skeletonString],
            styles[stylesNames.skeletonBox]
          )}
        ></div>
        <div
          className={classnames(
            styles[stylesNames.skeletonStringShort],
            styles[stylesNames.skeletonBox]
          )}
        ></div>
      </div>
      <div className={styles[stylesNames.skeletonMiddle]}>
        <div
          className={classnames(
            styles[stylesNames.skeletonString],
            styles[stylesNames.skeletonBox]
          )}
        ></div>
        <div
          className={classnames(
            styles[stylesNames.skeletonStringShort],
            styles[stylesNames.skeletonBox]
          )}
        ></div>
        <div
          className={classnames(
            styles[stylesNames.skeletonString],
            styles[stylesNames.skeletonBox]
          )}
        ></div>
      </div>
      <div
        className={classnames(
          styles[stylesNames.skeletonStringShort],
          styles[stylesNames.skeletonBox]
        )}
      ></div>
    </div>
  );
};
