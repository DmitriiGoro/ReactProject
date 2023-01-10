export const getTime = ({ arrival = 0, departure = 0, duration = 0 }) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.round((duration - hours * 3600) / 60);

  const time =
    (hours > 0 ? `${hours} hours` : "") +
    " " +
    (minutes > 1
      ? `${minutes} minutes`
      : minutes === 1
      ? `${minutes} minute`
      : "");

  const arrivalObject = {
    arrDate: new Date(arrival).toLocaleDateString("en", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    arrTime: new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(arrival)),
  };

  const departureObject = {
    depDate: new Date(departure).toLocaleDateString("en", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    depTime: new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(departure)),
  };

  return { time, departureObject, arrivalObject };
};
