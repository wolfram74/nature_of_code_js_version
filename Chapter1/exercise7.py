# The PVector v equals (1,5).
# The PVector u equals v multiplied by 2.
# The PVector w equals v minus u.
# Divide the PVector w by 3.

class PVector:
  def __init__(self, x, y):
    self.x = x
    self.y = y

  def add(self, vector):
    self.x += vector.x
    self.y += vector.y
    return self

  def subt(self, vector):
    self.x -= vector.x
    self.y -= vector.y
    return self

  def mult(self, num):
    self.x *= num
    self.y *= num
    return self

  def new_mult(self, factor):
    return PVector(self.x * factor, self.y * factor)


  def new_subt(self, vector):
    return PVector(self.x - vector.x, self.y - vector.y)

v = PVector(1,5)
u = v.new_mult(2)
w = v.new_subt(u)

print v.x
print u.x
print w.x
