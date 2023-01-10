import { normalizeFlight } from "../../store/utils/normalizeFlight";
import styles from "./styles.module.css";
import classnames from "classnames";
import ArrivalPlane from "../../images/icons/arrival_plane.svg";
import DeparturePlane from "../../images/icons/departure_plane.svg";
import { useDispatch, useSelector } from "react-redux";
import { flightsCartSlice } from "../../store/flightsCart";
import { SvgButton } from "../SvgButton/SvgButton";
import { ReactComponent as AddLogo } from "../../images/icons/add_icon.svg";
import { ReactComponent as ShareLogo } from "../../images/icons/share_icon.svg";
import { ReactComponent as CloseIcon } from "../../images/icons/close_button.svg";
import { copyToClipboard } from "../../constants/copyToClipboard";
import { stylesNames } from "./stylesNames";
import { selectFlightFromCartByString } from "../../store/flightsCart/selectors";
import { useNavigate } from "react-router-dom";

export const FlightCard = ({ flight, removable = false }) => {
  const { addFlight, removeFlight } = flightsCartSlice.actions;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    time,
    departureTitle,
    arrivalTitle,
    flightNumber,
    vehicle,
    logo_svg,
    carrierTitle,
    url,
    short_title,
    depDate,
    depTime,
    arrDate,
    arrTime,
    iata,
  } = normalizeFlight(flight);

  const cartFlight = useSelector((state) =>
    selectFlightFromCartByString(state, { flightString: flightNumber })
  );

  return (
    <div className={styles.root}>
      <div className={styles[stylesNames.cardTop]}>
        <div className={classnames(styles[stylesNames.cardInfo])}>
          <div className={classnames(styles[stylesNames.linkContainer])}>
            <span className={styles.tooltip}>Click to visit {url}</span>
            <a href={url}>
              <img src={logo_svg} alt="carries logo" loading="lazy" />
            </a>
          </div>
          <a
            onClick={() => {
              navigate(`/airlines/query=iata&airline=${iata}`);
            }}
            className={classnames(styles[stylesNames.title])}
          >
            {carrierTitle}
          </a>
          <span>{flightNumber}</span>
          <span>{short_title}</span>
        </div>
        <div className={styles.tools}>
          <SvgButton
            disabled={cartFlight ? true : false}
            tooltipText={"Click to add the flight to the cart"}
            icon={<AddLogo width={25} height={25} />}
            onClick={() => {
              dispatch(addFlight({ flightNumber, flight }));
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
                dispatch(removeFlight(flightNumber));
              }}
            />
          )}
        </div>
      </div>
      <div className={classnames(styles[stylesNames.cardMiddle])}>
        <div className={classnames(styles[stylesNames.cardInner])}>
          <div className={classnames(styles[stylesNames.cardInnerInfo])}>
            <span>{departureTitle}</span>
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
        <span>{time}</span>
        <div className={classnames(styles[stylesNames.cardInner])}>
          <div className={classnames(styles[stylesNames.cardInnerInfo])}>
            <img
              className={styles.logo}
              src={ArrivalPlane}
              alt="landing plane logo"
              loading="lazy"
            />
            <span>{arrivalTitle}</span>
          </div>
          <span>{arrDate}</span>
          <span>{arrTime}</span>
        </div>
      </div>
      <div className={classnames(styles[stylesNames.cardAircraftType])}>
        <span>{vehicle}</span>
      </div>
    </div>
  );
};
