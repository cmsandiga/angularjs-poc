// expose the routes to our app with module.exports
module.exports = function(app) {

	app.post('/api/authenticate', function(req, res) {
		console.log(req.body.email);
		if(req.body.email == 'juliano.vidal@meltdsp.com') {
			res.json({ type: true, data: {email: req.body.email}, token: 'ABCDEFGH' });
		} else {
			res.json({ type: false, data: "Authenticate: Incorrect email/password" });
		}
	});

};