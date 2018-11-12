
var ProductBuyGadgets = require('../app/models/proudct');

var mongoose = require('mongoose');

// connect
mongoose.connect('mongodb://localhost/buygadgetsapp', { useNewUrlParser: true});

// arr
var products = [
    new ProductBuyGadgets({
    imagepath: "images/trending/trending1.jpg",
    title: "Boss Ear Phones",
    description: "Classic Ear phones",
    price: 32,
    productRating: 5
  }),

  
  new ProductBuyGadgets({
    imagepath: "images/trending/trending2.jpeg",
    title: "Dell Inspiron i7",
    description: "8GB/128GB SSD",
    price: 749,
    productRating: 4.5
  }),
  
  
  new ProductBuyGadgets({
    imagepath: "images/trending/trending3.jpg",
    title: "Fossil Smart Q-3",
    description: "Be fit and smart",
    price: 59,
    productRating: 3
  }),
  
  
  new ProductBuyGadgets({
    imagepath: "images/trending/trending4.jpg",
    title: "Microsoft Surface",
    description: "8-GB/256 GB SSD",
    price: 569,
    productRating: 3.5
  }),
  
  
  new ProductBuyGadgets({
    imagepath: "images/trending/trending5.jpg",
    title: "Amazon Alexa",
    description: "AI Smart Shopper",
    price: 350,
    productRating: 4
  }),
  
  
  new ProductBuyGadgets({
    imagepath: "images/trending/trending6.jpg",
    title: "Apple i-watch",
    description: "i watch: faster",
    price: 259,
    productRating: 4
  })
];



var done = 0;
for(var i=0; i < products.length; i++) {
  products[i].save(function(err, n){
    done++;
    if(err){
        console.log("biscuit");
        console.log(err);
    }
    if(done === products.length) {
      exit();
    }
  });

}


function exit() {
  mongoose.disconnect();
}