// app/routes.js

// grab the nerd model we just created
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/buygadgets');

module.exports = function (app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// sample api route
	app.post('/register', function (req, res) {
		var email = req.body.email;
		var username = req.body.username;
		var password = req.body.password;
		var confirmpassword = req.body.confirmpassword;
	
		// Validation
		req.checkBody('email', 'Email is required').notEmpty();
		req.checkBody('email', 'Email is not valid').isEmail();
		req.checkBody('username', 'Username is required').notEmpty();
		req.checkBody('password', 'Password is required').notEmpty();
		req.checkBody('confirmpassword', 'Passwords do not match').equals(req.body.password);
	
		var errors = req.validationErrors();
	
		if (errors) {
			res.render('register', {
				errors: errors
			});
		}
		else {
			//checking for email and username are already taken
			User.findOne({ username: { 
				"$regex": "^" + username + "\\b", "$options": "i"
		}}, function (err, user) {
				User.findOne({ email: { 
					"$regex": "^" + email + "\\b", "$options": "i"
			}}, function (err, mail) {
					if (user || mail) {
						res.render('register', {
							user: user,
							mail: mail
						});
					}
					else {
						var newUser = new User({
							email: email,
							username: username,
							password: password
						});
						User.createUser(newUser, function (err, user) {
							if (err) throw err;
							console.log(user);
						});
				 req.flash('success_msg', 'You are registered and can now login');
						res.redirect('/');
					}
				});
			});
		}
	});

	passport.use(new LocalStrategy(
		function (username, password, done) {
			User.getUserByUsername(username, function (err, user) {
				if (err) throw err;
				console.log(user);
				if (!user) {
					return done(null, false, { message: 'Unknown User' });
				}
	
				User.comparePassword(password, user.password, function (err, isMatch) {
					if (err) throw err;
					if (isMatch) {
						return done(null, user);
					} else {
						return done(null, false, { message: 'Invalid password' });
					}
				});
			});
		}));
	
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});
	
	passport.deserializeUser(function (id, done) {
		User.getUserById(id, function (err, user) {
			done(err, user);
		});
	});
	
	app.post('/login',
		passport.authenticate('local', { successRedirect: '/', failureRedirect: 'login', failureFlash: true }),
		function (req, res) {
			res.redirect('/');
		});
	
	app.get('/logout', function (req, res) {
		req.logout();
	
		req.flash('success_msg', 'You are logged out');
	
		res.redirect('/');
	});


	// route to handle creating goes here (app.post)
	// route to handle delete goes here (app.delete)

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/', function (req, res) {
		res.render('home');
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

	app.get('/register', function (req, res) {
		res.render('register');
	});

	app.get('/login', function (req, res) {
		res.render('login');
	});

};