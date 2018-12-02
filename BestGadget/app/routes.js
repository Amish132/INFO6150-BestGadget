// app/routes.js

// grab the nerd model we just created
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/buygadgets');
var Product = require('./models/proudct');
var csrf = require('csurf');
var csrfProtection = csrf();
var ProductCart =require('./models/ProductCart');
var Order = require('./models/order');


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
		passport.authenticate('local', {failureRedirect: 'login', failureFlash: true }),
		function (req, res) {
			if(req.session.existing) {
				var existing = req.session.existing;
				req.session.existing = null;
				res.redirect(existing);
			  }
			  else{
				res.redirect('/');
			  }
			
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
		Product.find({ productRating: { $gte: 4 } },function(err, productLength){
			var popularProducts = [];
			var rowSize = 3;
			for(var i= 0; i < 6; i+=rowSize){
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
				return accum;},
				carttimes: function (n, block) { var accum = '';
				for(var i = 0; i <6; i++)
					accum += block.fn(i);
				return accum;},


			}

			
			
			
			});
		});
	     
	});

	function isLoggedIn(req, res, next){
		if(req.isAuthenticated()){
		   return next();	 
		}
		req.session.existing = req.url;
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

	app.get('/orderConfirmation', isLoggedIn,function (req, res) {

		var id = req.query.id;
		if(id == null || id == "" || id == undefined) {
			res.redirect('/checkout');
		} else {
 			var successMsg = req.flash('success')[0];
			res.render('orderConfirmation',{successMsg: successMsg,noMessage: !successMsg});
		}
		
	});

	app.get('/contact', function (req, res) {
		res.render('contactus');
	});

	app.get('/careers', function (req, res) {
		res.render('careers');
	});

	app.get('/add-to-cart/:id/:pdp/:quantityVals', function (req, res) {
		var productId= req.params.id;
		var pdpFlag = req.params.pdp;
		var quantityCart = Number(req.params.quantityVals);
		var cart =new ProductCart(req.session.cart ?req.session.cart:{} )
		Product.findById(productId, function(err, product){
			if(err) {
			  // result, not request
			  return res.redirect("/");
	
			}
			cart.add(product, product.id,quantityCart);
			req.session.cart = cart;
			if(pdpFlag=="true"){
				res.redirect("/cart");
			}
			else{			
			res.redirect("/");
			}
		//res.render('cart');
	});
});
app.get('/cart', function (req, res) {
		if(!req.session.cart)
		{
			return res.render('cart',{products:null});
		}
		var cart = new ProductCart(req.session.cart);
		res.render('cart', {products: cart.generateProductsArray(),totalPrice: cart.totalPrice} );
	});



	app.get("/reduce/:id", function(req, res, next){
		var productId = req.params.id;
		var cart = new ProductCart(req.session.cart ? req.session.cart : {});
	  
		cart.reduceByOne(productId);
		
		// after reduce one, need to reassign cart into session.
		req.session.cart = cart;
		
		// shopping-cart is where we have list of products
		res.redirect("/cart");
	  });

	  app.get("/remove/:id", function(req, res, next){
		var productId = req.params.id;
		var cart = new ProductCart(req.session.cart ? req.session.cart : {});
	  
		cart.removeItem(productId);
		
		// after reduce one, need to reassign cart into session.
		req.session.cart = cart;
		
		// shopping-cart is where we have list of products
		res.redirect("/cart");
	  });

	  app.get("/increaseByOne/:id", function(req, res, next){
		var productId = req.params.id;
		var cart = new ProductCart(req.session.cart ? req.session.cart : {});
	  
		cart.increaseByOne(productId);
		
		// after reduce one, need to reassign cart into session.
		req.session.cart = cart;
		
		// shopping-cart is where we have list of products
		res.redirect("/cart");
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
		res.render('register',{csrfToken: req.csrfToken()});
	});

	app.get('/login', isLoggedOut,function (req, res) {
		res.render('login',{csrfToken: req.csrfToken()});
	});
	app.get('/productDetails', function (req, res) {
		res.render('productDetails');
	});	
	app.get('/checkout', isLoggedIn,function (req, res) {
		if(!req.session.cart)
		{
			return res.render('cart',{products:null});
		}
		var cart = new ProductCart(req.session.cart);
		var errMsg = req.flash("error")[0];
		res.render('checkout', {products: cart.generateProductsArray(),totalPrice: cart.totalPrice,totalItems: cart.totalQty,errMsg: errMsg, noError: !errMsg , csrfToken: req.csrfToken()} );
	});

	app.post('/checkout',isLoggedIn, function (req, res) {
		if(!req.session.cart)
		{
			return res.render('cart',{products:null});
		}
		var cart = new ProductCart(req.session.cart);

		var stripe = require("stripe")("sk_test_tWsWzln21gDSilY96LAT5czA");
			stripe.charges.create({
			amount: cart.totalPrice * 100,
			currency: "usd",
			source: req.body.stripeToken, // obtained with Stripe.js
			description: "Test BuyGadgets"
			}, function(err, charge) {
			  if(err){
				  console.log(err);
				  req.flash('error', err.message);
				  return res.redirect('/checkout');
			  }
			  var order = new Order({
				user: req.user,
				cart: cart,
				address: req.body.address,
				name: req.body.username,
				paymentId: charge.id
			  });
			  
			  order.save(function(err, result){
				if(err) {
					console.log(err);
			   return res.redirect('/checkout');
			}
			  req.flash('success','Product Succesfully purchased');
			  req.session.cart = null;
			  res.redirect('/orderConfirmation?id=' +  charge.id);
			  });
			
			});
		
	});




	app.get('/:pid/productDetails', function (req, res) {
		var id = req.params.pid;
		Product.findById(id,function(err,productLength){
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
	app.get('/categoryLanding/:category', function (req, res) {
		var category = req.params.category;
		if((category=="Laptop")||(category=="Mobile")||(category=="Tablet")||(category=="MobileCase")||(category=="HeadPhones")||(category=="powerBanks")||(category=="HardDisk")||(category=="Pendrive")||(category=="Keyboard"))
		{
			var breadcumb ="Products";
			if(category=="Laptop"){
				var Background="/images/background/laptop_background.jpg";
			}
			else if(category=="Mobile"){
				var Background="/images/background/mobile_background.png";
			}
			else if(category=="Tablet"){
				var Background="/images/background/tablet_background.jpg";
			}
			else if(category=="MobileCase"){
				var Background="/images/background/mobilecase_background.jpg";
			}
			else if(category=="HeadPhones"){
				var Background="/images/background/headphone_background.jpg";
			}
			else if(category=="powerBanks"){
				var Background="/images/background/powerbank_background.jpg";
			}
			else if(category=="HardDisk"){
				var Background="/images/background/harddisk_background.jpg";
			}
			else if(category=="Pendrive"){
				var Background="/images/background/pendrive_background.jpg";
			}
			else if(category=="Keyboard"){
				var Background="/images/background/keyboard_background.jpg";
			}
		}else
		{
			var breadcumb ="Brands";
			if(category=="Lenovo"){
				var Background="/images/background/lenovo_background.jpg";
			}
			else if(category=="Oneplus"){
				var Background="/images/background/oneplus_background.jpg";
			}
			else if(category=="Canon"){
				var Background="/images/background/canon_background.jpg";
			}
			else if(category=="Apple"){
				var Background="/images/background/apple_background.jpg";
			}
			else if(category=="Dell"){
				var Background="/images/background/dell_background.jpg";
			}
			else if(category=="Bose"){
				var Background="/images/background/bose_background.png";
			}
			else if(category=="LG"){
				var Background="/images/background/lg_background.png";
			}
			else if(category=="Hp"){
				var Background="/images/background/hp_background.jpg";
			}

		}
		
		Product.find({$or:[{Category:category},{Brand:category}]},function(err, productLength){
			var popularProducts = [];
			var rowSize = 3;
			
			for(var i= 0; i <productLength.length; i+=rowSize){
				popularProducts.push(productLength.slice(i, i+rowSize));
			}
			
			res.render('categoryLanding',{products: popularProducts,category:category,breadcumb:breadcumb, Background:Background ,helpers: {
				times: function (n, block) { var accum = '';
				for(var i = 0; i < n; i++)
					accum += block.fn(i);
				return accum;},
				ntimes: function (n, block) { var accum = '';
				for(var i = 5; i > n; i--)
					accum += block.fn(i);
				return accum;},
				carttimes: function (n, block) { var accum = '';
				for(var i = 0; i <6; i++)
					accum += block.fn(i);
				return accum;},


			}})

			
		});
	     
	});

}