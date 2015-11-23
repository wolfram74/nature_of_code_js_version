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
  return this
};

Vector.prototype.mult= function(scalar){
  for(var i=0; i<this.values.length; i++){
    this.values[i] *= scalar
  };
  return this
}

Vector.prototype.sub= function(otherVec){
  // untested
  return this.add( otherVec.mult(-1) )
}

Vector.prototype.div= function(scalar){
  // untested
  this.mult(1/scalar)
  return this
}

Vector.prototype.dot = function(otherVec){
  if(this.values.length != otherVec.values.length){
    throw new Error("Dimension mismatch on vector addition")
  };
  var sum = 0
  for(var i=0; i<this.values.length; i++){
    sum += this.values[i] * otherVec.values[i]
  };
  return sum
}

Vector.prototype.mag = function(){
  // untested
  return this.dot(this)
}

Vector.prototype.setMag = function(scalar){
  // untested
  var magnitude = this.mag()
  return this.mult(scalar/magnitude)
};

Vector.prototype.normalize = function(){
  // untested
  var magnitude = this.mag()
  return this.div(magnitude)
}
