import { MAP_API_URL } from "../config";
import countryView from "../views/countryView";
import tableView from "./tableView";
class MapView {
  constructor() {
    this._data = {};
    this.map = L.map("map").setView([0, 0], 2);
    this.layerGroup = L.layerGroup();
    this.tileLayer = L.tileLayer(MAP_API_URL, { noWrap: false, minZoom: 2 }).addTo(this.map);
  }

  render(state) {
    this._provinces = state.provinces;
    this._selectCountry = state.selectCountry;
    this._stats = state.stats;
    this._allData = state.allData;
    this._dataType = state.dataType;
    this.countryMarker = "";
    this.layerGroup.clearLayers();
    this._countryInfo = state.countryInfo;
    this.isCountrySelected = false;
    this._generateHTML();
  }

  addHandlerSelectCountryOnMap(handler) {
    countryView._parentElement.addEventListener("click", function (e) {
      const selectedItem = e.target.closest(".country-item");
      if (!selectedItem) return;
      const lat = selectedItem.getAttribute("data-lat");
      const long = selectedItem.getAttribute("data-long");

      handler(lat, long);
    });
  }

  viewSelectedCountry(newLat, newLong) {
    this.map.setView([newLat, newLong]);
    if (!this.isCountrySelected) {
      this.countryMarker = L.circleMarker([newLat, newLong], {
        radius: 30,
        color: "#7f00ff",
        fill: true,
        fillOpacity: 0.4,
      });
      this.countryMarker.addTo(this.map);
      this.isCountrySelected = true;
    } else {
      this.countryMarker.setLatLng([newLat, newLong]);
    }
    this.countryMarker.addTo(this.layerGroup);

    this.countryMarker.addEventListener('click', () => {
      this.map.setView([newLat, newLong], 3.5);
      this.countryMarker.removeFrom(this.map);
      this.isCountrySelected = false;
    })
    
  }

  _generateHTML() {
    this._provinces.map((el) => {
      const {
        coordinates: { latitude, longitude },
      } = el;
      const {
        stats: { confirmed },
      } = el;
      let circleRadius = Math.ceil(el.globalPercent * 5);
      circleRadius = circleRadius > 2 ? circleRadius : 2;
      const provinceMarker = L.circleMarker([latitude, longitude], {
        radius: circleRadius,
        color: "#FF0000",
        fill: true,
        fillOpacity: 0.4,
      })
        .addTo(this.layerGroup)
        .bindPopup(
          `${el.province === el.country ? "" : el.country + ","} ${
            el.province
          }, Cases: ${confirmed}`
        );

        provinceMarker.addEventListener('mouseover', function() {
          this.openPopup()
        })
        provinceMarker.addEventListener('mouseout', function() {
          this.closePopup()
        })
      
    });
    this.layerGroup.addTo(this.map);
    console.log(this.layerGroup);
  }
}

export default new MapView();
