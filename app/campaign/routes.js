// expose the routes to our app with module.exports
module.exports = function(app) {
	
	app.get('/api/list', ensureAuthorized, function(req, res) {
		if(req.token == 'ABCDEFGH') {
			res.json({ type: true, data: {} });
		} else {
			res.json({ type: false, data: "Me: Incorrect email/password" });
		}
	});

	app.get('/api/view/:id', ensureAuthorized, function(req, res) {
		console.log('Campaign id: ' + req.params.id);
		if(req.token == 'ABCDEFGH') {
			res.json({ type: true, data: {} });
		} else {
			res.json({ type: false, data: "Me: Incorrect email/password" });
		}
	});
}

function ensureAuthorized(req, res, next) {
	var bearerToken;
	var bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== 'undefined') {
		var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}