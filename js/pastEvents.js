import {
  urlApi,
  filterCategory,
  category,
  createCardDetail,
  superFilter,
} from "../modules/functions.js";

fetch(urlApi)
  .then((res) => res.json())
  .then((data) => {
    const $arrayEvents = data.events;
    const $currentDate = data.currentDate;

    const $pastEvents = [];

    for (let event of $arrayEvents) {
      if (Date.parse(event.date) < Date.parse($currentDate)) {
        $pastEvents.push(event);
      }
    }

    category($pastEvents);
    filterCategory($pastEvents);
    superFilter($pastEvents);
    createCardDetail($pastEvents, $currentDate);
  });
