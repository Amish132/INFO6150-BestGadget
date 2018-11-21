// app/routes.js

// grab the nerd model we just created
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/buygadgets');
var Product = require('./models/proudct');
var csrf = require('csurf');
var csrfProtection = csrf();


module.exports = function (app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// sample api route
	app.use(csrfProtection); 
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
						res.redirect('login');
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
		Product.find(function(err, productLength){
			var popularProducts = [];
			var rowSize = 3;
			for(var i= 0; i <productLength.length; i+=rowSize){
				popularProducts.push(productLength.slice(i, i+rowSize));
			}
			res.render('home',{products: popularProducts, helpers: {
				times: function (n, block) { var accum = '';
				for(var i = 0; i < n; i++)
					accum += block.fn(i);
				return accum;},
				ntimes: function (n, block) { var accum = '';
				for(var i = 5; i > n; i--)
					accum += block.fn(i);
				return accum;}

			}

			
			
			
			});
		});
	     
	});

	function isLoggedIn(req, res, next){
		if(req.isAuthenticated()){
		   return next();	 
		}
		res.redirect('/login');

	}

	function isLoggedOut(req, res, next){
		if(!req.isAuthenticated()){
		   return next();	 
		}
		res.redirect('/');

	}

	app.get('/aboutus', function (req, res) {
		res.render('aboutus');
		
	});

	app.get('/contact', function (req, res) {
		res.render('contactus');
	});

	app.get('/careers', function (req, res) {
		res.render('careers');
	});

	app.get('/cart', function (req, res) {
		res.render('cart');
	});

	app.get('/payments', function (req, res) {
		res.render('payments');
	});

	app.get('/shipping', function (req, res) {
		res.render('shipping');
	});

	app.get('/cancellation', function (req, res) {
		res.render('cancellation');
	});

	app.get('/faq', function (req, res) {
		res.render('faq');		
	});

	app.get('/return', function (req, res) {
		res.render('return');
	});

	app.get('/terms', function (req, res) {
		res.render('terms');
	});

	app.get('/services', function (req, res) {
		res.render('services');
	});

	app.get('/security', function (req, res) {
		res.render('security');
	});


	app.get('/privacy', function (req, res) {
		res.render('privacy');
	});

	app.get('/register', isLoggedOut,function (req, res) {
		res.render('register');
	});

	app.get('/login', isLoggedOut,function (req, res) {
		res.render('login',{csrfToken: req.csrfToken()});
	});
	app.get('/productDetails', function (req, res) {
		res.render('productDetails');
	});	
	app.get('/checkout', isLoggedIn,function (req, res) {
		res.render('checkout');
	});
	app.get('/:pid/productDetails', function (req, res) {
		var id = req.params.pid;
		Product.findById(id,function(err,productLength){
			console.log(productLength);
			res.render('productDetails',{products: productLength,helpers: {
				times: function (n, block) { var accum = '';
				for(var i = 0; i < n; i++)
					accum += block.fn(i);
				return accum;},
				ntimes: function (n, block) { var accum = '';
				for(var i = 5; i > n; i--)
					accum += block.fn(i);
				return accum;}

			}

			})

		})
	});	
	app.get('/categoryLanding', function (req, res) {

		Product.find(function(err, productLength){
			var popularProducts = [];
			var rowSize = 3;
			for(var i= 0; i <productLength.length; i+=rowSize){
				popularProducts.push(productLength.slice(i, i+rowSize));
			}
			res.render('categoryLanding',{products: popularProducts})

			
		});
	     
	});

}