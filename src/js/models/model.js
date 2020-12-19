import { API_URl, COUNT_PEOPLE } from '../config';
import countriesCoordinates from '../border-coordinates';
import countries from '../border-coordinates';

export const state = {
  allData: {},
  todayData: {},
  oneHundredThousandData: {},
  todayOneHundredThousandData: {},
  dataType: 'allData',
  selectParam: 'cases',
  selectCountry: '',
  allCountry: [],
  oneCountry: {},
  provinces: [],
  countriesCoordinates: countriesCoordinates,
};

export const loadAll = async function () {
  try {
    const res = await fetch(`${API_URl}/all`);
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
    const res = await fetch(`${API_URl}/countries?sort=cases`);
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
        }, 


        
      });


    });

    console.log(state);



  } catch (err) {
    console.error(err);
  }
};

export const loadCountry = async function () {
  try {
    //console.log(state.selectCountry);
    const res = await fetch(`${API_URl}/countries/${state.selectCountry}`);
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


export const addCovidDataToCoordinates = function () {

 state.allCountry.forEach((ind) => {
  state.countriesCoordinates.forEach((el) => {
  if (ind.countryInfo.iso3 === el.id) {
    el.todayData = ind.todayData;
    el.todayOneHundredThousandData = ind.todayOneHundredThousandData;
    el.oneHundredThousandData = ind.oneHundredThousandData;
    el.allData = ind.allData;
  }
  })
 })   

 state.countriesCoordinates = state.countriesCoordinates.filter(el => el.allData);

}



export const loadProvinces = async function() {
  try {
    const res = await fetch(`${API_URl}/jhucsse`);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    data.forEach((el) => {
      state.provinces.push({
        country: el.country, 
        province: el.province || el.county || el.country,
        coordinates: el.coordinates,
        stats: el.stats,
        globalPercent: (el.stats.confirmed / state.allData.cases) * 100,
      });
    });

  } catch (err) {
    console.error(err);
  }
}

// loadProvinces();


export const updateDataType = function (newDataType) {
  state.dataType = newDataType;
}

export const updateSelectParam = function (newParam) {
  state.selectParam = newParam;
}

export const updateSelectCountry = function (newCountry) {
  state.selectCountry = newCountry;
}

