module.exports=function productCart(oldCart){
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;
  this.add = function(item, id) {
    var existingItem = this.items[id];
    if(!existingItem) {
      existingItem = this.items[id] = {item: item, qty: 0, price: 0};
    }

    existingItem.qty++;
    existingItem.price = existingItem.item.price * existingItem.qty;
    this.totalQty++;
    this.totalPrice += existingItem.item.price;
  }

  this.reduceByOne = function(id) {
    this.items[id].qty--;
    this.items[id].price -= this.items[id].item.price;
    this.totalQty--;
    this.totalPrice -= this.items[id].item.price;
    
    if(this.items[id].qty <= 0) {
      delete this.items[id];
    }
  }

  this.increaseByOne = function(id) {
    this.items[id].qty++;
    this.items[id].price += this.items[id].item.price;
    this.totalQty++;
    this.totalPrice += this.items[id].item.price;
    
   /* if(this.items[id].qty <= 0) {
      delete this.items[id];
    }*/
  }
  
  this.removeItem = function(id) {    
    this.totalQty -= this.items[id].qty;
    
    this.totalPrice -= this.items[id].price;
   
    delete this.items[id]; 
  }
  
  
  this.generateProductsArray = function() {
    var arr = [];
    
    for(var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  }
  
}
