import "../sass/index.scss";
//import './core/virtual-keyboard/script';

import tableController from "./controllers/tableController";
import countryController from "./controllers/countryController";
import graphController from "./controllers/graphController";
import mapController from "./controllers/mapController";
import View from "./views/View";

tableController.init();
countryController.init();
graphController.init();
mapController.init();

document.querySelectorAll(".fullscreen-btn").forEach((fullscreenBtn) => {
  fullscreenBtn.addEventListener("click", function () {
    this.closest(".card-panel").classList.toggle("fullscreen-mode");
  });
});
