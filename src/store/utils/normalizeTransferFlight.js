import { getTime } from "./getTime";

export const normalizeTransferFlight = (flight) => {
  const { arrival, departure, details, arrival_to, departure_from, transfers } =
    flight;

  const totalDuration = details.reduce(
    (total, { duration }) => total + duration,
    0
  );
  const { arrivalObject, departureObject, time } = getTime({
    duration: totalDuration,
    arrival,
    departure,
  });

  const { duration: transferDuration } = details.find(
    (thread) => thread.is_transfer
  );
  const { time: transferTime } = getTime({ duration: transferDuration });

  const { depDate, depTime } = departureObject;
  const { arrDate, arrTime } = arrivalObject;

  return {
    totalDuration,
    depDate,
    depTime,
    arrDate,
    arrTime,
    details,
    arrival_to,
    departure_from,
    time,
    transferTime,
    transfers,
  };
};
