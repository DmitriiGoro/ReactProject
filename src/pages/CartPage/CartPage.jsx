import {
  selectFlightsCartModuleEntities,
  selectFlightsCartModuleIds,
} from "../../store/flightsCart/selectors";
import { useSelector } from "react-redux";
import { FlightCardWithTransfer } from "../../components/FlightCardWithTransfer/FlightCardWithTransfer";
import { FlightCard } from "../../components/FlightCard/FlightCard";
import styles from "./styles.module.css";
import { stylesNames } from "./stylesNames";

export const CartPage = () => {
  const cartFlightsIds = useSelector((state) =>
    selectFlightsCartModuleIds(state)
  );
  const cartFlightsEntities = useSelector((state) =>
    selectFlightsCartModuleEntities(state)
  );

  return (
    <ul className={styles[stylesNames.list]}>
      {cartFlightsIds?.map((id) => {
        const { flight } = cartFlightsEntities[id];

        return flight.has_transfers ? (
          <li
            key={flight.details
              .map(({ arrival, departure }) => arrival + departure)
              .join("")}
          >
            <FlightCardWithTransfer removable flight={flight} />
          </li>
        ) : (
          <li key={flight.thread.uid}>
            <FlightCard removable flight={flight} />
          </li>
        );
      })}
    </ul>
  );
};
