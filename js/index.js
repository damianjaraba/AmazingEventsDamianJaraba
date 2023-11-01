import { data } from "../modules/data.js";

const arrayEvents = data.events;
const currentDate = data.currentDate;
const containerCheckBox = document.getElementById("containerCheckBox");
const inputSearch = document.getElementById("inputSearch");
const containerCards = document.getElementById("containerCards");

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

function filterCategory(arrayEvent) {
  let checked = Array.from(
    document.querySelectorAll("input[type=checkbox]:checked")
  ).map((checkbox) => checkbox.value);

  let filteredEvents = [];
  arrayEvent.forEach((event) => {
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

// Función que genera las Cards de HOME

function createCard(arrayEvent) {
  if (arrayEvent.length === 0) {
    containerCards.innerHTML = `
    😨🤔🤔 ¡Oops! It seems we didn't find any results. Can you try again? 🤔🤔🤔
  `;
  } else {
    containerCards.innerHTML = "";
    let statusEvent;
    for (const event of arrayEvent) {
      if (event.date < currentDate) {
        statusEvent = "Past Events";
      } else {
        statusEvent = "Upcoming Events";
      }

      const card = document.createElement("div");
      card.className = "card card-items p-2";
      card.innerHTML = `
    <p class="position-absolute top-0 start-0 py-2 px-3 status text-light rounded fw-bold">${statusEvent}</p>
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
createCard(arrayEvents);

function superFilter(arrayEvents) {
  let filter = filterCategory(arrayEvents);
  let filter2 = filterText(filter);

  createCard(filter2);
}

containerCheckBox.addEventListener("change", () => {
  superFilter(arrayEvents);
});

inputSearch.addEventListener("keyup", () => {
  superFilter(arrayEvents);
});
