class TableView {
  constructor() {
    this._parentElement = document.querySelector('.table');
    this._data = {};
  }

  render(state) {
    this._data = state[state.dataType];
    this._dataType = state.dataType;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', this._generateHTML());
  }

  addHandlerChangeTab(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-tab');
      if (!btn) return;
      const dataType = btn.getAttribute('data-type');
      handler(dataType);
    });
  }

  _generateHTML() {
    return `
    <div class="data-tab">
      cases: ${this._data.cases}<br>
      deaths: ${this._data.deaths}<br>
      recovered: ${this._data.recovered}<br>
    </div>
    <a class="waves-effect waves-light btn-small btn-tab${this._dataType === 'allData' ? ' active' : ''}" data-type="allData">Data all</a>
    <a class="waves-effect waves-light btn-small btn-tab${this._dataType === 'todayData' ? ' active' : ''}" data-type="todayData">Data day</a>
    <a class="waves-effect waves-light btn-small btn-tab${this._dataType === 'oneHundredThousandData' ? ' active' : ''}" data-type="oneHundredThousandData">Data all 100</a>
    <a class="waves-effect waves-light btn-small btn-tab${this._dataType === 'todayOneHundredThousandData' ? ' active' : ''}" data-type="todayOneHundredThousandData">Data day 100</a>
    `;
  }
}

export default new TableView();
