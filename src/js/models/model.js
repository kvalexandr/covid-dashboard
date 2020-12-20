import { API_URL, API_URL2, COUNT_PEOPLE } from '../config';

export const state = {
  allData: {},
  todayData: {},
  oneHundredThousandData: {},
  todayOneHundredThousandData: {},
  dataType: 'allData',
  selectParam: 'cases',
  selectCountry: '',
  searchCountry: '',
  searchCountryResult: null,
  allCountry: [],
  oneCountry: {},
  timeline: [],
};

export const loadAll = async function () {
  try {
    const res = await fetch(`${API_URL}/all`);
    const data = await res.json();
    //console.log(res);
    //console.log(data);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    state.allData = {
      cases: data.cases,
      deaths: data.deaths,
      recovered: data.recovered,
    };

    state.todayData = {
      cases: data.todayCases,
      deaths: data.todayDeaths,
      recovered: data.todayRecovered,
    };

    state.oneHundredThousandData = {
      cases: Math.round(data.cases * 100000 / COUNT_PEOPLE),
      deaths: Math.round(data.deaths * 100000 / COUNT_PEOPLE),
      recovered: Math.round(data.recovered * 100000 / COUNT_PEOPLE),
    };

    state.todayOneHundredThousandData = {
      cases: Math.round(data.todayCases * 100000 / COUNT_PEOPLE),
      deaths: Math.round(data.todayDeaths * 100000 / COUNT_PEOPLE),
      recovered: Math.round(data.todayRecovered * 100000 / COUNT_PEOPLE),
    };

  } catch (err) {
    console.error(err);
  }
};

export const loadCountryAll = async function () {
  try {
    const res = await fetch(`${API_URL}/countries?sort=cases`);
    const data = await res.json();
    //console.log(res);
    //console.log(data);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    data.forEach((el) => {
      state.allCountry.push({
        country: el.country,
        countryInfo: el.countryInfo,
        allData: {
          cases: el.cases,
          deaths: el.deaths,
          recovered: el.recovered,
        },
        todayData: {
          cases: el.todayCases,
          deaths: el.todayDeaths,
          recovered: el.todayRecovered,
        },
        oneHundredThousandData: {
          cases: Math.round(el.cases * 100000 / COUNT_PEOPLE),
          deaths: Math.round(el.deaths * 100000 / COUNT_PEOPLE),
          recovered: Math.round(el.recovered * 100000 / COUNT_PEOPLE),
        },
        todayOneHundredThousandData: {
          cases: Math.round(el.todayCases * 100000 / COUNT_PEOPLE),
          deaths: Math.round(el.todayDeaths * 100000 / COUNT_PEOPLE),
          recovered: Math.round(el.todayRecovered * 100000 / COUNT_PEOPLE),
        }
      });
    });

  } catch (err) {
    console.error(err);
  }
};

export const loadCountry = async function () {
  try {
    //console.log(state.selectCountry);
    const res = await fetch(`${API_URL}/countries/${state.selectCountry}`);
    const data = await res.json();
    //console.log(res);
    //console.log(data);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    state.allData = {
      cases: data.cases,
      deaths: data.deaths,
      recovered: data.recovered,
    };

    state.todayData = {
      cases: data.todayCases,
      deaths: data.todayDeaths,
      recovered: data.todayRecovered,
    };

    state.oneHundredThousandData = {
      cases: Math.round(data.cases * 100000 / COUNT_PEOPLE),
      deaths: Math.round(data.deaths * 100000 / COUNT_PEOPLE),
      recovered: Math.round(data.recovered * 100000 / COUNT_PEOPLE),
    };

    state.todayOneHundredThousandData = {
      cases: Math.round(data.todayCases * 100000 / COUNT_PEOPLE),
      deaths: Math.round(data.todayDeaths * 100000 / COUNT_PEOPLE),
      recovered: Math.round(data.todayRecovered * 100000 / COUNT_PEOPLE),
    };


    //console.log(state.allCountry);

  } catch (err) {
    console.error(err);
  }
};

export const searchCountry = async function (searchCountry = '') {
  try {
    const regExpCountry = new RegExp(searchCountry, 'i');
    state.searchCountryResult = state.allCountry.filter(el => regExpCountry.test(el.country));
    state.searchCountryResult
  } catch (err) {
    console.error(err);
  }
};

export const loadTimeline = async function () {
  const res = await fetch(`${API_URL2}/timeline`);
  const data = await res.json();
  //console.log(res);
  console.log(data);
  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  state.timeline = data.reverse();
};
