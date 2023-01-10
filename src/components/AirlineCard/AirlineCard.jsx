import React from "react";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { selectAirlinesEntityById } from "../../store/airlines/selectors";
import { selectCityNameByIataCode } from "../../store/iataCodes/selectors";
import { stylesNames } from "./stylesNames";

export const AirlineCard = ({ airlineId }) => {
  const airline = useSelector((state) =>
    selectAirlinesEntityById(state, { airlineId })
  );

  const {
    callsign,
    country_name,
    date_founded,
    fleet_average_age,
    fleet_size,
    iata_code,
    name,
    status,
    type,
    icao_code,
    hub_code,
  } = airline;

  // const cityHub = useSelector((state) =>
  //   selectCityNameByIataCode(state, { iataCode: hub_code })
  // );

  return (
    <div className={styles[stylesNames.root]}>
      <div className={styles[stylesNames.cardTextBlock]}>
        <span className={styles[stylesNames.cardTitle]}>
          Airline name: {name}
        </span>{" "}
        <span className={styles[stylesNames.cardTitleIata]}>
          IATA: {iata_code || "No information"}
        </span>
      </div>
      <div className={styles[stylesNames.cardTextBlockList]}>
        <ul>
          <li>Founded: {date_founded || "No information"}</li>
          <li>Fleet average age: {fleet_average_age || "No information"}</li>
          <li>Fleet size: {fleet_size || "No information"}</li>
          <li>Country name: {country_name || "No information"}</li>
          <li>Callsign: {callsign || "No information"}</li>
          <li>ICAO: {icao_code || "No information"}</li>
          <li>Hub: {hub_code || "No information"}</li>
        </ul>
      </div>
      <div className={styles[stylesNames.cardTextBlock]}>
        <span>Status: {status || "No information"}</span>
        <span>Type: {type || "No information"}</span>
      </div>
    </div>
  );
};
