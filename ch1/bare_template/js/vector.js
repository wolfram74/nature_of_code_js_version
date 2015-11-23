var Vector = function(array){
  this.values = array
}

Vector.prototype.add = function(otherVec){
  if(this.values.length != otherVec.values.length){
    throw new Error("Dimension mismatch on vector addition")
  };
  for(var i=0; i<this.values.length; i++){
    this.values[i] += otherVec.values[i]
  };
};
