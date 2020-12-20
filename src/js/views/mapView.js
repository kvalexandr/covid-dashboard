import { MAP_API_URL } from "../config";
import countryView from "../views/countryView";
import tableView from "./tableView";
class MapView {
  constructor() {
    this._data = {};
    this.map = L.map("map", {worldCopyJump: true}).setView([0, 0], 2);
    this.layerGroup = L.layerGroup().addTo(this.map);
    this.selectedLayer = L.layerGroup().addTo(this.map);
    this.tileLayer = L.tileLayer(MAP_API_URL, {
      noWrap: false,
      minZoom: 2,
    }).addTo(this.map);
  }

  render(state) {
    this._provinces = state.provinces;
    this._selectCountry = state.selectCountry;
    this._stats = state.stats;
    this._allData = state.allData;
    this._dataType = state.dataType;
    this._selectParam = state.selectParam;
    this._allCountry = state.allCountry;
    this.layerGroup.clearLayers();
    this.selectedLayer.clearLayers();
    this._countryInfo = state.countryInfo;
    this.isCountrySelected = false;
    this._countriesCoordinates = state.countriesCoordinates;
    this._generateHTML();
  }

  addHandlerSelectCountryOnMap(handler) {
    this.map.addEventListener('click', (e) => {
      console.log(e.target);
      if (this._selectCountry === this._prevSelectedCountry) return
      this._generateHTML();
        const country = this._selectCountry;
        this._prevSelectedCountry = this._selectCountry;
        console.log(this._selectCountryName)
        console.log('ddd');
        handler(country);
    })
  }

  
  _generateHTML() {
    
    const selectedCountryGeoJSON = this._countriesCoordinates.find(
      (el) => el.id === this._selectCountry
    );

    function getColor(d) {
      return d > 1000000
        ? "#800026"
        : d > 50000
        ? "#BD0026"
        : d > 20000
        ? "#E31A1C"
        : d > 10000
        ? "#FC4E2A"
        : d > 5000
        ? "#FD8D3C"
        : d > 2000
        ? "#FEB24C"
        : d > 1000
        ? "#FED976"
        : "#FFEDA0";
    }

    const setGlobalStyle = (feature) => {
      return {
        fillColor: getColor(feature[this._dataType][this._selectParam]),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    };

    function setSelectedStyle() {
      return {
        weight: 5,
        color: "black",
        dashArray: "",
        fillOpacity: 0.7,
      };
    }



    let geojson = L.geoJson(this._countriesCoordinates, {
      style: setGlobalStyle,
    }).addTo(this.layerGroup);

    L.geoJson(selectedCountryGeoJSON, {
      style: {
        fillColor: "",
        weight: 5,
        color: "#000",
        dashArray: "",
        fillOpacity: 0,
      },
    }).addTo(this.selectedLayer);

    const highlightFeature = (e) => {
      const layer = e.target;
      layer.setStyle(setSelectedStyle());

      layer.bringToFront();
      this.selectedLayer.eachLayer(function (selectedCountryLayer) {
        selectedCountryLayer.bringToFront();
      });
    };

    function resetHighlight(e) {
      geojson.resetStyle(e.target);
    }

    const getSelectedCountry = (e) => {
      this._selectCountry = e.target.feature.id;
    }
    console.log(this._selectCountryName)

    function onEachFeature(feature, layer) {
      layer.addEventListener("mouseover", highlightFeature);
      layer.addEventListener("mouseout", resetHighlight);
      layer.addEventListener('click', getSelectedCountry);
    }

    

    geojson = L.geoJson(this._countriesCoordinates, {
      style: setGlobalStyle,
      onEachFeature: onEachFeature,
    }).addTo(this.layerGroup);


    this.selectedLayer.eachLayer((selectedCountryLayer) => {
      selectedCountryLayer.bringToFront();
    });

  


  }
}

export default new MapView();
