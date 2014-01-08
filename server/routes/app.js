export.addRoutes = function (app, config) {
	app.all('/*', function(req, res) {
		res.sendfile('index.html', { root: config.server.distFolder });
	});
};