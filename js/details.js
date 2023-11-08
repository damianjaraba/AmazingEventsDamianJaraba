import {$arrayEvents} from "../modules/functions.js"

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

let detailsCard = $arrayEvents.find((event) => event._id === id);

// Función que genera las Cards de DETAILS
const containerDetails = document.getElementById("containerDetails");

function createCard(arrayEvent) {
  let assistance 

    if (arrayEvent.assistance !== undefined) {
      assistance = `<p class="card-text"><span class="p-2 rounded  bg-warning">Assistance:</span> ${arrayEvent.assistance}</p>`;
    } else {
      assistance = `<p class="card-text"><span class=" p-2 rounded bg-success">Estimate :</span> ${arrayEvent.estimate}</p>`;
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
                <p class="card-text"><strong>Date:</strong> ${arrayEvent.date}</p>
                <p class="card-text"><strong>Place:</strong> ${arrayEvent.place}</p>
                <p class="card-text"><strong>Capacity:</strong> ${arrayEvent.capacity}</p>
                ${assistance}
                <p class="card-text"><strong>Price:</strong> $ ${arrayEvent.price}</p>
              </div>
            </div>
          </div>
        </div>
    `;

  containerDetails.appendChild(cardDetails);
}
createCard(detailsCard);
