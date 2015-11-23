describe("Vector Meta", function() {

  beforeEach(function() {
  });

  it("should be able to run tests", function() {
    expect(true).toEqual(true);
  });
});

describe("Vector behavior", function() {
  var vector1
  var vector2
  var vector2d
  beforeEach(function() {
    vector1 = new Vector([1,2,3])
    vector2 = new Vector([4,5,0])
    vector2d = new Vector([1,2])
  });

  it("should have a collection of values", function() {
    expect(vector1.hasOwnProperty('values')).toEqual(true);
  });

  it("should be able to add together when of proper dimension", function() {
    vector1.add(vector2)
    expect(vector1.values[1]).toEqual(7);
  });
  it("should be throw an error when not", function() {
    expect(
        function(){ vector2d.add(vector1); }
      ).toThrow(
        new Error("Dimension mismatch on vector addition")
      );
  });
  it("should be able to use scalar multiplication", function() {
    vector1.mult(3)
    expect(vector1.values[1]).toEqual(6);
  });
  it("should be able to subtract together when of proper dimension", function() {
    vector1.sub(vector2)
    expect(vector1.values[1]).toEqual(-3);
  });
});

