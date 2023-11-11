export let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

const $containerCards = document.getElementById("containerCards");
const $containerCheckBox = document.getElementById("containerCheckBox");
const $inputSearch = document.getElementById("inputSearch");
const $containerDetails = document.getElementById("containerDetails");
const $statisticsEvents = document.getElementById("statisticsEvents");
const $upcomingEventsStatistics = document.getElementById("upcomingEventsStatistics");
const $pastEventsStatistics = document.getElementById("pastEventsStatistics");


//Array que guarda las categorias para pintar los checkbox

export function category(arrayEvent) {
  let categories = [];
  categories = Array.from(new Set(arrayEvent.map((event) => event.category)));

  categories.forEach((category) => {
    let divCheckBox = document.createElement("div");
    divCheckBox.classList.add("form-check", "form-check-inline");
    divCheckBox.innerHTML = `
        <input class="form-check-input" role="button" type="checkbox" id=${category} value='${category}'>
        <label class="form-check-label text-light" role="button" for=${category}>${category}</label>
    `;
    $containerCheckBox.appendChild(divCheckBox);
  });
}

// Función que genera los filtros

export function filterCategory(arrayEvent) {
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
    return arrayEvent;
  }
  return filteredEvents;
}

//Función que me filtra por texto
export function filterText(arrayEvent) {
  return arrayEvent.filter((event) =>
    event.name.toLowerCase().includes($inputSearch.value.toLowerCase())
  );
}

//Función que me pinta las cards
export function createCard(arrayEvent, currentDate) {
  if (arrayEvent.length === 0) {
    $containerCards.innerHTML = `
    😨🤔🤔 ¡Oops! It seems we didn't find any results. Can you try again? 🤔🤔🤔
    `;
  } else {
    $containerCards.innerHTML = "";
    let statusEvent;
    for (const event of arrayEvent) {
      if (Date.parse(event.date) > Date.parse(currentDate)) {
        statusEvent = "Upcoming Events";
      } else {
        statusEvent = "Past Events";
      }

      const card = document.createElement("div");
      card.className = "card card-items p-2";
      card.innerHTML = `
      <p class="position-absolute top-0 start-0 py-2 px-3 status text-light rounded fw-bold">${statusEvent}</p>
    <img src="${event.image}" class="card-img-top rounded" alt="${event.name}">
    <div class="card-body">
    <h5 class="card-title">${event.name}</h5>
    <p class="card-text">${event.description}</p>
    <div class="d-flex justify-content-between align-items-center">
    <p class="m-0"><strong>Price:</strong> $${event.price} USD</p>
    <a href="./pages/details.html?id=${event._id}" class="btn btn-primary"><strong>Details</strong></a>
    </div>
    </div>`;

      $containerCards.appendChild(card);
    }
  }
}

//Función que pinta PastEvent y upComingEvents
export function createCardDetail(arrayEvent, currentDate) {
  if (arrayEvent.length === 0) {
    $containerCards.innerHTML = `
    😨🤔🤔 ¡Oops! It seems we didn't find any results. Can you try again? 🤔🤔🤔
    `;
  } else {
    $containerCards.innerHTML = "";
    let statusEvent;
    for (const event of arrayEvent) {
      if (Date.parse(event.date) > Date.parse(currentDate)) {
        statusEvent = "Upcoming Events";
      } else {
        statusEvent = "Past Events";
      }

      const card = document.createElement("div");
      card.className = "card card-items p-2";
      card.innerHTML = `
      <p class="position-absolute top-0 start-0 py-2 px-3 status text-light rounded fw-bold">${statusEvent}</p>
    <img src="${event.image}" class="card-img-top rounded" alt="${event.name}">
    <div class="card-body">
    <h5 class="card-title">${event.name}</h5>
    <p class="card-text">${event.description}</p>
    <div class="d-flex justify-content-between align-items-center">
    <p class="m-0"><strong>Price:</strong> $${event.price} USD</p>
    <a href="../pages/details.html?id=${event._id}" class="btn btn-primary"><strong>Details</strong></a>
    </div>
    </div>`;

      $containerCards.appendChild(card);
    }
  }
}

//Función para filtrar
export function superFilter(arrayEvent) {
  let filter = filterCategory(arrayEvent);
  let filter2 = filterText(filter);

  $containerCheckBox.addEventListener("change", () => {
    superFilter(arrayEvent);
  });

  $inputSearch.addEventListener("keyup", () => {
    superFilter(arrayEvent);
  });
  createCard(filter2);
}

