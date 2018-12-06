
var ProductBuyGadgets = require('../app/models/proudct');

var mongoose = require('mongoose');

// connect
var db = require('../config/database')

mongoose.connect(db.mongoURI, { useNewUrlParser: true });

// arr
var products = [
    new ProductBuyGadgets({
    imagepath: "images/productImages/Laptop1.jpeg",
    title: "Dell i5 8th Gen",
    description: "(8 GB/256 GB SSD/Windows 10 Home) 9370 Thin and Light Laptop  (13 inch, Silver, 1.21 kg, With MS Office) Get more productive with the Dell XPS 13 laptop. Featuring a Windows 10 Home operating system, an 8th Gen Intel Core i5 processor, and 8 GB of DDR3 RAM, this laptop offers a seamless computing experience even when you’re multitasking.",
    price: 600,
    productRating: 5,
	Category:"Laptop",
  Brand:"Dell",
  }),

  
  new ProductBuyGadgets({
    imagepath: "images/productImages/Laptop2.jpeg",
    title: "Apple MacBook Pro",
    description: "Core i7 7th Gen - (16 GB/512 GB SSD/Mac OS Sierra/2 GB Graphics) MPTT2HN/A  (15.4 inch, SPace Grey, 1.83 kg) 8GB/128GB SSD",
    price: 1749,
    productRating: 5,
	Category:"Laptop",
	Brand:"Apple"
  }),
  
  
  new ProductBuyGadgets({
    imagepath: "images/productImages/phone1.jpeg",
    title: "Apple iPhone X ",
    description: "Meet the iPhone X - the device that’s so smart that it responds to a tap, your voice, and even a glance. Elegantly designed with a large 14.73 cm (5.8) Super Retina screen and a durable front-and-back glass, this smartphone is designed to impress. What’s more, you can charge this iPhone wirelessly.",
    price: 459,
    productRating: 5,
	Category:"Mobile",
	Brand:"Apple"
  }),
  
  
  new ProductBuyGadgets({
    imagepath: "images/productImages/phone2.jpeg",
    title: "Lenovo K8",
    description: "(Venom Black, 64 GB)  (4 GB RAM)The Lenovo K8 Note is the most power KillerNote ever. Experience a new level of performance with a 10-core processor plus up to 4GB of RAM and 64GB of storage. K8 Note comes with 2 parallel rear cameras with 13MP and 5MP depth sensors to capture DSLR-like depth of field effect. Take amazing selfies with high resolution 13MP front camera with party flash. Enjoy an immersive multimedia experience with 13.97cm (5.5) Full HD Display with Dolby Atmos support. K8 Note ships with the stock Android 7.1.1 Nougat for a smooth and responsive experience.",
    price: 369,
    productRating: 5,
	Category:"Mobile",
	Brand:"Lenovo"
  }),
  
  
  new ProductBuyGadgets({
    imagepath: "images/productImages/tablet1.jpg",
    title: "Canon HD 8 Tablet ",
    description: " 8 HD Display, 16 GB, Black - with Special OffersUp to 10 hours of battery life, a vibrant 8 HD display, a 1.3 GHz quad-core processor, 1.5 GB of RAM, and Dolby Audio.16 or 32 GB of internal storage and a microSD slot for up to 400 GB of expandable storage",
    price: 350,
    productRating: 5,
	Category:"Tablet",
	Brand:"Canon "
  }),
  
  
  new ProductBuyGadgets({
    imagepath: "images/productImages/tablet2.jpeg",
    title: "Dell A3 10",
    description: " 16 GB 10.1 inch with Wi-Fi+4G Tablet (Volcano Black)For a premium multimedia experience, get the Dell A3 10. With a 25.4 cm display and an immersive sound, this tablet takes your entertainment experience to the next level.",
    price: 259,
    productRating: 4,
	Category:"Tablet",
	Brand:"Dell"
  }),
  
  new ProductBuyGadgets({
    imagepath: "images/productImages/mobileCase1.jpg",
    title: "One Plus 5 case",
    description: " Feitenn Premium Flip Leather PU Wallet case Sleep Wake up Smart Cover with Stand Kickstand Card Compatible with Oneplus five Oneplus 5 1+5. Select imported leather and pearl Bottom mix bump PC clamshell design.2. The case surrounds all the edges, cover the whole phone with a full body protection on front and back when phone in your pocket and purse, well protected, more safe including the volume buttons and the mute switch, not just a bumper guard for the sides or back, really 360 protection",
    price: 25,
    productRating: 4,
	Category:"MobileCase",
	Brand:"OnePlus"
  }),
  new ProductBuyGadgets({
    imagepath: "images/productImages/mobileCase2.jpeg",
    title: "Bose Back Cover",
    description: " Back Cover for LG Q Stylus Plus  (Black, Rubber, Silicon)premium quality case cover to protect and make your mobile look even more stylish. Protects your phone from scratches and scuffs. Dirt proof and scratch proof, static resistant, precision melded for a perfect fit. Perfectly designed case for your mobile. High quality genuine material and durable quality. Easy to install and remove. Completely protect the mobile phone from dirt, scratch and bumps. Perfect to use in any outdoor activities or travel to protect your phone. The cover makes your mobile unique, useful and practical. And the reinforced sides provide firm support and protect the mobile.",
    price: 39,
    productRating: 4,
	Category:"MobileCase",
	Brand:"Bose "
  }),
  
  new ProductBuyGadgets({
    imagepath: "images/productImages/headphone1.jpeg",
    title: "Bose SoundSport ",
    description: " In Ear for Apple Devices Wired Headset with Mic  (Green, In the Ear)If you’re all for morning jogs and evening runs, this pair of Bose earphones is especially designed for you. It’s weather-proof and sweat-resistant, and has proprietary StayHear tips so they comfortably fit your ears. Its Bose’s TriPort technology gives it natural-sounding lows and clear high sounds.",
    price: 59,
    productRating: 4,
	Category:"HeadPhones",
	Brand:"Bose"
  }),
  
  new ProductBuyGadgets({
    imagepath: "images/productImages/headphone2.jpeg",
    title: "Dell Headset",
    description: " MOBILE FIT Bluetooth headset with high bass and clear sound compatible with Dell Venue 10 Pro Bluetooth Headset with Mic  (Red, In the Ear)Latest Wireless Bluetooth 4.1 Technology with A2DP stereo music and AptX pure, clear sound, ideal for high quality music while running, jogging, cycling, skating, etc Good noise isolation to create the optimal environment for listening to your favorite tunes, built-in microphone with noise cancellation for clear calling and friends chatting Sweat-proof, light weight and ergonomic design to enhance your comfort; comes with interchangeable earbuds and ear hooks for secure and personal fit when walking or exercising Built-in rechargeable Lithium battery lasts up to 4.5 hours of talk / play time or 175 hours standby, universally compatible with most Bluetooth-enabled phones. Works with iPhone, iPad, Android and Windows Smartphones tablets and other Bluetooth devices",
    price: 250,
    productRating: 4,
	Category:"HeadPhones",
	Brand:"Dell"
  }),
   new ProductBuyGadgets({
    imagepath: "images/productImages/powerBank1.jpeg",
    title: "Lenovo Power Bank",
    description: "Lenovo 10400 mAh Power Bank (GXV0Q56143, PA10400)  (Silver, Lithium-ion)Quickly Charged, Take-along Convenience, Charge-distance 500 Times, Input: Micro USB 5V/2A, Output: USB 5V/2.1A",
    price: 99,
    productRating: 4,
	Category:"powerBanks",
	Brand:"Lenovo"
  }),
  new ProductBuyGadgets({
    imagepath: "images/productImages/powerBank2.jpeg",
    title: "Boss Power Bank",
    description: "Ever Bose 20800 mAh Power Bank (E05XQ26-, Premium Quality USB Portable High Capacity )  (Silver, Lithium-ion)There are very few smartphones whose battery lasts for an entire day. It's also cumbersome to carry a charger, as you may not always find a power socket. Don't fret, as the Dog wood Power bank gives you that extra juice so you can finish compiling your documents or beating your high score on Angry Birds.",
    price: 89,
    productRating: 4,
	Category:"powerBanks",
	Brand:"Bose "
  }),
  new ProductBuyGadgets({
    imagepath: "images/productImages/HardDisk1.jpeg",
    title: "Canon HardDisk",
    description: "Canon Backup Plus Slim 2 TB Wired External Hard Disk Drive  (Silver, Mobile Backup Enabled)Backup your personal and professional data on the Seagate 2 TB External Hard Drive and carry it wherever you go.",
    price: 70,
    productRating: 4,
	Category:"HardDisk",
	Brand:"Canon  "
  }),
  new ProductBuyGadgets({
    imagepath: "images/productImages/HardDisk2.jpeg",
    title: "Dell StoreJet",
    description: "Dell StoreJet 25M3 2.5 inch 2 TB External Hard Disk  (Black)Now make sharing and transferring files a piece of cake with this StoreJet 25M3 external hard disk from Transcend, and enjoy a hassle-free digital life.Shock-resistantThis hard disk has an advanced 3-stage shock protection system, which makes it a durable device to have at your disposal.",
    price: 60,
    productRating: 4,
	Category:"HardDisk",
	Brand:"Dell"
  }),
  new ProductBuyGadgets({
    imagepath: "images/productImages/Pendrive1.jpeg",
    title: "Dell 16GB m3.0",
    description: "Dell 16GB m3.0 16 GB OTG Drive  (Silver, Grey, Type A to Lightning)USB 3.0|16 GB Plastic For Laptop, Audio Player, Gaming Console, Tablet, Desktop Computer, Mobile, Netbook Color:Silver, Grey",
    price: 12,
    productRating: 3,
	Category:"Pendrive",
	Brand:"Dell"
  }),
  new ProductBuyGadgets({
    imagepath: "images/productImages/Pendrive2.jpeg",
    title: "Canon 16GB m3.0",
    description: "Canon iXpand Mini Flash Drive 32 GB Pen Drive  (Grey)USB 3.0|16 GB Plastic For Laptop, Audio Player, Gaming Console, Tablet, Desktop Computer, Mobile, Netbook Color:Silver, Grey",
    price: 16,
    productRating: 2,
	Category:"Pendrive",
	Brand:"Canon"
  }),
  new ProductBuyGadgets({
    imagepath: "images/productImages/keyboard1.jpeg",
    title: "Canon 16GB m3.0",
    description: "Electrobot Ultra Thin 2.4GHz Wireless Keyboard + Cover and Wireless Mouse Kit for Desktop Laptop Wireless Multi-device Keyboard  (White)Specification:- 1.Material: ABS, 2.Color: White, 3.Keyboard battery: 2 X AAA batteries(battery not included), 4.Mouse battery: 1 X AAA batteries(battery not included), 5.Wireless carrier frequency: 2400-2480MHZ, 6.Wireless channel: 32 (automatic hopping), 7.Rated operational voltage: 1.5V, 8.Max acceleration: 14" ,
    price: 21,
    productRating: 1,
	Category:"Keyboard",
	Brand:"Lenovo"
  }),
  new ProductBuyGadgets({
    imagepath: "images/productImages/keyboard2.jpeg",
    title: "Canon 16GB m3.0",
    description: "lenovo Premium Series Flexible Foldable Wired USB Laptop Keyboard  (Black)secification:- 1.Material: ABS, 2.Color: White, 3.Keyboard battery: 2 X AAA batteries(battery not included), 4.Mouse battery: 1 X AAA batteries(battery not included), 5.Wireless carrier frequency: 2400-2480MHZ, 6.Wireless channel: 32 (automatic hopping)",
    price: 22,
    productRating: 3,
	Category:"Keyboard",
	Brand:"Oneplus"
  }),
  new ProductBuyGadgets({
    imagepath: "images/productImages/lgMobile.jpeg",
    title: "Lg G6",
    description: "lg Premium Series Flexible Foldable Wired USB Laptop Keyboard  (Black)secification:- 1.Material: ABS, 2.Color: White, 3.Keyboard battery: 2 X AAA batteries(battery not included), 4.Mouse battery: 1 X AAA batteries(battery not included), 5.Wireless carrier frequency: 2400-2480MHZ, 6.Wireless channel: 32 (automatic hopping)",
    price: 23,
    productRating: 3,
	Category:"Mobile",
	Brand:"LG"
  }),
   new ProductBuyGadgets({
    imagepath: "images/productImages/lgMobile2.jpeg",
    title: "Lg Full Vision",
    description: "lg Premium Series Flexible Foldable Wired USB Laptop Keyboard  (Black)secification:- 1.Material: ABS, 2.Color: White, 3.Keyboard battery: 2 X AAA batteries(battery not included), 4.Mouse battery: 1 X AAA batteries(battery not included), 5.Wireless carrier frequency: 2400-2480MHZ, 6.Wireless channel: 32 (automatic hopping)",
    price: 30,
    productRating: 4,
	Category:"Mobile",
	Brand:"LG"
  }),
  new ProductBuyGadgets({
    imagepath: "images/productImages/HpLaptop1.jpeg",
    title: "HP I7",
    description: "HP Premium Series Flexible Foldable Wired USB Laptop Keyboard  (Black)secification:- 1.Material: ABS, 2.Color: White, 3.Keyboard battery: 2 X AAA batteries(battery not included), 4.Mouse battery: 1 X AAA batteries(battery not included), 5.Wireless carrier frequency: 2400-2480MHZ, 6.Wireless channel: 32 (automatic hopping)",
    price: 400,
    productRating: 4,
	Category:"Laptop",
	Brand:"Hp"
  }),
  new ProductBuyGadgets({
    imagepath: "images/productImages/HpLaptop2.jpeg",
    title: "HP I5",
    description: "HP Premium Series Flexible Foldable Wired USB Laptop Keyboard  (Black)secification:- 1.Material: ABS, 2.Color: White, 3.Keyboard battery: 2 X AAA batteries(battery not included), 4.Mouse battery: 1 X AAA batteries(battery not included), 5.Wireless carrier frequency: 2400-2480MHZ, 6.Wireless channel: 32 (automatic hopping)",
    price: 300,
    productRating: 5,
	Category:"Laptop",
	Brand:"Hp"
  })

  
  
];



var done = 0;
for(var i=0; i < products.length; i++) {
  products[i].save(function(err, n){
    done++;
    if(err){
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