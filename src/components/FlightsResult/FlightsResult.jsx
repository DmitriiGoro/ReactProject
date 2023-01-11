import React from "react";
import { selectFlightByString } from "../../store/flights/selectors";
import { useSelector } from "react-redux";
import { FlightCard } from "../FlightCard/FlightCard";
import { FlightCardWithTransfer } from "../FlightCardWithTransfer/FlightCardWithTransfer";
import styles from "./styles.module.css";
import { stylesNames } from "./stylesNames";
import { EmptyResult } from "../EmptyResult/EmptyResult";

export const FlightsResult = ({ requestString }) => {
  const flight = useSelector((state) =>
    selectFlightByString(state, { requestString })
  );

  if (!flight) {
    return null;
  }

  const { segments } = flight;

  if (!segments.length) {
    return <EmptyResult />;
  }

  return (
    <ul className={styles[stylesNames.list]}>
      {segments?.map((flight) =>
        flight.has_transfers ? (
          <li
            key={flight.details
              .map(({ arrival, departure }) => arrival + departure)
              .join("")}
          >
            <FlightCardWithTransfer flight={flight} />
          </li>
        ) : (
          <li key={flight.thread.uid}>
            <FlightCard flight={flight} />
          </li>
        )
      )}
    </ul>
  );
};
