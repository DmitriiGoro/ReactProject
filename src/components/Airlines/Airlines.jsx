import React from "react";
import { useRef } from "react";
import { useDispatch, useStore, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import styles from "./styles.module.css";
import { stylesNames } from "./stylesNames";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { makeRequestString } from "../../store/utils/makeRequestString";
import { Button } from "../Button/Button";
import { selectAirlinesLoadingStatus } from "../../store/airlines/selectors";
import { LoadingStatuses } from "../../constants/loadingStatuses";

export const Airlines = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const status = useSelector((state) => selectAirlinesLoadingStatus(state));

  return (
    <>
      <div className={styles[stylesNames.root]}>
        <h2 className={styles[stylesNames.rootTitle]}>Check airline</h2>
        <Form
          onSubmit={async (values) => {
            const airlineInput = makeRequestString(values);
            navigate(airlineInput);
          }}
          initialValues={{ query: "name" }}
        >
          {(props) => (
            <form
              className={styles[stylesNames.form]}
              onSubmit={props.handleSubmit}
            >
              <div className={styles[stylesNames.rootMain]}>
                <Field
                  className={styles[stylesNames.input]}
                  component="input"
                  name="airline"
                  required
                  placeholder="airline"
                  type="text"
                />
                <Button forwardedRef={ref} type="submit">
                  {status === LoadingStatuses.inProgress ? (
                    <div className={styles[stylesNames.loaderContainer]}>
                      <div className={styles[stylesNames.spinner]}></div>
                    </div>
                  ) : (
                    "Click"
                  )}
                </Button>
              </div>
              <div className={styles[stylesNames.radiosBlock]}>
                <h3>Search by</h3>
                <label className={styles[stylesNames.radiosBlockField]}>
                  <Field
                    component="input"
                    name="query"
                    value="name"
                    type="radio"
                  />
                  <span className={styles[stylesNames.radiosBlockRadioName]}>
                    aircompany
                  </span>{" "}
                  <br></br> name
                </label>
                <label className={styles[stylesNames.radiosBlockField]}>
                  <Field
                    component="input"
                    name="query"
                    value="iata"
                    type="radio"
                  />
                  <span className={styles[stylesNames.radiosBlockRadioIata]}>
                    iata
                  </span>{" "}
                  <br></br>
                  code
                </label>
              </div>
            </form>
          )}
        </Form>
      </div>
      <Outlet />
    </>
  );
};
