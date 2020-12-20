import * as model from '../models/model';
import mapView from '../views/mapView';
import tableView from '../views/tableView';
import countryView from '../views/countryView';

class MapController {
    async showMap() {
        await model.loadCountryAll();
        await model.addCovidDataToCoordinates();
        mapView.render(model.state);
    }



    async setCountryOnMap(newCountry) {
        model.updateSelectCountry(newCountry);
        await model.loadCountry();
        countryView.render(model.state);
        tableView.render(model.state);
        mapView.render(model.state);
        mapView.update();
    }



    async init() {
        await this.showMap();
        mapView.addHandlerSelectCountryOnMap(this.setCountryOnMap);

    }
}

export default new MapController();