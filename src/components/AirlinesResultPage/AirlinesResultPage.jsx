import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAirlinesLoadingStatus,
  selectAirlinesDownloadStep,
  selectAirlinesIds,
} from "../../store/airlines/selectors";
import { useParams } from "react-router-dom";
import { fetchAirline } from "../../store/airlines/airlines";
import { useLayoutEffect } from "react";
import { makeRequestString } from "../../store/utils/makeRequestString";
import { AirlineCard } from "../AirlineCard/AirlineCard";
import styles from "./styles.module.css";
import { stylesNames } from "./stylesNames";
import { Button } from "../Button/Button";
import { useState, useRef } from "react";
import { LoadingStatuses } from "../../constants/loadingStatuses";

export const AirlinesResultPage = () => {
  const { airlineInput } = useParams();
  const dispatch = useDispatch();
  const ref = useRef();

  const airlineIds = useSelector((state) => selectAirlinesIds(state));

  const step = useSelector((state) => selectAirlinesDownloadStep(state));

  useLayoutEffect(() => {
    dispatch(fetchAirline({ airlineInput }));
  }, [airlineInput]);

  const status = useSelector((state) => selectAirlinesLoadingStatus(state));
  console.log(status);

  if (!airlineIds.length && status === LoadingStatuses.success) {
    return (
      <div className={styles[stylesNames.rootEmpty]}>
        <span>
          Unfortunately we couldn`t find any airline satisfying your request.
          Try to make another one.
        </span>
      </div>
    );
  }

  return (
    <>
      <h2>Results</h2>

      <ul className={styles[stylesNames.root]}>
        {airlineIds?.length > 0 &&
          airlineIds.map((id) => (
            <li className={styles[stylesNames.cardWrapper]} key={id}>
              <AirlineCard airlineId={id} />
            </li>
          ))}
      </ul>
      <div className={styles[stylesNames.buttonWrapper]}>
        <Button
          forwardedRef={ref}
          onClick={async () => {
            ref.current.disabled = true;
            console.log(ref.current.disabled);

            await dispatch(fetchAirline({ airlineInput, step }));
            ref.current.disabled = false;
          }}
        >
          {status === LoadingStatuses.inProgress ? (
            <div className={styles[stylesNames.loaderContainer]}>
              <div className={styles[stylesNames.spinner]}></div>
            </div>
          ) : (
            "Show more"
          )}
        </Button>
      </div>
      {status === LoadingStatuses.inProgress ? (
        <div className={styles[stylesNames.loadingBlock]}></div>
      ) : (
        ""
      )}
    </>
  );
};
