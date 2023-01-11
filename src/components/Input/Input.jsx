import React from "react";
import { flightsInputSlice } from "../../store/flightsInput";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import styles from "./styles.module.css";
import { stylesNames } from "./stylesNames";
import { selectFilteredIataCodes } from "../../store/iataCodes/selectors";
import { useState, useRef, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { DropDownBlock } from "../DropDownBlock/DropDownBlock";

export const Input = ({ name, required }) => {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 300);
  const { changeInput } = flightsInputSlice.actions;
  const dispatch = useDispatch();

  const ref = useRef();

  const selector = useCallback(selectFilteredIataCodes(), []);
  const filteredCodes = useSelector((state) =>
    selector(state, { inputValue: debouncedValue })
  );

  return (
    <div className={classnames(styles[stylesNames.root])}>
      <input
        ref={ref}
        className={classnames(styles[stylesNames.input])}
        onChange={(event) => {
          setValue(event.target.value);
          dispatch(changeInput({ value: event.target.value, name }));
        }}
        placeholder={name}
        required={required}
        type="text"
      />
      {filteredCodes?.length > 0 && (
        <div className={styles[stylesNames.dropdown]}>
          <div className={styles[stylesNames.dropdownContent]}>
            {filteredCodes.map((citiesAndCodes) => {
              const [city, code] = citiesAndCodes;
              return (
                <DropDownBlock
                  key={code}
                  onClick={() => {
                    ref.current.value = code;
                    dispatch(changeInput({ name, value: code }));
                  }}
                >
                  <span>{city}</span>
                  <span>{code}</span>
                </DropDownBlock>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
