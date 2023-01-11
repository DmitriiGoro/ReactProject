import { CalendarWrapper } from "../Calendar/CalendarWrapper";
import CalendarLogo from "../../images/icons/calendar-svg.svg";
import styles from "./styles.module.css";
import React from "react";
import { useState, useRef } from "react";
import { selectFlightsInputDate } from "../../store/flightsInput/selectors";
import { useSelector } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import { stylesNames } from "./stylesNames";
import classnames from "classnames";

export const InputDate = ({ name, className }) => {
  const [visibility, setVisibility] = useState(false);
  const chosenDate = useSelector((state) => selectFlightsInputDate(state));
  const ref = useRef();

  return (
    <OutsideClickHandler onOutsideClick={() => setVisibility(false)}>
      <div
        onFocus={() => setVisibility(true)}
        className={classnames(styles[stylesNames.root], className)}
      >
        <input
          value={chosenDate}
          readOnly={true}
          className={classnames(styles.input)}
          placeholder={name}
          ref={ref}
        ></input>
        <img
          className={styles[stylesNames.calendarLogo]}
          onClick={() => ref.current.focus()}
          src={CalendarLogo}
          loading="lazy"
          alt="calendar logo"
        />
        <CalendarWrapper visibility={visibility} />
      </div>
    </OutsideClickHandler>
  );
};
