import { API_KEY } from "../API_KEY_YNDX";

export const AIRLINES_URL = new URL("http://localhost:3001/api/airlines");
export const IATA_CODES_URL = new URL("http://localhost:3001/api/iataCodes/");
export const YNDX_API_URL = new URL(
  `https://api.rasp.yandex.net/v3.0/search/?apikey=${API_KEY}&format=json&system=iata&transport_types=plane&lang=ru_RU&transfers=true`
);
