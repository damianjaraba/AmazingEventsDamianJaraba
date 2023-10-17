const arrayEvents = data.events;

const containerCards = document.getElementById("container__cards");

for (const event of arrayEvents) {
  const card = document.createElement("div");
  // card.className = "card card-items p-2";
  card.classList.add("card", "card-items", "p-2")
  card.innerHTML = `<img src="${event.image}" class="card-img-top rounded " alt="${event.name}">
          <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}.</p>
            <div class="d-flex justify-content-between align-items-center">
              <p class="m-0">Price: $ ${event.price}</p>
              <a href="./details.html" class="btn btn-primary">Details</a>
            </div>
          </div>`;

  containerCards.appendChild(card);
}
