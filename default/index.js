// Browser compatible object
var sosRunner = {
	/**
	 * Required runner daemon function
	 */
	run: function () {
		setInterval(function () {

			console.log('Running SOS Runner...');
			sos.management.network.listInterfaces().then(function(interfaces){console.log("listInterfaces",interfaces)})
		}, 60e3);
	},

	/**
	 * Required for settings, policy and bulk.
	 */
	set: function (data) {
		return new Promise(function (resolve, reject) {
			try {
				window.parent.document.body.style.backgroundColor = data.backgroundColor;
				window.fetch(data.myBaseUrl)
					.then(response => {
						if (!response.ok) {
							throw new Error('Network response was not ok');
						}
						const data = response.json();
						console.assert(data, 'Response JSON');
					})
					.then(data => {
						console.log(data);
					})
					.catch(error => {
						console.error('Fetch error:', error);
					});

				resolve();

			} catch (error) {
				reject(error);
			}
		});
	},
	/**
	 * Required for telemetry.
	 */
	get: function () {
		return new Promise(function (resolve, reject) {
			try {
				const viewportWidth = window.innerWidth;
				const viewportHeight = window.innerHeight;

				resolve({
					resolution: `${viewportWidth} x ${viewportHeight}`
				});
			} catch (error) {
				reject(error);
			}
		});
	}
};

if (typeof window !== 'undefined') {
	window.sosRunner = sosRunner;
}