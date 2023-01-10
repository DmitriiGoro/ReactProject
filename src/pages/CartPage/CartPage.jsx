import {
  selectFlightsCartModule,
  selectFlightsCartModuleEntities,
  selectFlightsCartModuleIds,
} from "../../store/flightsCart/selectors";
import { useSelector } from "react-redux";
import { FlightCardWithTransfer } from "../../components/FlightCardWithTransfer/FlightCardWithTransfer";
import { FlightCard } from "../../components/FlightCard/FlightCard";
import styles from "./styles.module.css";
import { stylesNames } from "./stylesNames";
import { flightsCartSlice } from "../../store/flightsCart";

export const CartPage = () => {
  const { removeFlight } = flightsCartSlice.actions;
  const cart = useSelector((state) => selectFlightsCartModule(state));
  const cartFlightsIds = useSelector((state) =>
    selectFlightsCartModuleIds(state)
  );
  const cartFlightsEntities = useSelector((state) =>
    selectFlightsCartModuleEntities(state)
  );

  console.log(cart);

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
