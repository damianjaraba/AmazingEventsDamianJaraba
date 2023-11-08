import {
  category,
  filterCategory,
  $arrayEvents,
  $currentDate,
  createCard,
  superFilter,
} from "../modules/functions.js";

const $pastEvents = [];
for (let event of $arrayEvents) {
  if (event.date < $currentDate) {
    $pastEvents.push(event);
  }
}

category();
filterCategory($arrayEvents);
createCard($pastEvents);
superFilter($pastEvents);
