import * as model from '../models/model';
import tableView from '../views/tableView';
import countryView from '../views/countryView';
import graphView from '../views/graphView';

class GraphController {
  async showGraph() {
    await model.loadTimeline();
    graphView.render(model.state);
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
    graphView.render(model.state);
  }

  init() {
    this.showGraph();
    graphView.addHandlerChangeTab(this.setDataType);
    graphView.addHandlerSelectParams(this.setSelectParams);
  }
}

export default new GraphController();
