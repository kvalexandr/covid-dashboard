export default class View {
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

  _generateHTMLSelect(selectParam) {
    return `
    <select class="select">
      <option${selectParam === 'cases' ? ' selected' : ''} value='cases'>Cases</option$>
      <option${selectParam === 'deaths' ? ' selected' : ''} value='deaths'>Deaths</option$>
      <option${selectParam === 'recovered' ? ' selected' : ''} value='recovered'>Recovered</option$>
    </select>
    `;
  }

  _generateHTMLTab(dataType) {
    return `
    <div class="btn-container">
      <div class="btn-container-alldata s12 m6">
        <a class="waves-effect waves-light btn-small btn-tab${dataType === 'allData' ? ' active' : ''}" data-type="allData">Data all</a>
        <a class="waves-effect waves-light btn-small btn-tab${dataType === 'todayData' ? ' active' : ''}" data-type="todayData">Data day</a>
      </div>
      <div class="btn-container-data100 s12 m6">
        <a class="waves-effect waves-light btn-small btn-tab${dataType === 'oneHundredThousandData' ? ' active' : ''}" data-type="oneHundredThousandData">Data all 100</a>
        <a class="waves-effect waves-light btn-small btn-tab${dataType === 'todayOneHundredThousandData' ? ' active' : ''}" data-type="todayOneHundredThousandData">Data day 100</a>
      </div>
    </div>
    `;
  }
}
