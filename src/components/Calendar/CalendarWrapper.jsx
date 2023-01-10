import React from "react";
import Calendar from "react-calendar";
import styles from "./styles.module.css";
import { flightsInputSlice } from "../../store/flightsInput";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { stylesNames } from "./stylesNames";

export const CalendarWrapper = ({ className, visibility }) => {
  const { changeDate } = flightsInputSlice.actions;
  const dispatch = useDispatch();

  return (
    visibility && (
      <div className={classNames(className, styles[stylesNames.calendar])}>
        <Calendar
          onChange={(value) => {
            const date = {
              year: value.getFullYear(),
              month: value.getMonth(),
              day: value.getDate(),
            };

            dispatch(changeDate(date));
          }}
        />
      </div>
    )
  );
};
