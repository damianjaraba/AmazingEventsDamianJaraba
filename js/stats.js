import { $arrayEvents, $currentDate,} from "../modules/functions.js"

const $statisticsEvents = document.getElementById("statisticsEvents")

const eventsWithHighest = Math.max($arrayEvents.assistance)
console.log(eventsWithHighest);

const $arrayUpcomingEvents = [];
for (let event of $arrayEvents) {
  if (event.date > $currentDate) {
    $arrayUpcomingEvents.push(event);
  }
}

const $pastEvents = [];
for (let event of $arrayEvents) {
  if (event.date < $currentDate) {
    $pastEvents.push(event);
  }
}