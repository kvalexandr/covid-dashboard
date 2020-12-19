import * as model from '../models/model';
import tableView from '../views/tableView';
import countryView from '../views/countryView';
import mapView from '../views/mapView';

class TableController {
  async showTableData() {
    await model.loadAll();
    tableView.render(model.state);
  }

  setDataType(newDataType) {
    model.updateDataType(newDataType);
    tableView.render(model.state);
    countryView.render(model.state);
    mapView.render(model.state);
  }

  init() {
    this.showTableData();
    tableView.addHandlerChangeTab(this.setDataType);
  }
}

export default new TableController();
