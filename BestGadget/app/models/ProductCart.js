module.exports=function productCart(oldCart){
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;
  this.add = function(item, id,quantity) {
    var existingItem = this.items[id];
    if(!existingItem) {
      existingItem = this.items[id] = {item: item, qty: quantity, price: 0};
    }
    else
    {
    existingItem.qty+=quantity;
    }
    existingItem.price = existingItem.item.price * existingItem.qty;
    
    if(oldCart.totalQty){
    this.totalQty = (oldCart.totalQty + quantity);
    this.totalPrice = (oldCart.totalPrice)+(existingItem.item.price*quantity);
    }
    else{
      this.totalQty = existingItem.qty;
      this.totalPrice = (existingItem.price);
    }

    
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
