import React from "react";
import { flightsInputNames } from "../../constants/flightsInputNames";
import { Input } from "../Input/Input";
import { useStore } from "react-redux";
import styles from "./styles.module.css";
import classnames from "classnames";
import { InputDate } from "../InputDate/InputDate";
import { Outlet, useNavigate } from "react-router-dom";
import { makeRequestString } from "../../store/utils/makeRequestString";
import { stylesNames } from "./stylesNames";
import { fetchIataCodes } from "../../store/iataCodes";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { Button } from "../Button/Button";

const CalendarWithMemo = React.memo(InputDate);

export const Flights = () => {
  const flightsInputNamesArray = Object.values(flightsInputNames);
  const navigate = useNavigate();
  const store = useStore();

  return (
    <div className={styles[stylesNames.flightBlock]}>
      <h2 className={classnames(styles[stylesNames.title])}>Check flight</h2>

      <form
        onSubmit={(event) => {
          event.preventDefault();

          const { flightsInput } = store.getState();

          const requestString = makeRequestString(flightsInput);

          navigate(requestString);
        }}
        className={classnames(styles[stylesNames.root])}
      >
        <div className={styles[stylesNames.wrapper]}>
          {flightsInputNamesArray.length > 0 &&
            flightsInputNamesArray.map((name) =>
              name === "date" ? (
                <CalendarWithMemo key={name} name={name} />
              ) : (
                <Input required key={name} name={name} />
              )
            )}
        </div>
        <Button className={styles.button}>Click</Button>
      </form>
      <Outlet />
    </div>
  );
};
