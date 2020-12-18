class CountryView {
  constructor() {
    this._parentElement = document.querySelector('.country');
    this._data = {};
  }

  render(state) {
    this._data = state.allCountry;
    this._dataType = state.dataType;
    this._selectParam = state.selectParam;
    this._selectCountry = state.selectCountry;
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

  _generateHTML() {
    return `
    <div class="data-country">
      <table class="responsive-table highlight">
        ${this._data.map((el) => {
      return `
          <tr class="country-item${el.countryInfo.iso3 === this._selectCountry ? ' active' : ''}" data-country="${el.countryInfo.iso3}" data-lat="${el.countryInfo.lat}" data-long="${el.countryInfo.long}">
            <td>
              <img src='${el.countryInfo.flag}' width="20px"> ${el.country} (${el[this._dataType][this._selectParam]})
            </td>
          </tr>`;
    }).join('')}
      </table>
    </div>
    <button class="btn-tab${this._dataType === 'allData' ? ' active' : ''}" data-type="allData">Data all</button>
    <button class="btn-tab${this._dataType === 'todayData' ? ' active' : ''}" data-type="todayData">Data day</button>
    <button class="btn-tab${this._dataType === 'oneHundredThousandData' ? ' active' : ''}" data-type="oneHundredThousandData">Data all 100</button>
    <button class="btn-tab${this._dataType === 'todayOneHundredThousandData' ? ' active' : ''}" data-type="todayOneHundredThousandData">Data day 100</button>
    <select class="select">
      <option${this._selectParam === 'cases' ? ' selected' : ''} value='cases'>cases</option$>
      <option${this._selectParam === 'deaths' ? ' selected' : ''} value='deaths'>deaths</option$>
      <option${this._selectParam === 'recovered' ? ' selected' : ''} value='recovered'>recovered</option$>
    </select>
    `;
  }
}

export default new CountryView();
