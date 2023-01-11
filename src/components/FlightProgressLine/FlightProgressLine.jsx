import { stylesNames } from "./stylesNames";
import styles from "./styles.module.css";
import classnames from "classnames";
import { getTime } from "../../store/utils/getTime";
import { useNavigate } from "react-router-dom";

export const FlightProgressLine = ({ flights, timeTotal }) => {
  const [start] = flights;
  const end = flights.at(-1);
  const navigate = useNavigate();

  if (!flights.length) {
    return null;
  }

  return (
    <div className={styles[stylesNames.root]}>
      <span className={styles[stylesNames.rootDeparture]}>
        {start.from.title}
      </span>
      <div className={styles[stylesNames.rootContainer]}>
        {flights.map(
          ({
            thread,
            is_transfer,
            duration,
            transfer_point,
            transfer_from,
            transfer_to,
          }) => {
            const { time: currentDuration } = getTime({ duration });

            if (is_transfer) {
              return (
                <div
                  key={
                    duration +
                    transfer_from.code +
                    transfer_point.code +
                    transfer_to.code
                  }
                  className={classnames(
                    styles[stylesNames.progressLine],
                    styles[stylesNames.progressLineTransfer]
                  )}
                  style={{ flexGrow: (duration / timeTotal).toFixed(2) }}
                  data-city-name={transfer_point.short_title}
                >
                  <div className={styles[stylesNames.progressLineTooltip]}>
                    <span className={styles[stylesNames.duration]}>
                      <b>Transfer:</b> {currentDuration}
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={thread.uid}
                style={{ flexGrow: (duration / timeTotal).toFixed(2) }}
                className={styles[stylesNames.progressLine]}
              >
                <div
                  onClick={() => {
                    navigate(
                      `/airlines/query=iata&airline=${thread.carrier.codes.iata}`
                    );
                  }}
                  className={styles[stylesNames.progressLineTooltip]}
                >
                  <span className={styles[stylesNames.duration]}>
                    {thread.short_title}
                  </span>
                  <span>
                    <b>Carrier: </b>
                    {thread.carrier.title}
                  </span>
                  <span>
                    <b>Flight: </b>
                    {thread.number}
                  </span>
                  <span>{currentDuration}</span>
                </div>
              </div>
            );
          }
        )}
      </div>
      <span className={styles[stylesNames.rootArrival]}>{end.to.title}</span>
    </div>
  );
};
