import {data} from "../modules/data.js"

const arrayEvents = data.events;
const currentDate = data.currentDate;

const arrayUpcomingEvents = [];

for (let event of arrayEvents) {
  if (event.date > currentDate) {
    arrayUpcomingEvents.push(event);
  }
}

const containerCards = document.getElementById("containerCards");

function preventRefresh(arrayEvents) {
  arrayEvents.preventDefault();
}

let arrayCheck = [];
arrayCheck = Array.from(
  new Set(arrayEvents.map((arrayCategory) => arrayCategory.category))
);

//Array para guardar las categorias
let categories = [];

categories = Array.from(new Set(arrayEvents.map((event) => event.category)));

categories.forEach((category) => {
  let divCheckBox = document.createElement("div");
  divCheckBox.classList.add("form-check", "form-check-inline");
  divCheckBox.innerHTML = `
      <input class="form-check-input" type="checkbox" id=${category} value='${category}'>
      <label class="form-check-label text-light" for=${category}>${category}</label>
  `;
  containerCheckBox.appendChild(divCheckBox);
});

function filterCategory(arrayEvents) {
  let checked = Array.from(
    document.querySelectorAll("input[type=checkbox]:checked")
  ).map((checkbox) => checkbox.value);

  let filteredEvents = [];
  arrayEvents.forEach((event) => {
    checked.forEach((category) => {
      if (category == event.category) {
        filteredEvents.push(event);
      }
    });
  });
  if (filteredEvents.length === 0) {
    return arrayEvents;
  }
  return filteredEvents;
}

filterCategory(arrayEvents);

function filterText(arrayEvent) {
  return arrayEvent.filter((event) =>
    event.name.toLowerCase().includes(inputSearch.value.toLowerCase())
  );
}

// Función que genera las Cards de UPCOMING EVENTS

function createCard(arrayEvent) {
  if (arrayEvent.length === 0) {
    containerCards.innerHTML = `
    😨🤔🤔 ¡Oops! It seems we didn't find any results. Can you try again? 🤔🤔🤔
  `;
  } else {
    containerCards.innerHTML = "";

    for (const event of arrayEvent) {
      const card = document.createElement("div");
      card.className = "card card-items p-2";
      card.innerHTML = `
    <img src="${event.image}" class="card-img-top rounded " alt="${event.name}">
    <div class="card-body">
    <h5 class="card-title">${event.name}</h5>
    <p class="card-text">${event.description}</p>
    <div class="d-flex justify-content-between align-items-center">
    <p class="m-0"><strong>Price:</strong> $${event.price} USD</p>
    <a href="../pages/details.html?id=${event._id}" class="btn btn-primary"><strong>Details</strong></a>
    </div>
    </div>`;

      containerCards.appendChild(card);
    }
  }
}
createCard(arrayUpcomingEvents);

function superFilter(arrayUpcomingEvents) {
  let filter = filterCategory(arrayUpcomingEvents);
  let filter2 = filterText(filter);

  createCard(filter2);
}

containerCheckBox.addEventListener("change", () => {
  superFilter(arrayUpcomingEvents);
});

inputSearch.addEventListener("keyup", () => {
  superFilter(arrayUpcomingEvents);
});
