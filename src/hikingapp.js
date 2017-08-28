import $ from 'jquery';
import Ractive from 'ractive';
import Map from './map';
import {getroutesjson, posttextfile} from './routes';

// Hiking app
const hikingapp = (remoteserver) => {
    'use strict';

    //Init
    const ractive_ui = new Ractive({
        el: '#container',
        template: '#template',
        debug: true
    });
    let map = null;

    // todo: Get cuid from localstorage if there is one. Otherwise ask backend (wandelappbackend_issues_v2) for new cuid:
    // todo: therefor implement getcuid function in routes.js module!
    // cuid is needed to get only the routes that belong to this cuid.
    const cuid = 'test'; //todo: Temporarily use a dummy cuid (with the result that all app users see all routes!)

    //Wait until Ractive is ready
    ractive_ui.on('complete', () => {

        //New mapbox-gl map
        map = new Map();
        const geo_options = {
            enableHighAccuracy: true,
            maximumAge: 1000,
            timeout: 10000
        };

        //Get routes from server and show these as choices
        getroutesjson(remoteserver + '/routes?cuid=' + cuid)
            .then(
                (routesjson) => {
                    ractive_ui.set("hikes", routesjson);
                },
                (reason) => {
                    // Error retreiving routes!
                    console.log(reason);
                }
            )
            .catch(
                (e) => {
                    console.log(e);
                }
            )
        ;

        //Update device location on map
        navigator.geolocation.watchPosition(map.geo_success.bind(map), null, geo_options);
    });

    //Events
    ractive_ui.on({
            'collapse': (event, filename, routeobj) => {
                console.log("yes yes yes");
                //Toggle description
                $(".item").toggle(false);
                $("#route" + filename).toggle(true);
                //Show chosen route on map
                map.showroute(routeobj.data.json);
            },
            'uploadgpx': (event) => {
                const file = event.original.target.files[0];
                if (file) {
                    //Post route (gpx text file) async
                    posttextfile(remoteserver + '/upload?cuid=' + cuid, file)
                        .then(
                            () => {
                                //Retreive the latest routes async
                                getroutesjson(remoteserver + '/routes?cuid=' + cuid)
                                    .then(
                                        (routesjson) => {
                                            //Show success
                                            $("#info").html("Route is toegevoegd");
                                            ractive_ui.set("hikes", routesjson);
                                            //Show chosen route
                                            map.showroute(routesjson[0].data.json);
                                        },
                                        (reason) => {
                                            //error
                                            $("#info").html(reason);
                                        }
                                    )
                                    .catch(
                                        (reason) => {
                                            //error
                                            $("#info").html(reason);
                                        }
                                    )
                                ;
                            }
                        )
                        .catch(
                            (e) => {
                                $("#info").html(e);
                            }
                        )
                    ;
                }
            }
        }
    );
};

//Expose ractive functions
exports.hikingapp = hikingapp;
