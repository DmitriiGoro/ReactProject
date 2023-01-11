import { DropDownBlock } from "../DropDownBlock/DropDownBlock";
import styles from "./styles.module.css";
import { stylesNames } from "./stylesNames";
import { selectFilteredIataCodes } from "../../store/iataCodes/selectors";
import { selectFlightsInputByName } from "../../store/flightsInput/selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";

export const DropDown = ({ name, onChange, className, onClick }) => {
  const [inputValue] = useDebounce(
    useSelector((state) =>
      selectFlightsInputByName(state, { inputName: name })
    ),
    300
  );

  const filteredCodes = useSelector((state) =>
    selectFilteredIataCodes(state, { inputValue })
  );

  const dispatch = useDispatch();

  return (
    filteredCodes?.length > 0 && (
      <div className={className}>
        <div className={styles[stylesNames.dropdownContent]}>
          {filteredCodes.map((cityAndCodes) => {
            const [city, code] = cityAndCodes;

            return (
              <DropDownBlock
                key={code}
                onClick={() => {
                  console.log(onClick);
                  onClick(code);
                  dispatch(onChange({ name, value: code }));
                }}
              >
                <span>{city}</span>
                <span>{code}</span>
              </DropDownBlock>
            );
          })}
        </div>
      </div>
    )
  );
};
