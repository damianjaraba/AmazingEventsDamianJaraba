import {
  urlApi,
  filterCategory,
  category,
  createCard,
  superFilter,
} from "../modules/functions.js";

fetch(urlApi)
  .then((res) => res.json())
  .then((data) => {
    const $arrayEvents = data.events;
    const $currentDate = data.currentDate;


    category($arrayEvents);

    filterCategory($arrayEvents);

    superFilter($arrayEvents);

    createCard($arrayEvents, $currentDate);
  });
