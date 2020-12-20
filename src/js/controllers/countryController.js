import * as model from '../models/model';
import tableView from '../views/tableView';
import countryView from '../views/countryView';
import mapController from './mapController';
import mapView from '../views/mapView';

class CountryController {
  async showCountryData() {
    await model.loadCountryAll();
    countryView.render(model.state);
  }

  setDataType(newDataType) {
    model.updateDataType(newDataType);
    tableView.render(model.state);
    countryView.render(model.state);
    mapView.render(model.state);
  }

  setSelectParams(newParam) {
    model.updateSelectParam(newParam);
    countryView.render(model.state);
  }

  async setCountry(newCountry) {
    model.updateSelectCountry(newCountry);
    await model.loadCountry();
    tableView.render(model.state);
    mapView.render(model.state);
  }

  init() {
    this.showCountryData();
    countryView.addHandlerChangeList(this.setDataType);
    countryView.addHandlerSelectParams(this.setSelectParams);
    countryView.addHandlerSelectCountry(this.setCountry);
  }
}

export default new CountryController();
