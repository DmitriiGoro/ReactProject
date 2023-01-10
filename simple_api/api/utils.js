const reply = (res, body, timeout = 1000, status = 200) =>
  setTimeout(() => {
    res.status(status).json(body);
  }, timeout);

const getById = (entities) => (id) =>
  entities.find((entity) => entity.id === id);

const getByName =
  (entities) =>
  (name, limit = 0) => {
    const result = [];

    for (const entity of entities) {
      if (entity.name === null) {
        continue;
      }
      if (
        entity.name
          .replace(/[ ]+/g, "")
          .toLowerCase()
          .includes(name.replace(/[ ]+/g, "").toLowerCase())
      ) {
        result.push(entity);
      }
      if (limit > 0 && result.length >= limit) {
        break;
      }
    }
    return result;
  };

const getByIataCode =
  (entities) =>
  (iata, limit = 0) => {
    const result = [];

    for (const entity of entities) {
      if (entity.iata_code === null) {
        continue;
      }
      if (
        entity.iata_code
          .toLowerCase()
          .includes(iata.replace(/[ ]+/g, "").toLowerCase())
      ) {
        result.push(entity);
      }
      if (limit > 0 && result.length >= limit) {
        break;
      }
    }
    return result;
  };

module.exports = { reply, getById, getByName, getByIataCode };