// Función que genera las Cards de DETAILS
export function createCardDetails(arrayEvent) {
  let assistance;

  if (arrayEvent.assistance !== undefined) {
    assistance = `<p class="card-text"><span class="p-2 rounded  bg-warning"><strong>Assistance:</strong></span> ${arrayEvent.assistance}</p>`;
  } else {
    assistance = `<p class="card-text"><span class=" p-2 rounded bg-success"><strong>Estimate:</strong></span> ${arrayEvent.estimate}</p>`;
  }

  const cardDetails = document.createElement("div");
  cardDetails.innerHTML = `
    <div class="card p-2 bg-dark-subtle">
          <div class="row no-gutters">
            <div class="col-md-6">
              <img src="${arrayEvent.image}"
                class="card-img h-100 w-100 img-fluid size-image" alt="${arrayEvent.name}">
            </div>
            <div class="col-md-6 ">
              <div class="card-body border border-primary rounded border-2">
                <h5 class="text-white bg-info text-color d-flex justify-content-center p-1 rounded-3 mb-2 fs-2 text-uppercase shadow mb-4">${arrayEvent.name}</h5>
                <p class="card-text"><strong>Category:</strong> ${arrayEvent.category}</p>
                <p class="card-text"><strong>Description:</strong> ${arrayEvent.description}.</p>
                <p class="card-text"><strong> Date:</strong> ${arrayEvent.date}</p>
                <p class="card-text"><strong>Place:</strong> ${arrayEvent.place}</p>
                <p class="card-text"><strong>Capacity:</strong> ${arrayEvent.capacity}</p>
                ${assistance}
                <p class="card-text"><strong>Price:</strong> $ ${arrayEvent.price}</p>
              </div>
            </div>
          </div>
        </div>
    `;

  $containerDetails.appendChild(cardDetails);
}

export function createTables(arrayEvent, data) {
  const eventsStatistics = arrayEvent.filter(
    (event) => Date.parse(data.currentDate) > Date.parse(event.date)
  );

  //Tabla 1 Events Statistics

  let sortedArray = eventsStatistics.sort(
    (a, b) => b.assistance / b.capacity - a.assistance / a.capacity
  );
  let eventsHighestAssistance = sortedArray[0];
  let eventsLowestAssistance = sortedArray[sortedArray.length - 1];
  let arrayCapacity = arrayEvent.sort((a, b) => b.capacity - a.capacity);
  let eventLargeCapacity = arrayCapacity[0];
  let tr = document.createElement("tr");
  tr.innerHTML = `
  <td>${eventsHighestAssistance.name}</td>
  <td>${eventsLowestAssistance.name}</td>
  <td>${eventLargeCapacity.name}</td>  
  `;
  $statisticsEvents.appendChild(tr);

  //Tabla 2 Upcoming events statistics by category

  const arrayUpcomingEvents = [];

  for (let event of arrayEvent) {
    if (Date.parse(event.date) > Date.parse(data.currentDate)) {
      arrayUpcomingEvents.push(event);
    }
  }

  const upComingCategories = arrayUpcomingEvents.map((event) => event.category);

  const arrayUpComingCategories = upComingCategories.filter(
    (value, index) => upComingCategories.indexOf(value) === index
  );

  arrayUpComingCategories.forEach((category) => {
    let filteredEvents = arrayUpcomingEvents.filter(
      (event) => event.category === category
    );

    let revenueUpComingEvents = filteredEvents
      .map((event) => event.estimate * event.price)
      .reduce((a, b) => a + b, 0);

    let percentageUpComingEvents =
      filteredEvents
        .map((event) => (event.estimate / event.capacity) * 100)
        .reduce((a, b) => a + b, 0) / filteredEvents.length;

    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${category}</td>
        <td>$ ${revenueUpComingEvents.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}</td>
        <td>${percentageUpComingEvents.toFixed(2)}%</td>
        `;
    $upcomingEventsStatistics.appendChild(tr);
  });

  //Tabla 3 Past events statistics by category
  const pastEvents = [];

  for (let event of arrayEvent) {
    if (Date.parse(event.date) < Date.parse(data.currentDate)) {
      pastEvents.push(event);
    }
  }

  const pastEventCategories = pastEvents.map((event) => event.category);
  const arrayPastEventCategories = pastEventCategories.filter(
    (value, index) => pastEventCategories.indexOf(value) === index
  );

  arrayPastEventCategories.forEach((category) => {
    let filteredEvents = pastEvents.filter(
      (event) => event.category === category
    );

    let revenuePastEvent = filteredEvents
      .map((event) => event.assistance * event.price)
      .reduce((a, b) => a + b, 0);

    let percentagePastEvent =
      filteredEvents
        .map((event) => (event.assistance / event.capacity) * 100)
        .reduce((a, b) => a + b, 0) / filteredEvents.length;

    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${category}</td>
        <td>$ ${revenuePastEvent.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}</td>
        <td>${percentagePastEvent.toFixed(2)}%</td>
        `;
    $pastEventsStatistics.appendChild(tr);
  });
}
