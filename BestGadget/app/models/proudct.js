var mongoose = require('mongoose');


var Schema = mongoose.Schema;


var schema = new Schema({	 
	imagepath: {
		type: String,
		required:true
	},
	title: {
		type: String,
		required:true
	},
	description: {
		type: String,
		required:true
	},
	price: {
		type: Number,
		required:true
	},
	productRating: {
		type: Number
	}
});	

module.exports = mongoose.model("ProductBuyGadgets", schema);