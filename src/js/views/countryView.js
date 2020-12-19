import { fomatNumber } from '../core/utils';

class CountryView {
  constructor() {
    this._parentElement = document.querySelector('.country');
    this._searchElement = document.querySelector('.search-country');
    this._data = {};
  }

  render(state) {
    this._data = state.searchCountryResult || state.allCountry;
    this._dataType = state.dataType;
    this._selectParam = state.selectParam;
    this._selectCountry = state.selectCountry;
    this._searchCountry = state.searchCountry;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', this._generateHTML());
  }

  addHandlerChangeList(handler) {
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

  addHandlerSelectCountry(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const countryItem = e.target.closest('.country-item');
      if (!countryItem) return;

      let elem = countryItem.parentNode.firstChild;
      do {
        elem.classList.remove('active');
      } while (elem = elem.nextElementSibling)
      countryItem.classList.add('active');

      const country = countryItem.getAttribute('data-country');
      handler(country);
    });
  }

  addHandlerSearchCountry(handler) {
    this._searchElement.addEventListener('input', function (e) {
      const searchInput = e.target;
      if (!searchInput) return;

      const searchValue = searchInput.value;
      handler(searchValue);
    });

  }

  _generateCountryListHTML() {
    const countryList = this._data.map((el) => {
      return {
        isActive: el.countryInfo.iso3 === this._selectCountry,
        code: el.countryInfo.iso3,
        flag: el.countryInfo.flag,
        name: el.country,
        covidInfo: el[this._dataType][this._selectParam],
        covidInfoFormat: fomatNumber(el[this._dataType][this._selectParam]),
      }
    });

    countryList.sort((a, b) => b.covidInfo - a.covidInfo);

    return countryList.map((country) => {
      return `
        <tr class="country-item${country.isActive ? ' active' : ''}" data-country="${country.code}">
          <td>
            <img src='${country.flag}'> ${country.name} <span class="country-item__covid-info">${country.covidInfoFormat}
          </td>
        </tr>`;
    }).join('');
  }

  _generateHTML() {
    return `
    <select class="select">
      <option${this._selectParam === 'cases' ? ' selected' : ''} value='cases'>Cases</option$>
      <option${this._selectParam === 'deaths' ? ' selected' : ''} value='deaths'>Deaths</option$>
      <option${this._selectParam === 'recovered' ? ' selected' : ''} value='recovered'>Recovered</option$>
    </select>

    <div class="country-container">
      <table class="highlight table-country">
        ${this._generateCountryListHTML()}
      </table>
    </div>

    <button class="btn-tab${this._dataType === 'allData' ? ' active' : ''}" data-type="allData">Data all</button>
    <button class="btn-tab${this._dataType === 'todayData' ? ' active' : ''}" data-type="todayData">Data day</button>
    <button class="btn-tab${this._dataType === 'oneHundredThousandData' ? ' active' : ''}" data-type="oneHundredThousandData">Data all 100</button>
    <button class="btn-tab${this._dataType === 'todayOneHundredThousandData' ? ' active' : ''}" data-type="todayOneHundredThousandData">Data day 100</button>
    `;
  }
}

export default new CountryView();
