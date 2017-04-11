import mapboxgl from 'mapbox-gl';

//Setup map
const initmap = function () {
    'use strict';
    mapboxgl.accessToken = 'pk.eyJ1IjoiZHZyaWV0IiwiYSI6ImNpbzlxdnEzMTAwMHB3Y201Ym9yOHgzc24ifQ.B8cRwcPdY0e28MI2gqP1aA';
    return new mapboxgl.Map({
        container: 'map', // container id
        // style: 'mapbox://styles/mapbox/bright-v9', //stylesheet location
        style: 'mapbox://styles/mapbox/streets-v8',
        // style: 'mapbox://styles/mapbox/basic-v8',,
        // style: 'mapbox://styles/mapbox/satellite-v8',
        // style: 'mapbox://styles/mapbox/empty-v8',
        center: [4.895168, 52.370216], // starting position
        zoom: 9 // starting zoom
    });
};

//Center map around coordinates
const centerlocation = function(map, lnglat, defaultzoomlevel){
    'use strict';

    if (!map || !lnglat || !defaultzoomlevel) {
        return;
    }

    //Center map
    map.setCenter(lnglat);
    map.setZoom(defaultzoomlevel);
};

//Show route and set events
const showroute = function (map, geo_json, defaultzoomlevel) {
    'use strict';

    if (defaultzoomlevel == null) {
        defaultzoomlevel = 12;
    }
        if(!map || !geo_json) {
        return;
    }

    //Remove old layers and sources
    try {
        map.removeLayer("poi");
        map.removeSource("poi");
        map.removeLayer("route");
        map.removeSource("route");
    }
    catch(e){
        console.log('layer or source doesnt exist yet');
    }

    /////
    // POI
    /////
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
    map.addSource("poi", poi);
    let routelayer = map.addLayer({
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
    ///////
    // https://www.mapbox.com/mapbox-gl-js/example/geojson-line/
    const route_filter = geo_json.features.filter((feature)=>{
        //If feature.geometry.type isn't LineString
        return feature.geometry.type==="LineString";
    });
    const route = {
        "type": "geojson",
        "data": route_filter[0]
    };
    map.addSource("route", route);
    map.addLayer({
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
    centerlocation(map, c, defaultzoomlevel);

};

//When a marker is clicked, show description
const loadpoievent = function (map) {
    map.on('click', function (e) {
        console.log('asdfasdfasdfasdfasdf');
        var features = map.queryRenderedFeatures(e.point, { layers: ['poi'] });

        if (!features.length) {
            return;
        }

        var feature = features[0];
        console.log(feature);

        const name = (feature.properties.name === undefined) ? '' : feature.properties.name;
        const desc = (feature.properties.desc === undefined) ? '' : feature.properties.desc;
        //Create and show popup
        // var div = document.createElement('div');
        // div.innerHTML = "<h1>" + name + "</h1><p>" + desc + "</p>";
        // div.style.id = 'popup';
        // div.style.position = "absolute";
        // div.style.width = "100vw";
        // div.style.height = "100vh";
        // div.style.backgroundColor = "white";
        // div.style.padding = "1em";
        // div.addEventListener('click', (e) => {
        //     console.log(e);
        //     e.target.parentElement.removeChild(e.srcElement);
        // });
        // document.body.appendChild(div);
        new mapboxgl.Popup()
            .setLngLat(feature.geometry.coordinates)
            .setHTML("<div style='background-color: white;position:relative;width:30vw;'>" + desc + "</div>")
            .addTo(map);
    });
};

//Current location Marker
const currentlocation = function(map, defaultzoomlevel, maxage, enablehigh) {
    'use strict';

    if(defaultzoomlevel == null) {
        defaultzoomlevel = 12;
    }
    if(maxage == null) {
        maxage = 1000;
    }
    if(enablehigh == null) {
        enablehigh = true;
    }


    let marker;

    function geo_success(position) {
        if (marker) {
            marker.remove();
        }
        let location = [position.coords.longitude, position.coords.latitude];

        var el = document.createElement('div');
        el.className = 'marker';
        marker = new mapboxgl.Marker(el, {offset: [-10, -10]})
            .setLngLat(location)
            .addTo(map);
        centerlocation(map, location, defaultzoomlevel);
    }

    function geo_error(error) {
        console.log(error.message);
    }

    var geo_options = {
        enableHighAccuracy: enablehigh,
        maximumAge: maxage,
        timeout: 10000
    };

    //Watch location device
    navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
};

//expose map functions
exports.initmap = initmap;
exports.showroute = showroute;
exports.loadpoievent= loadpoievent;
exports.currentlocation = currentlocation;
