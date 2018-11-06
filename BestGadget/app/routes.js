// app/routes.js

// grab the nerd model we just created
var Sample = require('./models/sample');

module.exports = function (app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// sample api route
	app.get('/api/show', function (req, res) {


		Sample.find(function (err, samples) {
			// if there is an error retrieving, send the error.
			// nothing after res.send(err) will execute
			if (err)
				res.send(err);
			console.log('samples', samples);
			res.json(samples);
		});
	});

	app.post('/api/search', function (req, res) {
		var rec = req.body.message;
		console.log("inside search" + rec);
		Sample.find({
			message: rec
		}, function (err, samples) {
			// if there is an error retrieving, send the error.
			// nothing after res.send(err) will execute
			if (err)
				res.send(err);
			console.log('samples', samples);
			res.json(samples);
		});
	});


	app.post('/api/insert', function (req, res) {
		//console.log(req.body.message);
		var rec = new Sample(req.body);
		rec.save(function (err, n) {
			if (err)
				console.log('saving failed');
			console.log('saved ' + n.message);
		});
	});

	app.post('/api/delete', function (req, res) {
		console.log("inside api delte" + req.body.message);
		var rec = req.body.message;
		Sample.deleteOne({
			message: rec
		}, function (err) {
			if (err)
				console.log('deleting failed');
			console.log('deleted');
			res.json('deleted');
		});
	});

	app.post('/api/update', function (req, res) {
		console.log("inside api update" + req.body.message);
		var rec = req.body.message;
		var myquery = {
			message: rec
		};
		console.log(req.body.updatedMessage);
		var newUpdate = req.body.updatedMessage;
		var newvalues = {
			$set: {
				message: newUpdate
			}
		};
		Sample.updateOne(myquery, newvalues, function (err) {
			if (err)
				console.log('saving failed');
			console.log("1 document updated");
			res.json('updated');
		});
	});


	// route to handle creating goes here (app.post)
	// route to handle delete goes here (app.delete)

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/', function (req, res) {
		res.sendfile('./public/views/index.html'); // load our public/index.html file
	});

	app.get('/aboutus', function (req, res) {
		res.sendfile('./public/views/aboutus.html');
	});

	app.get('/contact', function (req, res) {
		res.sendfile('./public/views/contactus.html');
	});

	app.get('/careers', function (req, res) {
		res.sendfile('./public/views/careers.html');
	});

	app.get('/payments', function (req, res) {
		res.sendfile('./public/views/payments.html');
	});

	app.get('/shipping', function (req, res) {
		res.sendfile('./public/views/shipping.html');
	});

	app.get('/cancellation', function (req, res) {
		res.sendfile('./public/views/cancellation.html');
	});

	app.get('/faq', function (req, res) {
		res.sendfile('./public/views/faq.html');
	});

	app.get('/return', function (req, res) {
		res.sendfile('./public/views/return.html');
	});

	app.get('/terms', function (req, res) {
		res.sendfile('./public/views/terms.html');
	});


	app.get('/security', function (req, res) {
		res.sendfile('./public/views/security.html');
	});


	app.get('/privacy', function (req, res) {
		res.sendfile('./public/views/privacy.html');
	});

};