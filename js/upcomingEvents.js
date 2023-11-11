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

    const $arrayUpcomingEvents = [];

    for (let event of $arrayEvents) {
      if (Date.parse(event.date) > Date.parse($currentDate)) {
        $arrayUpcomingEvents.push(event);
      }
    }

    category($arrayUpcomingEvents);
    filterCategory($arrayUpcomingEvents);
    superFilter($arrayUpcomingEvents);
    createCardDetail($arrayUpcomingEvents, $currentDate);
  });
