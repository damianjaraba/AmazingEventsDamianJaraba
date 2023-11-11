import { urlApi, createTables } from "../modules/functions.js";

fetch(urlApi)
  .then((resp) => resp.json())
  .then((data) => {
    const $arrayEvents = data.events;
    createTables($arrayEvents, data)
  });

