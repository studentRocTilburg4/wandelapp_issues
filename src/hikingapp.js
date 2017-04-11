import $ from 'jquery';
import Ractive from 'ractive';
import {initmap, showroute, loadpoievent, currentlocation} from './map';
import {getroutesjson, posttextfile} from './routes';

// Init (Ractive) app
const hikingapp = function(remoteserver) {
    'use strict';

    const defaultzoomlevel = 12;

    //Create Ractive object
    var ractive_ui = new Ractive({
        el: '#container',
        template: '#template',
        debug: true
    });

    //Init map to draw routes
    const map = initmap();

    //Handle hiking routes from server
    ractive_ui.on('complete', function() {

        getroutesjson(remoteserver + '/routes').then(
            function(routesjson) { // Succesfully retreived routes!
                ractive_ui.set("hikes", routesjson);
                currentlocation(map, defaultzoomlevel);      //Init current location marker

                //Show choosen route in map when clicked
                ractive_ui.on('collapse', function(event, filename, routeobj) {

                    //Toggle description
                    $(".item").toggle(false);
                    $("#route" + filename).toggle(true);

                    //Show chosen route
                    showroute(map, routeobj.data.json, defaultzoomlevel);
                });
            },
            function(reason) {
                console.log(reason); // Error retreiving routes!
            }
        ).catch(function(e) {
            console.log(e);
        });
        loadpoievent(map);
    });

    // Handle upload gpx file to server
    ractive_ui.on('uploadgpx', function(event) {
        const file = event.original.target.files[0];
        if (file) {
            //Post route (gpx text file) async
            posttextfile(remoteserver + '/upload', file)
                .then(
                    function(){
                        //Retreive the latest routes async
                        getroutesjson(remoteserver + '/routes')
                            .then(
                                function(routesjson) {
                                    //Show success
                                    $("#info").html("Route is toegevoegd");
                                    ractive_ui.set("hikes", routesjson);
                                    //Show chosen route
                                    console.log(routesjson[0].data.json);
                                    const poilayer = showroute(map, routesjson[0].data.json, defaultzoomlevel);
                                },
                                function(reason) {
                                    //error
                                    $("#info").html(reason);
                                }
                            ).catch(
                            function(reason) {
                                //error
                                $("#info").html(reason);
                            });
                    }
                )
                .catch(
                    function(e) {
                        $("#info").html(e);
                    }
                );
        }
    });
};

//Expose ractive functions
exports.hikingapp = hikingapp;
