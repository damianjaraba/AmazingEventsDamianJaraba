let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

import {
  $arrayEvents,
  filterCategory,
  category,
  createCard,
  superFilter,
} from "../modules/functions.js";

category();

filterCategory($arrayEvents);

superFilter($arrayEvents);

createCard($arrayEvents);

fetch(urlApi)
  .then((res) => res.json())
  .then((data) => {
    
  });
