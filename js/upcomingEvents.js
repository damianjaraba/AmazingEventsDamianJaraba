import {
  category,
  filterCategory,
  $arrayEvents,
  $currentDate,
  createCard,
  superFilter,
} from "../modules/functions.js";

const $arrayUpcomingEvents = [];

for (let event of $arrayEvents) {
  if (event.date > $currentDate) {
    $arrayUpcomingEvents.push(event);
  }
}

function preventRefresh($arrayEvents) {
  $arrayEvents.preventDefault();
}

//Array para guardar las categorias
category();

filterCategory($arrayEvents);
// Función que genera las Cards de UPCOMING EVENTS
createCard($arrayUpcomingEvents);

superFilter($arrayUpcomingEvents);
