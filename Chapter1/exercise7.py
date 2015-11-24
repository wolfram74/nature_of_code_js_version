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

  def subt(self, vector):
    self.x -= vector.x
    self.y -= vector.y

  def mult(self, num):
    self.x *= num
    self.y *= num

  def __multiply_new_vector(self, vector, factor):
    PVector()

v = PVector(1,5)
u = v.mult(2)
w = v.subt(v)

print v
print u
print w
