import { getTime } from "./getTime";

export const normalizeFlight = (flight) => {
  let { arrival, departure, duration, thread, to, from } = flight;

  const { arrivalObject, departureObject, time } = getTime({
    duration,
    arrival,
    departure,
  });

  const { depDate, depTime } = departureObject;
  const { arrDate, arrTime } = arrivalObject;
  const { title: departureTitle } = from;
  const { title: arrivalTitle } = to;

  const { carrier, number: flightNumber, uid, vehicle, short_title } = thread;
  const {
    logo_svg,
    title: carrierTitle,
    url,
    codes: { iata },
  } = carrier;

  return {
    arrival,
    departure,
    time,
    departureTitle,
    arrivalTitle,
    flightNumber,
    uid,
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
  };
};
