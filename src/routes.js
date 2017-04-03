import * as $ from 'jquery';

// Read array with routes from server
const getroutesjson = (remoteserver) => {
    return new Promise((resolve, reject) => { //New promise for array
        let routesjson = [];
        $.ajax({
                type: "GET",
                url: remoteserver,
                dataType: "json"
            })
            .done((data) => {
                    data.forEach((f) => {
                        routesjson.push({
                            data: f
                        }); //Save geojson in routesjson array
                    });
                    resolve(routesjson);
                }
            )
            .fail((err) => reject(err));
    });
};

//Post a textfile to the server
const posttextfile = (remoteserver, file) => {
    'use strict';

    if(remoteserver == null) {
        remoteserver = "";
    }
    if(file == null) {
        file = "";
    }


    return new Promise((resolve, reject) => { //New promise for array
        const reader = new FileReader();
        reader.onload = (e) => {
            const contents = e.target.result;
            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const res = JSON.parse(xhr.response);
                        console.log(res);
                        if(res.error === true){
                            reject(res.msg);
                        } else {
                            resolve();
                        }
                    } else {
                        reject("Problem posting");
                    }
                }
            };

            xhr.open("POST", remoteserver);
            xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
            xhr.send(contents);
        };
        reader.readAsText(file);
    });
};

//expose ajax functions
exports.getroutesjson = getroutesjson;
exports.posttextfile = posttextfile;
