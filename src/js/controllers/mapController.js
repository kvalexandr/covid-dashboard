import * as model from '../models/model';
import mapView from '../views/mapView';
import tableView from '../views/tableView';
import countryView from '../views/countryView';

class MapController {
  async showMap() {
    await model.loadAll();
    mapView.render(model.state);
  }

//   setDataType(newDataType) {
//     model.updateDataType(newDataType);
//     tableView.render(model.state);
//     countryView.render(model.state);
//   }


  setCountryOnMap(newLat, newLong) {
    mapView.viewSelectedCountry(newLat, newLong)
  }

  init() {
    this.showMap();
    mapView.addHandlerSelectCountryOnMap(this.setCountryOnMap);
  }
}

export default new MapController();
