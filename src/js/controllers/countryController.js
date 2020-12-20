import * as model from '../models/model';
import tableView from '../views/tableView';
import countryView from '../views/countryView';
import graphView from '../views/graphView';

class CountryController {
  async showCountryData() {
    await model.loadCountryAll();
    countryView.render(model.state);
  }

  setDataType(newDataType) {
    model.state.dataType = newDataType;
    tableView.render(model.state);
    countryView.render(model.state);
    graphView.render(model.state);
  }

  setSelectParams(newParam) {
    model.state.selectParam = newParam;
    countryView.render(model.state);
  }

  async setCountry(newCountry) {
    model.state.selectCountry = newCountry;
    await model.loadCountry();
    tableView.render(model.state);
  }

  async searchCountry(searchValue) {
    model.state.searchCountry = searchValue;
    await model.searchCountry(searchValue);
    countryView.render(model.state);
  }

  init() {
    this.showCountryData();
    countryView.addHandlerChangeList(this.setDataType);
    countryView.addHandlerSelectParams(this.setSelectParams);
    countryView.addHandlerSelectCountry(this.setCountry);
    countryView.addHandlerSearchCountry(this.searchCountry);
  }
}

export default new CountryController();
