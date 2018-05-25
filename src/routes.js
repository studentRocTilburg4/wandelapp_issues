/**
 * Read json from remoteserver
 * @param remoteserver
 * @returns {Promise}
 */
const getroutesjson = (remoteserver) => {
	// console.log(remoteserver);

	return new Promise((resolve, reject) => { //New promise for array
		// let routesjson = [];
		fetch(remoteserver)
			.then(function (response) {
				return response.json();
			})
			.then(function(myJson) {
				const routesjson = myJson.map((f) => {
					return {data: f};
				});
				console.log(myJson);
				console.log("Fetch werkt!");
				resolve(routesjson);
			})
			.then(function (fail) {
				reject(fail);
			});
	});
};

/**
 * Post a textfile to the remoteserver
 * @param remoteserver
 * @param file
 * @returns {Promise}
 */
const posttextfile = (remoteserver = "", file = "") => {

	return new Promise((resolve, reject) => { //New promise for array
		const reader = new FileReader();
		//Send contents file when read
		reader.onloadend = (e) => {
			const contents = e.target.result;

			const xhr = new XMLHttpRequest();
			xhr.onreadystatechange = () => {
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
						reject("Problem posting " + xhr.status);
					}
				}
			};

			xhr.open("POST", remoteserver);
			xhr.overrideMimeType("text/plain; charset=x-user-defined-binary");
			xhr.send(contents);
		};
		reader.readAsText(file);
	});
};

//expose ajax functions
exports.getroutesjson = getroutesjson;
exports.posttextfile = posttextfile;
