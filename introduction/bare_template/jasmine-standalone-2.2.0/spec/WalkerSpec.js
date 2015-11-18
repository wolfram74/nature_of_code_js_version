describe("Meta", function() {

  beforeEach(function() {
  });

  it("should be able to run tests", function() {
    expect(true).toEqual(true);
  });
});

describe("Walker", function() {

  beforeEach(function() {
  });

  it("Walker has position coordinates", function() {
    var walker = new Walker()
    expect(walker.hasOwnProperty('x')).toEqual(true)
  });
  it("Walker has position coordinates that can be specified at creation", function() {
    var defWalk = new Walker()
    var walker = new Walker({x:2, y:4})
    expect(defWalk.x).toEqual(0)
    expect(defWalk.y).toEqual(0)
    expect(walker.x).toEqual(2)
    expect(walker.y).toEqual(4)
  });
});
