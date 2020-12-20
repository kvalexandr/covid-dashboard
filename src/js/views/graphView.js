import { fomatNumber } from '../core/utils';
import Chart from 'chart.js';
import View from './View';

class GraphView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.graph');
    this._graphElement = document.querySelector('.graph-chart').getContext('2d');
    this._data = {};
  }

  render(state) {
    this._dataType = state.dataType;
    this._selectParam = state.selectParam;
    this._selectCountry = state.selectCountry;

    this.chart = new Chart(this._graphElement, {
      type: 'bar',
      data: {
        labels: state.timeline.map(el => el.last_update),
        datasets: [{
          data: state.timeline.map(el => el[`total_${this._selectParam}`]),
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var label = '';

              if (label) {
                label += ': ';
              }
              label += fomatNumber(tooltipItem.yLabel);
              return label;
            }
          }
        }
      }
    });

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', this._generateHTML());
  }

  _generateHTML() {
    return `
    ${super._generateHTMLSelect(this._selectParam)}
    ${super._generateHTMLTab(this._dataType)}
    `;
  }
}

export default new GraphView();
