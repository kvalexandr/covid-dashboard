import { MAP_API_URL } from '../config';
import countryView from '../views/countryView';
import tableView from './tableView';
class MapView {
  constructor() {
    this._parentElement = document.querySelector(".map");
    this._data = {};
  }

  render(state) {
    this._provinces = state.provinces;
    this._selectCountry = state.selectCountry;
    this._stats = state.stats;
    this._allData = state.allData;
    this.countryMarker = '';
    this._countryInfo = state.countryInfo;
    this.isCountrySelected = false;
    this._parentElement.insertAdjacentHTML(
      "afterbegin",
      this._generateHTML()
    );
  }

  createMap() {
    this.map = L.map("map").setView([0, 0], 2);
  }

  addHandlerSelectCountryOnMap(handler) {
    countryView._parentElement.addEventListener('click', function (e) {
      const selectedItem = e.target.closest('.country-item');
      if (!selectedItem) return;
      const lat = selectedItem.getAttribute('data-lat');
      const long = selectedItem.getAttribute('data-long');
      
      handler(lat, long);
    })
      
  }

  viewSelectedCountry(newLat, newLong) {
    this.map.setView([newLat, newLong])
  }

  
  addCountryMarkerOnSelect(newLat, newLong) {
   if (!this.isCountrySelected) {
    this.countryMarker = L.circleMarker([newLat, newLong], {radius: 30, color: '#7f00ff', fill: true, fillOpacity: 0.4});
    this.countryMarker.addTo(this.map);
    this.isCountrySelected = true;
  } else {
    this.countryMarker.setLatLng([newLat, newLong]);
  }


  }

  _generateHTML() {
    L.tileLayer(MAP_API_URL, {noWrap: false, minZoom: 2}).addTo(this.map);
     this._provinces.map((el) => {
      const {coordinates: {latitude, longitude}} = el;
      const {stats: {confirmed}} = el;
      const circleRadius = Math.ceil(el.globalPercent * 5);
      console.log(circleRadius)
      L.circleMarker([latitude, longitude], {radius: circleRadius, color: '#FF0000', fill: true, fillOpacity: 0.4}).addTo(this.map).bindPopup(`${el.province === el.country ? '' : el.country + ','} ${el.province},  Cases: ${confirmed}`);
    })
  }
}

export default new MapView();
