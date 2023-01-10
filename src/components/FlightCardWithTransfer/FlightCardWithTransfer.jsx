import { normalizeTransferFlight } from "../../store/utils/normalizeTransferFlight";
import styles from "./styles.module.css";
import classnames from "classnames";
import ArrivalPlane from "../../images/icons/arrival_plane.svg";
import DeparturePlane from "../../images/icons/departure_plane.svg";
import { useDispatch } from "react-redux";
import { flightsCartSlice } from "../../store/flightsCart";
import { SvgButton } from "../SvgButton/SvgButton";
import { ReactComponent as AddLogo } from "../../images/icons/add_icon.svg";
import { ReactComponent as ShareLogo } from "../../images/icons/share_icon.svg";
import { ReactComponent as CloseIcon } from "../../images/icons/close_button.svg";
import { copyToClipboard } from "../../constants/copyToClipboard";
import { stylesNames } from "./stylesNames";
import { FlightProgressLine } from "../FlightProgressLine/FlightProgressLine";
import { useSelector } from "react-redux";
import {
  selectFlightFromCartByString,
  selectFlightsCartModuleEntities,
} from "../../store/flightsCart/selectors";
import { useStore } from "react-redux";

export const FlightCardWithTransfer = ({ flight, removable = false }) => {
  const { addFlight, removeFlight } = flightsCartSlice.actions;
  const dispatch = useDispatch();
  const store = useStore();

  const {
    time,
    details,
    depDate,
    depTime,
    arrDate,
    arrTime,
    arrival_to,
    departure_from,
    transferTime,
    totalDuration,
    transfers,
  } = normalizeTransferFlight(flight);

  const flightString = `${arrTime}${transfers
    .map(({ code }) => code)
    .join("")}${depTime}`;

  const storeFlight = useSelector((state) =>
    selectFlightFromCartByString(state, { flightString })
  );

  return (
    <div className={styles.root}>
      <div className={styles[stylesNames.cardTop]}>
        <div className={classnames(styles[stylesNames.cardInfo])}>
          <FlightProgressLine flights={details} timeTotal={totalDuration} />
        </div>
        <div className={styles.tools}>
          <SvgButton
            disabled={storeFlight ? true : false}
            tooltipText={"Click to add the flight to the cart"}
            icon={<AddLogo width={25} height={25} />}
            onClick={() => {
              dispatch(
                addFlight({
                  flightNumber: flightString,
                  flight,
                })
              );
            }}
          />
          <SvgButton
            className={styles[stylesNames.copyButton]}
            tooltipText={"Click to copy current url"}
            icon={<ShareLogo width={25} height={25} />}
            onClick={() => {
              copyToClipboard();
            }}
          />
          {removable && (
            <SvgButton
              tooltipText={"Click to delete flight from favorites"}
              icon={<CloseIcon width={16} height={16} />}
              onClick={() => {
                dispatch(removeFlight(flightString));
              }}
            />
          )}
        </div>
      </div>
      <div className={classnames(styles[stylesNames.cardMiddle])}>
        <div className={classnames(styles[stylesNames.cardInner])}>
          <div className={classnames(styles[stylesNames.cardInnerInfo])}>
            <span>{departure_from?.title}</span>
            <img
              className={styles.logo}
              src={DeparturePlane}
              alt="taking-off plane logo"
              loading="lazy"
            />
          </div>
          <span>{depDate}</span>
          <span>{depTime}</span>
        </div>
        <div className={classnames(styles[stylesNames.durationContainer])}>
          <span className={classnames(styles[stylesNames.durationMain])}>
            {time}
          </span>
          <span className={classnames(styles[stylesNames.durationAddition])}>
            ( including {transferTime} for transfer )
          </span>
        </div>
        <div className={classnames(styles[stylesNames.cardInner])}>
          <div className={classnames(styles[stylesNames.cardInnerInfo])}>
            <img
              className={styles.logo}
              src={ArrivalPlane}
              alt="landing plane logo"
              loading="lazy"
            />
            <span>{arrival_to?.title}</span>
          </div>
          <span>{arrDate}</span>
          <span>{arrTime}</span>
        </div>
      </div>
    </div>
  );
};
