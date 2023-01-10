import { selectFlightsError } from "../../store/flights/selectors";
import { useSelector } from "react-redux";

export const ErrorPage = () => {
  const { text, http_code } = useSelector((state) => selectFlightsError(state));
  return (
    <div>
      <span>{text}</span>
      <span>{http_code}</span>
    </div>
  );
};
