import Ractive from "ractive";
import Map from "./map";
import {getroutesjson, posttextfile} from "./routes";
// Hiking app

const hikingapp = (remoteserver) => {
	"use strict";
	function createHikingApp(cuid){
		//Init
		const ractive_ui = new Ractive({
			el: "#container",
			template: "#template",
			debug: true
		});
		let map = null;

		ractive_ui.on("complete", () => {
			//New mapbox-gl map
			map = new Map();
			const notCenterMe = document.querySelector("#notCenterMe");
			//Get routes from server and show these as choices
			getroutesjson(remoteserver + "/routes?cuid=" + cuid)
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
				);	
			//Update device location on map		
			setInterval(function(){
				if (notCenterMe.checked !== true) {
					navigator.geolocation.getCurrentPosition(map.geo_success.bind(map));
				}
			}, 1000);
		});

        //Events
		ractive_ui.on({
			"collapse": (event, filename, routeobj) => {			
				const item = document.getElementsByClassName("item");
				for (let x = 0; x < item.length; x++){
					item[x].style.display = "none";
				}
				const route = document.getElementById(`route${filename}`);
				route.style.display = "block";

				//Show chosen route on map
				map.showroute(routeobj.data.json);

                const option = document.getElementById('option');
                option.addEventListener('click', function () {
                    for (let x = 0; x < item.length; x++){
                        item[x].style.display = "none";
                    }
                    console.log('a');
                });

			},
			"uploadgpx": (event) => {
				const file = event.original.target.files[0];
				const info = document.getElementById("info");
				if (file) {
					//Post route (gpx text file) async
					posttextfile(remoteserver + "/upload?cuid=" + cuid, file)
						.then(
							() => {
								//Retreive the latest routes async
								getroutesjson(remoteserver + "/routes?cuid=" + cuid)
									.then(
										(routesjson) => {
											//Show success

											info.innerText = "Route is toegevoegd";
											ractive_ui.set("hikes", routesjson);
											//Show chosen route
											map.showroute(routesjson[0].data.json);
										},
										(reason) => {
											//error
											info.innerText = reason;
										}
									)
									.catch(
										(reason) => {
											//error
											info.innerText = reason;
										}
									);
							}
						)
						.catch(
							(e) => {
								info.innerText = e;
							}
						);
				}
			},
			"changeStyle": function changeStyle() {
				if (map.map.getStyle().sprite === "mapbox://sprites/mapbox/satellite-v9") {
					map.map.setStyle("mapbox://styles/mapbox/streets-v8");
				} else {
					map.map.setStyle("mapbox://sprites/mapbox/satellite-v9");
				}
			}
		});
	}
	// todo: Get cuid from localstorage if there is one. Otherwise ask backend (wandelappbackend_issues_v2) for new cuid:
	if(!localStorage.getItem("cuid")){
		fetch("https://nodejs-mongo-persistent-wandelappbackend-v4.a3c1.starter-us-west-1.openshiftapps.com/cuid")
			.then(function(response){
				return response.json();
			})
			.then(function(myJson) {
				localStorage.setItem("cuid", myJson.cuid);
				createHikingApp(localStorage.getItem("cuid"));
			});
	} else {
		
		createHikingApp(localStorage.getItem("cuid"));
	}
};
//Expose ractive functions
exports.hikingapp = hikingapp;
