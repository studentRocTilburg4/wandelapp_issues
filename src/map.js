import mapboxgl from 'mapbox-gl';

class Mapboxgl {
    constructor(){
        mapboxgl.accessToken = 'pk.eyJ1IjoiZHZyaWV0IiwiYSI6ImNpbzlxdnEzMTAwMHB3Y201Ym9yOHgzc24ifQ.B8cRwcPdY0e28MI2gqP1aA';
        return new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v8',
            center: [4.895168, 52.370216], // starting position
            zoom: 9 // starting zoom
        });
    }
}

export default class Map {

    //Init
    constructor() {
        this.map = new Mapboxgl();
        this.defaultzoomlevel = 12;
        this.youarehere = null;
        this.el = document.createElement('div');
        this.el.className = 'marker';


        this.map.on('click', function (e) {
            const features = this.map.queryRenderedFeatures(e.point, { layers: ['poi'] });
            if (!features.length) {
                return;
            }

            const feature = features[0];
            console.log(feature);

            const name = (feature.properties.name === undefined) ? '' : feature.properties.name;
            const desc = (feature.properties.desc === undefined) ? '' : feature.properties.desc;
            //Create and show popup
            new mapboxgl.Popup()
                .setLngLat(feature.geometry.coordinates)
                .setHTML("<div style='background-color: white;position:relative;width:30vw;'>" + desc + "</div>")
                .addTo(this.map);
        }.bind(this));
    }

    //Center map around coordinates
    center(lnglat){
        if (!lnglat) {
            return;
        }
        console.log(lnglat);
        this.map.setCenter(lnglat);
        this.map.setZoom(this.defaultzoomlevel);
    }

    //Show route and set events
    showroute(geo_json) {
        if(!geo_json) {
            return;
        }

        //Remove old layers and sources
        try {
            this.map.removeLayer("poi");
            this.map.removeSource("poi");
            this.map.removeLayer("route");
            this.map.removeSource("route");
        }
        catch(e){
            console.log('layer or source doesnt exist');
        }

        /////
        // POI (points of interest)
        // https://www.mapbox.com/mapbox-gl-js/example/geojson-markers/
        const poi_filter = geo_json.features.filter((feature)=>{
            //If feature.geometry.type isn't Point, delete this feature
            return feature.geometry.type==="Point";
        });
        const poi = {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": poi_filter
            }
        };
        this.map.addSource("poi", poi);
        let routelayer = this.map.addLayer({
            "id": "poi",
            "type": "symbol",
            "source": "poi",
            "layout": {
                "icon-image": "monument-15",
                "text-field": "{name}",
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 0.6],
                "text-anchor": "top"
            }
        });

        ///////
        // ROUTE
        // https://www.mapbox.com/mapbox-gl-js/example/geojson-line/
        const route_filter = geo_json.features.filter((feature)=>{
            //If feature.geometry.type isn't LineString
            return feature.geometry.type==="LineString";
        });
        const route = {
            "type": "geojson",
            "data": route_filter[0]
        };
        this.map.addSource("route", route);
        this.map.addLayer({
            "id": "route",
            "type": "line",
            "source": "route",
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#888",
                "line-width": 4
            }
        });


        //Center the route
        const c = [geo_json.features[0].geometry.coordinates[0][0], geo_json.features[0].geometry.coordinates[0][1]];
        this.center(c);

    }

    //You-are-here Marker
    geo_success(position) {
        console.log("New pos:" + position);
        if (this.youarehere) {
            this.youarehere.remove();
        }
        const location = [position.coords.longitude, position.coords.latitude];

        this.youarehere = new mapboxgl.Marker(this.el, {offset: [-10, -10]})
            .setLngLat(location)
            .addTo(this.map);
        this.center(location);
    }

}
