import { urlApi, createCardDetails } from "../modules/functions.js";

fetch(urlApi)
  .then((res) => res.json())
  .then((data) => {
    const arrayEvents = data.events;
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    let detailsCard = arrayEvents.find((event) => event._id == id);

    // Función que genera las Cards de DETAILS

    createCardDetails(detailsCard);
  });
