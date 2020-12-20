import View from './View';

class TableView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.table');
    this._data = {};
  }

  render(state) {
    this._data = state[state.dataType];
    this._dataType = state.dataType;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', this._generateHTML());
  }

  _generateHTML() {
    return `
    <div class="data-tab">
      cases: ${this._data.cases}<br>
      deaths: ${this._data.deaths}<br>
      recovered: ${this._data.recovered}<br>
    </div>
    ${super._generateHTMLTab(this._dataType)}
    `;
  }
}

export default new TableView();
