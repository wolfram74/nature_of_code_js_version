import math

class PVector:
  def __init__(self, x, y):
    self.x = x
    self.y = y

  def add(self, vector):
    self.x += vector.x
    self.y += vector.y


  def limit(self,max):
    if math.sqrt(self.x ** 2 + self.y ** 2) > max:
      self.x = self.x * max / math.sqrt(self.x ** 2 + self.y ** 2)
      self.y = self.y * max / math.sqrt(self.x ** 2 + self.y ** 2)

a = PVector(3,4)
a.limit(4)

print(a.x)
print(a.y)
