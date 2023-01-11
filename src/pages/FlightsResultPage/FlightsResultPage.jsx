import { useDispatch, useSelector } from "react-redux";
import { fetchFlight } from "../../store/flights";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { FlightsResult } from "../../components/FlightsResult/FlightsResult";
import { selectFlightsStatus } from "../../store/flights/selectors";
import { LoadingStatuses } from "../../constants/loadingStatuses";
import { flightsInputNames } from "../../constants/flightsInputNames";
import { FlightCardSkeleton } from "../../components/FlightCardSkeleton/FlightCardSkeleton";
import { selectFlightsError } from "../../store/flights/selectors";
import { ErrorInform } from "../../components/ErrorInform/ErrorInform";
import { stylesNames } from "./stylesNames";
import styles from "./styles.module.css";

export const FlightsResultPage = () => {
  const { requestString } = useParams();
  const dispatch = useDispatch();
  const status = useSelector((state) => selectFlightsStatus(state));
  const error = useSelector((state) => selectFlightsError(state));

  const params = new URLSearchParams(requestString);
  const [from, to, date] = Object.keys(flightsInputNames).map((inputName) =>
    params.get(inputName)
  );

  useEffect(() => {
    dispatch(fetchFlight({ from, to, date, requestString }));
  }, [requestString]);

  if (status === LoadingStatuses.inProgress) {
    return (
      <div>
        <h2 className={styles[stylesNames.title]}>Results</h2>
        <FlightCardSkeleton />
      </div>
    );
  } else if (status === LoadingStatuses.failed) {
    const { text, http_code } = error;
    return <ErrorInform errorText={text} errorCode={http_code} />;
  }

  return (
    <div>
      <h2 className={styles[stylesNames.title]}>Results</h2>
      <FlightsResult requestString={requestString}></FlightsResult>
    </div>
  );
};
