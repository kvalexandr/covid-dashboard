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
    this._selectParam = state.selectParam;
    this.countryMarker = "";
    this._allCountry = state.allCountry;
    this.layerGroup.clearLayers();
    this._countryInfo = state.countryInfo;
    this.isCountrySelected = false;
    this._countriesCoordinates = state.countriesCoordinates;
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

    console.log(this._selectCountry)
   
    function getColor(d) {
      return d > 1000000 ? '#800026' :
             d > 50000  ? '#BD0026' :
             d > 20000  ? '#E31A1C' :
             d > 10000  ? '#FC4E2A' :
             d > 5000   ? '#FD8D3C' :
             d > 2000   ? '#FEB24C' :
             d > 1000   ? '#FED976' :
                        '#FFEDA0';
  }

  const style = (feature) => {
    return {
        fillColor: getColor(feature[this._dataType][this._selectParam]),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}


let geojson = L.geoJson(this._countriesCoordinates, {style: style}).addTo(this.layerGroup);

function highlightFeature(e) {
  const layer = e.target;

  layer.setStyle({
      weight: 5,
      color: '#000',
      dashArray: '',
      fillOpacity: 0.7
  });

  layer.bringToFront();
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
}

function onEachFeature(feature, layer) {
  layer.addEventListener('mouseover', highlightFeature);
  layer.addEventListener('mouseout', resetHighlight);
}

geojson = L.geoJson(this._countriesCoordinates, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(this.layerGroup);

this.layerGroup.addTo(this.map)



  }
  
}

export default new MapView();
