import Chart from 'chart.js';

class GraphView {
  constructor() {
    this._parentElement = document.querySelector('.graph');
    this._graphElement = document.querySelector('.graph-chart').getContext('2d');
    this._data = {};
  }

  addHandlerChangeTab(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-tab');
      if (!btn) return;
      const dataType = btn.getAttribute('data-type');
      handler(dataType);
    });
  }

  addHandlerSelectParams(handler) {
    this._parentElement.addEventListener('change', function (e) {
      const select = e.target.closest('.select');
      if (!select) return;
      handler(select.value);
    });
  }

  render(state) {
    this._dataType = state.dataType;
    this._selectParam = state.selectParam;
    this._selectCountry = state.selectCountry;

    const chart = new Chart(this._graphElement, {
      type: 'bar',
      data: {
        labels: state.timeline.map(el => el.last_update),
        datasets: [{
          label: '# of Votes',
          data: state.timeline.map(el => el[`total_${this._selectParam}`]),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }]
        }
      }
    });
    chart.update();

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', this._generateHTML());
  }

  _generateHTML() {
    return `
    <select class="select">
      <option${this._selectParam === 'cases' ? ' selected' : ''} value='cases'>Cases</option$>
      <option${this._selectParam === 'deaths' ? ' selected' : ''} value='deaths'>Deaths</option$>
      <option${this._selectParam === 'recovered' ? ' selected' : ''} value='recovered'>Recovered</option$>
    </select>
    <button class="btn-tab${this._dataType === 'allData' ? ' active' : ''}" data-type="allData">Data all</button>
    <button class="btn-tab${this._dataType === 'todayData' ? ' active' : ''}" data-type="todayData">Data day</button>
    <button class="btn-tab${this._dataType === 'oneHundredThousandData' ? ' active' : ''}" data-type="oneHundredThousandData">Data all 100</button>
    <button class="btn-tab${this._dataType === 'todayOneHundredThousandData' ? ' active' : ''}" data-type="todayOneHundredThousandData">Data day 100</button>
    `;
  }
}

export default new GraphView();
