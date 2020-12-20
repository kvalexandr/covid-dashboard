import { MAP_API_URL } from "../config";
import mapController from "../controllers/mapController";
import countryView from "../views/countryView";
import tableView from "./tableView";

class MapView {
    constructor() {
        this._data = {};
        this._parentElement = document.querySelector('#map');
        this._HTMLConatainer = document.querySelector('.map-info');
        this.map = L.map("map", { worldCopyJump: true }).setView([0, 0], 2);
        this.layerGroup = L.layerGroup().addTo(this.map);
        this.selectedLayer = L.layerGroup().addTo(this.map);
        this.tileLayer = L.tileLayer(MAP_API_URL, {
            noWrap: false,
        }).addTo(this.map);
        this.colorsForLayers = ["#800026", "#BD0026", "#E31A1C", "#FC4E2A", "#FD8D3C", "#FEB24C", "#FED976", "#FFEDA0"];
        this.paramBorders = [1000000, 50000, 20000, 10000, 5000, 2000, 1000, 0];
    }

    render(state) {
        this._provinces = state.provinces;
        this._selectCountry = state.selectCountry;
        this._stats = state.stats;
        this._allData = state.allData;
        this._dataType = state.dataType;
        this._selectParam = state.selectParam;
        this._allCountry = state.allCountry;
        this._HTMLConatainer.innerHTML = '';
        this.selectedLayer.clearLayers();
        this.layerGroup.clearLayers();
        this._countryInfo = state.countryInfo;
        this._countriesCoordinates = state.countriesCoordinates;
        this._generateMapLayers();
        this._HTMLConatainer.insertAdjacentHTML('afterbegin', this._generateHTML());
    }

    addHandlerSelectCountryOnMap(handler) {
        this.geojson.eachLayer(la => {
            la.addEventListener('click', function() {
                handler(la.feature.id);
                setTimeout(() => {
                    document.querySelector('.country-item.active').scrollIntoView({ block: "center", behavior: "smooth" });
                }, 100)

            })
        })

    }

    update() {
        this.addHandlerSelectCountryOnMap(mapController.setCountryOnMap);
    }

    getColorForLayers(param) {
        return param > 1000000 ?
            "#800026" :
            param > 50000 ?
            "#BD0026" :
            param > 20000 ?
            "#E31A1C" :
            param > 10000 ?
            "#FC4E2A" :
            param > 5000 ?
            "#FD8D3C" :
            param > 2000 ?
            "#FEB24C" :
            param > 1000 ?
            "#FED976" :
            "#FFEDA0";
    }



    _generateMapLayers() {

        const selectedCountryGeoJSON = this._countriesCoordinates.find(
            (el) => el.id === this._selectCountry
        );



        const setGlobalStyle = (feature) => {
            return {
                fillColor: this.getColorForLayers(feature[this._dataType][this._selectParam]),
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
            this.selectedLayer.eachLayer(function(selectedCountryLayer) {
                selectedCountryLayer.bringToFront();
            });
        };

        const openPopupInfo = (e) => {
            const layer = e.target;
            layer.bindPopup(`${layer.feature.properties.name}`).openPopup();

        }

        const closePopupInfo = (e) => {
            const layer = e.target;
            layer.closePopup();

        }

        function resetHighlight(e) {
            geojson.resetStyle(e.target);
        }



        const onEachFeature = (feature, layer) => {
            layer.addEventListener("mouseover", highlightFeature);
            layer.addEventListener("mouseout", resetHighlight);
            layer.addEventListener("mouseover", openPopupInfo);
            layer.addEventListener("mouseout", closePopupInfo);

        }


        geojson = L.geoJson(this._countriesCoordinates, {
            style: setGlobalStyle,
            onEachFeature: onEachFeature,
        }).addTo(this.layerGroup);


        this.selectedLayer.eachLayer((selectedCountryLayer) => {
            selectedCountryLayer.bringToFront();
        });


        this.geojson = geojson;
        console.log(this.geojson)

        this.layerGroup.eachLayer(la => {

            la.eachLayer(qw => {
                qw.addEventListener('click', function() {
                    console.log(qw.feature.id);
                })

            })
        })




    }

    _generateHTML() {
            return `
      <div class="legend">
      ${this.colorsForLayers.map((color, ind) =>{
        return `
        <div class="legend-item">
        <div class="legend-color" style="background-color: ${color}"></div>
        <div class="legend-param">${this._selectParam}>${this.paramBorders[ind]}</div>
        </div>
        `
      }).join('')}
      </div>
      `
    }
}

export default new MapView();