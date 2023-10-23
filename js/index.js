const arrayEvents = data.events;

const containerCards = document.getElementById("container__cards");

function createCard(arrayEvent) {
  for (const event of arrayEvent) {
    const card = document.createElement("div");
    // card.className = "card card-items p-2";
    card.classList.add("card", "card-items", "p-2");
    card.innerHTML = `<img src="${event.image}" class="card-img-top rounded " alt="${event.name}">
    <div class="card-body">
    <h5 class="card-title">${event.name}</h5>
    <p class="card-text">${event.description}</p>
    <div class="d-flex justify-content-between align-items-center">
    <p class="m-0"><strong>Price:</strong> $ ${event.price}</p>
    <a href="./pages/details.html?=_id${event._id}" class="btn btn-primary"><strong>Details</strong></a>
    </div>
    </div>`;

    containerCards.appendChild(card);
  }
}
createCard(arrayEvents);
